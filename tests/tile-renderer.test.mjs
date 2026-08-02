import { describe, expect, test } from "bun:test";

import {
  MAP_HEIGHT,
  MAP_WIDTH,
  REGIONS_BY_ID,
  TILE_SIZE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "../preview/region-data.js";
import { renderLandmarkTerrain, renderRegionScenery } from "../preview/scenery-renderer.js";
import { renderTileWorld } from "../preview/tile-renderer.js";
import {
  drawLandmark,
  drawMarker,
  drawPlayer,
  drawResident,
  drawSign,
} from "../preview/world-sprites.js";

function recordingContext() {
  const commands = [];
  let fillStyle = "";
  let smoothing = true;
  return {
    commands,
    get fillStyle() {
      return fillStyle;
    },
    set fillStyle(value) {
      fillStyle = value;
    },
    get imageSmoothingEnabled() {
      return smoothing;
    },
    set imageSmoothingEnabled(value) {
      smoothing = value;
      commands.push(["smoothing", value]);
    },
    fillRect(x, y, width, height) {
      commands.push(["fillRect", fillStyle, x, y, width, height]);
    },
    createLinearGradient() {
      throw new Error("gradients are forbidden");
    },
    drawImage() {
      throw new Error("images are forbidden");
    },
  };
}

function state(camera = { x: 0, y: 0 }, player = { x: 5, y: 11, facing: "right" }) {
  return { regionId: "forest", camera, player };
}

function groundCommands(commands) {
  return commands.filter(([name]) => name === "fillRect").slice(0, VIEWPORT_WIDTH * VIEWPORT_HEIGHT);
}

describe("four-tone tile renderer", () => {
  test("renders an identifiable original adventurer in every facing and step state", () => {
    // Given: one player anchored away from every canvas edge
    const forest = REGIONS_BY_ID.forest;
    const draw = (facing, x, y) => {
      const context = recordingContext();
      drawPlayer(context, forest.palette, { x, y, facing }, { x: 96, y: 96 });
      return context.commands.filter(([name]) => name === "fillRect");
    };
    const recordings = ["up", "right", "down", "left"].map((facing) =>
      draw(facing, 20, 20));
    const bounds = (commands) => {
      const left = Math.min(...commands.map(([, , x]) => x));
      const top = Math.min(...commands.map(([, , , y]) => y));
      const right = Math.max(...commands.map(([, , x, , width]) => x + width));
      const bottom = Math.max(...commands.map(([, , , y, , height]) => y + height));
      return { width: right - left, height: bottom - top };
    };

    // When: each facing and alternating walk step is painted
    const facingSignatures = recordings.map((commands) => JSON.stringify(commands));
    const stepA = draw("down", 20, 20);
    const stepB = draw("down", 21, 20);

    // Then: silhouette, face, outfit, pack, separated limbs, and stance remain readable in four tones
    expect(recordings.every((commands) => commands.length >= 28)).toBe(true);
    expect(recordings.every((commands) => {
      const size = bounds(commands);
      return size.width >= 30 && size.height >= 40;
    })).toBe(true);
    expect(recordings.every((commands) =>
      new Set(commands.map(([, color]) => color)).size === 4)).toBe(true);
    expect(new Set(facingSignatures).size).toBe(4);
    expect(stepA).not.toEqual(stepB);
    expect(new Set(stepA.map(([, , x, y, width, height]) => `${x}:${y}:${width}:${height}`))
      .difference(new Set(stepB.map(([, , x, y, width, height]) => `${x}:${y}:${width}:${height}`))).size).toBeGreaterThan(8);
  });

  test("keeps the maker tool and guide sign detached from their bodies", () => {
    // Given: two role-specific residents rendered at the same interior anchor
    const anchor = { x: 96, y: 96 };
    const bounds = (region) => {
      const context = recordingContext();
      drawResident(context, region, anchor);
      const draws = context.commands.filter(([name]) => name === "fillRect");
      return {
        right: Math.max(...draws.map(([, , x, , width]) => x + width)),
        colors: new Set(draws.map(([, color]) => color)),
      };
    };

    // When: each prop's exterior silhouette is measured
    const maker = bounds(REGIONS_BY_ID.desert);
    const guide = bounds(REGIONS_BY_ID.coast);

    // Then: both props extend beyond the shared character body in the active four-tone ramp
    expect(maker.right).toBeGreaterThanOrEqual(anchor.x + 42);
    expect(guide.right).toBeGreaterThanOrEqual(anchor.x + 49);
    expect([...maker.colors].every((color) => REGIONS_BY_ID.desert.palette.includes(color))).toBe(true);
    expect([...guide.colors].every((color) => REGIONS_BY_ID.coast.palette.includes(color))).toBe(true);
  });

  test("renders field signposts as bold four-tone directional objects", () => {
    // Given: one signpost at a fully visible interior anchor
    const anchor = { x: 96, y: 96 };
    const context = recordingContext();

    // When: the shared wayfinding object is painted
    drawSign(context, REGIONS_BY_ID.forest.palette, anchor);
    const draws = context.commands.filter(([name]) => name === "fillRect");
    const left = Math.min(...draws.map(([, , x]) => x));
    const top = Math.min(...draws.map(([, , , y]) => y));
    const right = Math.max(...draws.map(([, , x, , width]) => x + width));
    const bottom = Math.max(...draws.map(([, , , y, , height]) => y + height));

    const rightArrowTip = anchor.x + 43;
    const hasArrowTip = draws.some(([, , x, y, width, height]) =>
      x + width === rightArrowTip && y === anchor.y + 8 && height === 4);
    const hasUpperHeadStep = draws.some(([, , x, y, width, height]) =>
      x === anchor.x + 30 && y === anchor.y + 4 && width >= 8 && height >= 4);
    const hasLowerHeadStep = draws.some(([, , x, y, width, height]) =>
      x === anchor.x + 30 && y + height === anchor.y + 16 && width >= 8 && height >= 4);

    // Then: a wide shaft, stepped arrowhead, post, and footing read as a four-tone wayfinding object
    expect(draws.length).toBeGreaterThanOrEqual(14);
    expect({ width: right - left, height: bottom - top }).toEqual({ width: 43, height: 37 });
    expect(hasArrowTip && hasUpperHeadStep && hasLowerHeadStep).toBe(true);
    expect(new Set(draws.map(([, color]) => color))).toEqual(new Set(REGIONS_BY_ID.forest.palette));
  });

  test("iterates exactly the current 24 by 18 camera slice in row-major order", () => {
    // Given: the forest viewed from a non-zero camera origin
    const context = recordingContext();
    const forest = REGIONS_BY_ID.forest;
    const camera = { x: 16, y: 20 };

    // When: one state change is rendered
    renderTileWorld(context, forest, state(camera, { x: 20, y: 30, facing: "up" }));

    // Then: the first layer contains exactly one full logical tile per viewport cell
    const ground = groundCommands(context.commands);
    expect(ground).toHaveLength(24 * 18);
    expect(ground.map(([, , x, y, width, height]) => [x, y, width, height])).toEqual(
      Array.from({ length: 18 }, (_, y) =>
        Array.from({ length: 24 }, (_, x) => [x * 16, y * 16, 16, 16])).flat(),
    );
    expect(ground[0][1]).toBe(
      forest.tiles[camera.y][camera.x] === "terrain" ? forest.palette[1] : forest.palette[2],
    );
  });

  test("uses deterministic integer rectangle commands and only the active four-tone ramp", () => {
    // Given: two independent recording contexts and the same visible landmark state
    const first = recordingContext();
    const second = recordingContext();
    const forest = REGIONS_BY_ID.forest;
    const visibleState = state({ x: 0, y: 0 }, { x: 5, y: 11, facing: "right" });

    // When: the same state is rendered twice with its interaction marker
    renderTileWorld(first, forest, visibleState, { interactionAvailable: true });
    renderTileWorld(second, forest, visibleState, { interactionAvailable: true });

    // Then: every recorded draw is repeatable, pixel-snapped, bounded, and four-tone
    expect(first.commands).toEqual(second.commands);
    expect(first.commands[0]).toEqual(["smoothing", false]);
    const draws = first.commands.filter(([name]) => name === "fillRect");
    expect(draws.every(([, color]) => forest.palette.includes(color))).toBe(true);
    expect(draws.every(([, , ...values]) => values.every(Number.isInteger))).toBe(true);
    expect(draws.every(([, , x, y, width, height]) =>
      x >= 0 && y >= 0 && width > 0 && height > 0 &&
      x + width <= 384 && y + height <= 288)).toBe(true);
  });

  test("gives every region a dense, recording-distinct terrain grammar beyond palette changes", () => {
    // Given: the same northern viewport position in all five authored regions
    const recordings = Object.values(REGIONS_BY_ID).map((region) => {
      const context = recordingContext();
      renderTileWorld(context, region, {
        regionId: region.id,
        camera: { x: 0, y: 0 },
        player: { ...region.start, facing: "up" },
      });
      const decor = context.commands.slice(1 + VIEWPORT_WIDTH * VIEWPORT_HEIGHT);
      return {
        count: decor.length,
        signature: JSON.stringify(decor.map(([, color, , , width, height]) => [
          region.palette.indexOf(color),
          width,
          height,
        ])),
      };
    });

    // Then: each terrain paints a visible primitive grammar and no two are palette-only twins
    expect(recordings.every(({ count }) => count >= 500)).toBe(true);
    expect(new Set(recordings.map(({ signature }) => signature)).size).toBe(5);
  });

  test("renders deterministic, bounded scenery masses in every traversal band", () => {
    // Given: north, middle, and south camera slices for every authored region
    const cameras = [{ x: 0, y: 0 }, { x: 8, y: 11 }, { x: 24, y: 22 }];

    // When: the scenery layer is painted twice for each region and band
    const recordings = Object.values(REGIONS_BY_ID).flatMap((region) =>
      cameras.map((camera) => {
        const first = recordingContext();
        const second = recordingContext();
        renderRegionScenery(first, region, camera);
        renderRegionScenery(second, region, camera);
        return { region, first: first.commands, second: second.commands };
      }));

    // Then: every band has a substantial static composition within the four-tone canvas
    expect(recordings.every(({ first, second }) => JSON.stringify(first) === JSON.stringify(second))).toBe(true);
    expect(recordings.every(({ first }) => first.length >= 24)).toBe(true);
    expect(recordings.every(({ region, first }) => first.every(([, color]) =>
      region.palette.includes(color)))).toBe(true);
    expect(recordings.every(({ first }) => first.every(([, , x, y, width, height]) =>
      [x, y, width, height].every(Number.isInteger) &&
      x >= 0 && y >= 0 && width > 0 && height > 0 &&
      x + width <= 384 && y + height <= 288))).toBe(true);
  });

  test("gives every landmark a quiet backdrop, firm plinth, and bright biome-specific approach", () => {
    // Given: every central landmark framed in its normal arrival camera
    const recordings = Object.values(REGIONS_BY_ID).map((region) => {
      const camera = { x: region.landmark.x - 12, y: region.landmark.y - 8 };
      const context = recordingContext();

      // When: the visual-only terrain treatment is painted beneath the landmark
      renderLandmarkTerrain(context, region, camera);
      const draws = context.commands.filter(([name]) => name === "fillRect");
      const approachTop = (region.landmark.y + 2 - camera.y) * TILE_SIZE;

      return {
        signature: JSON.stringify(draws.map(([, color, x, y, width, height]) =>
          [region.palette.indexOf(color), x, y, width, height])),
        quietBackdrop: draws.some(([, color, , , width, height]) =>
          color === region.palette[2] && width >= TILE_SIZE * 11 && height === TILE_SIZE),
        plinth: draws.some(([, color, , y, width, height]) =>
          color === region.palette[0] &&
          y === (region.landmark.y + 1 - camera.y) * TILE_SIZE &&
          width >= TILE_SIZE * 9 &&
          height >= 8),
        approach: draws.some(([, color, , y, width, height]) =>
          color === region.palette[3] && y >= approachTop && width >= TILE_SIZE * 5 && height >= 8),
        bounded: draws.every(([, color, x, y, width, height]) =>
          region.palette.includes(color) &&
          x >= 0 && y >= 0 && width > 0 && height > 0 &&
          x + width <= 384 && y + height <= 288),
      };
    });

    // Then: ground layers establish a readable destination without a fifth tone or tile mutation
    expect(recordings.every(({ quietBackdrop, plinth, approach, bounded }) =>
      quietBackdrop && plinth && approach && bounded)).toBe(true);
    expect(new Set(recordings.map(({ signature }) => signature)).size).toBe(5);
  });

  test("keeps the coast boardwalk light between its narrow dark plank seams", () => {
    // Given: the coast landmark framed at its normal arrival camera
    const coast = REGIONS_BY_ID.coast;
    const camera = { x: coast.landmark.x - 12, y: coast.landmark.y - 8 };
    const context = recordingContext();
    const deckX = (coast.landmark.x - 1 - camera.x) * TILE_SIZE + 8;
    const deckTop = (coast.landmark.y + 2 - camera.y) * TILE_SIZE;

    // When: the visual terrain is composited in draw order
    renderLandmarkTerrain(context, coast, camera);
    const colorAt = (x, y) => context.commands.reduce((color, [name, nextColor, left, top, width, height]) =>
      name === "fillRect" && x >= left && x < left + width && y >= top && y < top + height
        ? nextColor
        : color, null);

    // Then: the wet boardwalk remains bright, with only two-pixel dark plank seams
    expect(colorAt(deckX, deckTop + 6)).toBe(coast.palette[3]);
    expect(colorAt(deckX, deckTop + 1)).toBe(coast.palette[1]);
  });

  test("honors authored mask cutouts instead of painting rectangular feature bounds", () => {
    // Given: one isolated three-by-three clearing whose missing cells form visible corner cuts
    const forest = REGIONS_BY_ID.forest;
    const region = {
      ...forest,
      tiles: Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill("terrain")),
      scenery: [{
        kind: "clearing",
        role: "mass",
        band: "north",
        x: 4,
        y: 4,
        width: 3,
        height: 3,
        mask: [".#.", "###", ".#."],
      }],
    };
    const context = recordingContext();

    // When: the isolated scenery layer is rendered
    renderRegionScenery(context, region, { x: 0, y: 0 });
    const paintedCells = new Set(context.commands.map(([, , x, y]) =>
      `${Math.floor(x / TILE_SIZE)},${Math.floor(y / TILE_SIZE)}`));

    // Then: only the five explicit mask cells receive any scenery primitives
    expect(paintedCells).toEqual(new Set(["5,4", "4,5", "5,5", "6,5", "5,6"]));
  });

  test("uses genuinely distinct palette-free scenery geometry in matching bands", () => {
    // Given: one middle camera slice shared across all region renderers
    const camera = { x: 8, y: 23 };

    // When: draw geometry is normalized away from each region's palette values
    const signatures = Object.values(REGIONS_BY_ID).map((region) => {
      const context = recordingContext();
      renderRegionScenery(context, region, camera);
      return JSON.stringify(context.commands.map(([, color, x, y, width, height]) =>
        [region.palette.indexOf(color), x, y, width, height]));
    });

    // Then: color substitution alone cannot make one biome look like another
    expect(new Set(signatures).size).toBe(5);
  });

  test("renders five distinct landmark and resident silhouettes from regional descriptors", () => {
    // Given: every descriptor is painted at the same coordinates over the same empty path field
    const signatures = Object.values(REGIONS_BY_ID).map((region) => {
      const context = recordingContext();
      const presentationRegion = {
        ...region,
        tiles: Array.from({ length: MAP_HEIGHT }, () => Array(MAP_WIDTH).fill("path")),
        landmark: { ...region.landmark, x: 6, y: 9 },
        resident: { ...region.resident, x: 6, y: 11 },
      };

      // When: the renderer paints that region's landmark and resident
      renderTileWorld(context, presentationRegion, {
        regionId: region.id,
        camera: { x: 0, y: 0 },
        player: { ...region.start, facing: "up" },
      });

      // Then: object-layer geometry is independent of palette identity
      return JSON.stringify(context.commands
        .slice(1 + VIEWPORT_WIDTH * VIEWPORT_HEIGHT)
        .map(([name, color, x, y, width, height]) =>
          [name, region.palette.indexOf(color), x, y, width, height]));
    });

    expect(new Set(signatures).size).toBe(5);
  });

  test("makes central landmarks and residents dominant, detailed, and safely framed", () => {
    // Given: each central destination at its real minimum-safe camera position
    const measurements = Object.values(REGIONS_BY_ID).map((region) => {
      const cameraY = Math.max(0, region.landmark.y - 4);
      const landmarkPoint = { x: 128, y: (region.landmark.y - cameraY) * TILE_SIZE };
      const residentPoint = { x: 128, y: (region.resident.y - cameraY) * TILE_SIZE };
      const landmarkContext = recordingContext();
      const residentContext = recordingContext();

    // When: the destination silhouettes render at the central camera position
      drawLandmark(landmarkContext, region, landmarkPoint);
      drawResident(residentContext, region, residentPoint);
      const landmarkDraws = landmarkContext.commands.filter(([name]) => name === "fillRect");
      const residentDraws = residentContext.commands.filter(([name]) => name === "fillRect");
      const bounds = (draws) => {
        const left = Math.min(...draws.map(([, , x]) => x));
        const top = Math.min(...draws.map(([, , , y]) => y));
        const right = Math.max(...draws.map(([, , x, , width]) => x + width));
        const bottom = Math.max(...draws.map(([, , , y, , height]) => y + height));
        return { left, top, width: right - left, height: bottom - top };
      };
      return {
        landmark: bounds(landmarkDraws),
        landmarkParts: landmarkDraws.length,
        resident: bounds(residentDraws),
        residentParts: residentDraws.length,
        residentAnchor: residentPoint.x,
      };
    });

    // Then: destination silhouettes dominate the precinct while preserving safe margins
    expect(measurements.every(({ landmark }) =>
      landmark.top >= 2 && landmark.width >= 80 && landmark.height >= 58)).toBe(true);
    expect(measurements.every(({ landmarkParts }) => landmarkParts >= 24)).toBe(true);
    expect(measurements.every(({ resident, residentAnchor }) =>
      resident.left >= residentAnchor && resident.width >= 30 && resident.height >= 40)).toBe(true);
    expect(measurements.every(({ residentParts }) => residentParts >= 20)).toBe(true);
  });

  test("draws global layers in ground, decor, landmark, resident, player, marker order", () => {
    // Given: a camera containing every special forest object
    const context = recordingContext();
    const forest = REGIONS_BY_ID.forest;
    const camera = { x: forest.landmark.x - 12, y: forest.landmark.y - 8 };
    const player = { ...forest.interaction, facing: "right" };
    const screenPoint = (point) => ({
      x: (point.x - camera.x) * TILE_SIZE,
      y: (point.y - camera.y) * TILE_SIZE,
    });

    // When: the marked interaction state is rendered
    renderTileWorld(context, forest, state(camera, player), { interactionAvailable: true });

    // Then: complete sprite command groups occur after all ground in the required layer order
    const commands = context.commands;
    const standalone = (draw) => {
      const standaloneContext = recordingContext();
      draw(standaloneContext);
      return standaloneContext.commands;
    };
    const groups = [
      standalone((target) => drawLandmark(target, forest, screenPoint(forest.landmark))),
      standalone((target) => drawResident(target, forest, screenPoint(forest.resident))),
      standalone((target) => drawPlayer(target, forest.palette, player, screenPoint(player))),
      standalone((target) => drawMarker(target, forest.palette, screenPoint(player))),
    ];
    const findGroup = (group, from) => {
      for (let index = from; index <= commands.length - group.length; index += 1) {
        if (group.every((command, offset) =>
          JSON.stringify(commands[index + offset]) === JSON.stringify(command))) return index;
      }
      return -1;
    };
    const [landmark, resident, playerIndex, marker] = groups.reduce((indices, group) => {
      const previous = indices.at(-1) ?? VIEWPORT_WIDTH * VIEWPORT_HEIGHT;
      indices.push(findGroup(group, previous + 1));
      return indices;
    }, []);

    expect(landmark).toBeGreaterThan(24 * 18);
    expect(resident).toBeGreaterThan(landmark);
    expect(playerIndex).toBeGreaterThan(resident);
    expect(marker).toBeGreaterThan(playerIndex);
  });

  test("uses camera offsets at all clamp edges without drawing beyond the viewport", () => {
    // Given: the four camera clamp corners
    const forest = REGIONS_BY_ID.forest;
    const cameras = [
      { x: 0, y: 0 },
      { x: MAP_WIDTH - VIEWPORT_WIDTH, y: 0 },
      { x: 0, y: MAP_HEIGHT - VIEWPORT_HEIGHT },
      { x: MAP_WIDTH - VIEWPORT_WIDTH, y: MAP_HEIGHT - VIEWPORT_HEIGHT },
    ];

    // When: each edge slice is rendered
    const recordings = cameras.map((camera) => {
      const context = recordingContext();
      renderTileWorld(context, forest, state(camera, { x: camera.x, y: camera.y, facing: "down" }));
      return context.commands.filter(([name]) => name === "fillRect");
    });

    // Then: every slice remains an exact bounded logical viewport
    expect(recordings.every((draws) =>
      draws.every(([, , x, y, width, height]) =>
        x >= 0 && y >= 0 && x + width <= 384 && y + height <= 288))).toBe(true);
    expect(recordings.map((draws) => draws.slice(0, 432).length)).toEqual([432, 432, 432, 432]);
  });

  test("rejects an invalid palette or visible tile before mutating the canvas", () => {
    // Given: invalid palette and tile region boundaries
    const forest = REGIONS_BY_ID.forest;
    const invalidPalette = { ...forest, palette: [...forest.palette, "#ffffff"] };
    const tiles = forest.tiles.map((row) => [...row]);
    tiles[0][0] = "unknown";
    const invalidTile = { ...forest, tiles };

    // When: each invalid region is passed to the renderer
    const paletteContext = recordingContext();
    const tileContext = recordingContext();
    const renderPalette = () => renderTileWorld(paletteContext, invalidPalette, state());
    const renderTile = () => renderTileWorld(tileContext, invalidTile, state());

    // Then: neither invalid boundary silently paints a fifth/unknown tone
    expect(renderPalette).toThrow(TypeError);
    expect(renderTile).toThrow(TypeError);
    expect(paletteContext.commands).toEqual([]);
    expect(tileContext.commands).toEqual([]);
  });

  test("rejects malformed regional sprite descriptors before mutating the canvas", () => {
    // Given: a region whose renderer descriptor is absent
    const forest = REGIONS_BY_ID.forest;
    const invalidLandmark = { ...forest, landmark: { ...forest.landmark, sprite: "unknown" } };
    const invalidResident = { ...forest, resident: { ...forest.resident, sprite: null } };
    const landmarkContext = recordingContext();
    const residentContext = recordingContext();

    // When / Then: neither malformed sprite boundary reaches the canvas
    expect(() => renderTileWorld(landmarkContext, invalidLandmark, state())).toThrow(TypeError);
    expect(() => renderTileWorld(residentContext, invalidResident, state())).toThrow(TypeError);
    expect(landmarkContext.commands).toEqual([]);
    expect(residentContext.commands).toEqual([]);
  });

  test("rejects malformed or inherited player facing before mutating the canvas", () => {
    // Given: player states whose facing value is not an own cardinal direction
    const forest = REGIONS_BY_ID.forest;
    const inheritedPlayer = Object.create({ facing: "up" });
    inheritedPlayer.x = 5;
    inheritedPlayer.y = 11;
    const malformedPlayers = [
      { x: 5, y: 11, facing: "__proto__" },
      { x: 5, y: 11, facing: "constructor" },
      { x: 5, y: 11, facing: { direction: "left" } },
      { x: 5, y: 11, facing: null },
      { x: 5, y: 11, facing: "north" },
      inheritedPlayer,
    ];

    // When: each malformed player state is passed to the renderer
    const results = malformedPlayers.map((player) => {
      const context = recordingContext();
      let error;
      try {
        renderTileWorld(context, forest, state({ x: 0, y: 0 }, player));
      } catch (caught) {
        error = caught;
      }
      return { error, commands: context.commands };
    });

    // Then: every malformed boundary rejects with no Canvas mutation
    expect(results.every(({ error, commands }) => error instanceof TypeError && commands.length === 0)).toBe(true);
  });
});
