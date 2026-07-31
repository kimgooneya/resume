import { describe, expect, test } from "bun:test";

import {
  MAP_HEIGHT,
  MAP_WIDTH,
  REGION_IDS,
  REGIONS,
  TILE_SIZE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  isWalkableTile,
  validateRegion,
} from "../preview/region-data.js";

function shortestPathLength(region) {
  const start = region.start;
  const target = region.interaction;
  const queue = [[start.x, start.y, 0]];
  const seen = new Set([`${start.x},${start.y}`]);

  for (let index = 0; index < queue.length; index += 1) {
    const [x, y, distance] = queue[index];
    if (x === target.x && y === target.y) return distance;

    for (const [deltaX, deltaY] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
      const nextX = x + deltaX;
      const nextY = y + deltaY;
      const key = `${nextX},${nextY}`;
      if (
        nextX >= 0 &&
        nextX < MAP_WIDTH &&
        nextY >= 0 &&
        nextY < MAP_HEIGHT &&
        !seen.has(key) &&
        isWalkableTile(region.tiles[nextY][nextX])
      ) {
        seen.add(key);
        queue.push([nextX, nextY, distance + 1]);
      }
    }
  }

  return null;
}

function pathCells(region) {
  return new Set(region.tiles.flatMap((row, y) =>
    row.flatMap((tile, x) => isWalkableTile(tile) ? [`${x},${y}`] : []),
  ));
}

function similarity(first, second) {
  const shared = [...first].filter((cell) => second.has(cell)).length;
  return shared / new Set([...first, ...second]).size;
}

function featureCells(feature) {
  return new Set(feature.mask.flatMap((row, localY) =>
    [...row].flatMap((cell, localX) =>
      cell === "#" ? [`${feature.x + localX},${feature.y + localY}`] : []),
  ));
}

describe("region data contract", () => {
  test("provides five ordered 40 by 64 LCD regions", () => {
    // Given: the immutable region catalogue
    const dimensions = [MAP_WIDTH, MAP_HEIGHT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, TILE_SIZE];

    // When: its fixed dimensions and IDs are read
    const ids = REGIONS.map(({ id }) => id);

    // Then: the map and logical viewport match the field-guide contract
    expect(dimensions).toEqual([40, 64, 24, 18, 16]);
    expect(REGION_IDS).toEqual(["forest", "city", "desert", "snow", "coast"]);
    expect(ids).toEqual(REGION_IDS);
    expect(REGIONS).toHaveLength(5);
  });

  test("keeps project IDs in parity with the existing detailed project records", async () => {
    // Given: the project JSON remains the detailed content boundary
    const projects = await Bun.file(new URL("../preview/projects.json", import.meta.url)).json();

    // When: the region IDs are compared to its keys
    const projectIds = Object.keys(projects).sort();

    // Then: each resident points to exactly one existing project ID
    expect(projectIds).toEqual([...REGION_IDS].sort());
    expect(REGIONS.map(({ resident }) => resident.projectId).sort()).toEqual(projectIds);
  });

  test("gives every region exactly four distinct palette tones", () => {
    // Given: every authored LCD palette
    const palettes = REGIONS.map(({ palette }) => palette);

    // When: tone count and uniqueness are measured
    const paletteShapes = palettes.map((palette) => [palette.length, new Set(palette).size]);

    // Then: every region has only the four LCD tones
    expect(paletteShapes).toEqual([[4, 4], [4, 4], [4, 4], [4, 4], [4, 4]]);
    expect(palettes).toEqual([
      ["#0f1f14", "#315b35", "#78a34e", "#d5e596"],
      ["#152530", "#31536b", "#7595a1", "#d2e1d0"],
      ["#2b1a10", "#7a4b28", "#c2944f", "#f0dda2"],
      ["#25283d", "#4c5478", "#909ab5", "#e6ebd1"],
      ["#102c2b", "#1f6260", "#63a08a", "#d4e5ad"],
    ]);
  });

  test("places one southern start and one northern landmark resident pair per map", () => {
    // Given: all authored region maps
    const locationCounts = REGIONS.map((region) => {
      const cells = region.tiles.flat();
      return [
        cells.filter((tile) => tile === "start").length,
        cells.filter((tile) => tile === "landmark").length,
        cells.filter((tile) => tile === "resident").length,
        cells.filter((tile) => tile === "interaction").length,
      ];
    });

    // When: special map cells and their positions are inspected
    const positions = REGIONS.map(({ start, landmark, resident, interaction }) => ({
      start,
      landmark,
      resident,
      interaction,
    }));

    // Then: the traversal starts south and ends adjacent to a northern resident
    expect(locationCounts).toEqual([[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]);
    for (const { start, landmark, resident, interaction } of positions) {
      expect(start.y).toBeGreaterThanOrEqual(52);
      expect(landmark.y).toBeLessThanOrEqual(12);
      expect(resident.y).toBeLessThanOrEqual(12);
      expect(Math.abs(interaction.x - resident.x) + Math.abs(interaction.y - resident.y)).toBe(1);
    }
  });

  test("blocks every map edge from walking exits", () => {
    // Given: the perimeter of each local map
    const edgeTiles = REGIONS.flatMap(({ tiles }) => tiles.flatMap((row, y) =>
      row.filter((tile, x) => x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1),
    ));

    // When: edge tile walkability is checked
    const exits = edgeTiles.filter(isWalkableTile);

    // Then: local regions never connect through their boundary
    expect(exits).toEqual([]);
  });

  test("keeps each northern interaction reachable through a long local route", () => {
    // Given: every region's southern start and interaction tile
    const distances = REGIONS.map(shortestPathLength);

    // When: breadth-first travel distance is measured
    const outOfRange = distances.filter((distance) => distance === null || distance < 110 || distance > 180);

    // Then: the route is reachable and supports the intended traversal duration
    expect(outOfRange).toEqual([]);
  });

  test("includes rejoining route branches and signposts at their decision points", () => {
    // Given: all map sign metadata
    const routeDetails = REGIONS.map(({ branches, signposts, tiles }) => ({
      branchEndpoints: branches.map(({ entry, rejoin }) => [
        tiles[entry.y][entry.x],
        tiles[rejoin.y][rejoin.x],
        entry.x !== rejoin.x,
      ]),
      signs: signposts.map(({ x, y }) => {
        const neighbors = [[0, -1], [1, 0], [0, 1], [-1, 0]].filter(([deltaX, deltaY]) =>
          isWalkableTile(tiles[y + deltaY]?.[x + deltaX]),
        ).length;
        return [tiles[y][x], neighbors];
      }),
    }));

    // When: sign tiles and their adjacent decision points are inspected
    const invalidBranches = routeDetails.flatMap(({ branchEndpoints }) => branchEndpoints).filter(
      ([entry, rejoin, separatesRoute]) => !isWalkableTile(entry) || !isWalkableTile(rejoin) || !separatesRoute,
    );
    const invalidSigns = routeDetails.flatMap(({ signs }) => signs).filter(
      ([tile, neighbors]) => tile !== "sign" || neighbors === 0,
    );

    // Then: every authored detour has a visible guide beside the route
    expect(routeDetails.map(({ branchEndpoints }) => branchEndpoints.length)).toEqual([2, 2, 2, 2, 2]);
    expect(invalidBranches).toEqual([]);
    expect(invalidSigns).toEqual([]);
  });

  test("authors materially different path topology and destination placement for every region", () => {
    // Given: each complete walkable map and its spatial destination grammar
    const paths = REGIONS.map(pathCells);
    const placementSignatures = REGIONS.map(({ start, landmark, resident, interaction }) =>
      JSON.stringify({ start, landmark, resident: { x: resident.x, y: resident.y }, interaction }));

    // When: pairwise overlap is measured across the full 40 by 64 maps
    const pairwiseSimilarities = paths.flatMap((first, firstIndex) =>
      paths.slice(firstIndex + 1).map((second) => similarity(first, second)));

    // Then: no shared dominant route or reused destination arrangement can define the regions
    expect(Math.max(...pairwiseSimilarities)).toBeLessThan(0.45);
    expect(new Set(placementSignatures).size).toBe(REGIONS.length);
  });

  test("authors large biome-specific scenery masses across north, middle, and south", () => {
    // Given: each region's non-walkable scenery descriptors and three traversal bands
    const expectedKinds = {
      forest: ["canopy", "clearing", "pond"],
      city: ["block", "plaza"],
      desert: ["canyon", "channel"],
      snow: ["ridge", "snowbank", "stream"],
      coast: ["bridge", "dock", "shore", "water"],
    };
    const bands = [[0, 22], [23, 45], [46, 63]];

    // When: descriptor bounds, semantic grammar, and visible band coverage are measured
    const summaries = REGIONS.map((region) => ({
      id: region.id,
      kinds: [...new Set(region.scenery.map(({ kind }) => kind))].sort(),
      boundsValid: region.scenery.every(({ x, y, width, height, mask }) =>
        [x, y, width, height].every(Number.isInteger) &&
        x >= 0 && y >= 0 && width >= 2 && height >= 2 &&
        x + width <= MAP_WIDTH && y + height <= MAP_HEIGHT &&
        Array.isArray(mask) && mask.length === height &&
        mask.every((row) => row.length === width)),
      bandCoverage: bands.map(([startY, endY]) =>
        region.scenery.reduce((area, feature) =>
          area + [...featureCells(feature)].filter((cell) => {
            const y = Number(cell.split(",")[1]);
            return y >= startY && y <= endY;
          }).length, 0)),
    }));

    // Then: every viewport band contains substantial authored composition, not a repeated micro-pattern
    expect(summaries.map(({ id, kinds }) => [id, kinds])).toEqual(
      Object.entries(expectedKinds).map(([id, kinds]) => [id, kinds]),
    );
    expect(summaries.every(({ boundsValid }) => boundsValid)).toBe(true);
    expect(summaries.every(({ bandCoverage }) => bandCoverage.every((area) => area >= 70))).toBe(true);
  });

  test("uses explicit irregular masks instead of rectangular scenery slabs", () => {
    // Given: every authored terrain cluster across the five local maps
    const features = REGIONS.flatMap(({ scenery }) => scenery);

    // When: mask shape, fill ratio, and frozen data boundaries are measured
    const measurements = features.map((feature) => {
      const filled = feature.mask.reduce(
        (count, row) => count + [...row].filter((cell) => cell === "#").length,
        0,
      );
      return {
        validAlphabet: feature.mask.every((row) => /^[.#]+$/.test(row)),
        fillRatio: filled / (feature.width * feature.height),
        filled,
        frozen: Object.isFrozen(feature) && Object.isFrozen(feature.mask),
      };
    });

    // Then: authored corner cuts and profiles define every mass without random generation
    expect(measurements.every(({ validAlphabet }) => validAlphabet)).toBe(true);
    expect(measurements.every(({ fillRatio }) => fillRatio >= 0.35 && fillRatio <= 0.9)).toBe(true);
    expect(measurements.every(({ filled }) => filled >= 8)).toBe(true);
    expect(measurements.every(({ frozen }) => frozen)).toBe(true);
  });

  test("authors one dominant northern precinct around each landmark and resident", () => {
    // Given: every region's destination geometry and its named precinct cluster
    const precincts = REGIONS.map((region) => {
      const matches = region.scenery.filter(({ role }) => role === "landmark-precinct");
      const precinct = matches[0];
      const occupied = precinct ? featureCells(precinct) : new Set();
      return {
        count: matches.length,
        band: precinct?.band,
        area: occupied.size,
        includesLandmark: occupied.has(`${region.landmark.x},${region.landmark.y}`),
        includesResident: occupied.has(`${region.resident.x},${region.resident.y}`),
      };
    });

    // When / Then: each north destination reads as one authored place, not a loose sprite
    expect(precincts.every(({ count }) => count === 1)).toBe(true);
    expect(precincts.every(({ band }) => band === "north")).toBe(true);
    expect(precincts.every(({ area }) => area >= 70)).toBe(true);
    expect(precincts.every(({ includesLandmark, includesResident }) =>
      includesLandmark && includesResident)).toBe(true);
  });

  test("keeps scenery immutable and geometrically distinct without relying on palette", () => {
    // Given: the complete authored feature geometry for all five regions
    const signatures = REGIONS.map(({ scenery }) =>
      JSON.stringify(scenery.map(({ kind, role, band, x, y, mask }) =>
        [kind, role, band, x, y, mask])));

    // When: palette-free descriptor signatures and frozen boundaries are inspected
    const immutable = REGIONS.every(({ scenery }) =>
      Object.isFrozen(scenery) && scenery.every((feature) =>
        Object.isFrozen(feature) && Object.isFrozen(feature.mask)));

    // Then: each biome owns a distinct reusable composition grammar
    expect(new Set(signatures).size).toBe(REGIONS.length);
    expect(immutable).toBe(true);
  });

  test("describes a distinct landmark and resident silhouette for every regional role", () => {
    // Given: the authored landmark and resident presentation descriptors
    const landmarkSprites = REGIONS.map(({ landmark }) => landmark.sprite);
    const residentSprites = REGIONS.map(({ resident }) => resident.sprite);
    const residentProps = REGIONS.map(({ resident }) => resident.prop);

    // When: their semantic sprite identities are compared
    const identities = REGIONS.map(({ landmark, resident }) =>
      `${landmark.sprite}:${landmark.prop}:${resident.sprite}:${resident.prop}`);

    // Then: every destination can be distinguished structurally without relying on palette
    expect(new Set(landmarkSprites).size).toBe(REGIONS.length);
    expect(new Set(residentSprites).size).toBe(REGIONS.length);
    expect(new Set(residentProps).size).toBe(REGIONS.length);
    expect(new Set(identities).size).toBe(REGIONS.length);
    expect(REGIONS.every(({ landmark, resident }) =>
      Object.isFrozen(landmark) && Object.isFrozen(resident))).toBe(true);
  });

  test("exposes immutable region exports and four dialogue states", () => {
    // Given: public region data
    const mutability = REGIONS.map((region) => [
      Object.isFrozen(region),
      Object.isFrozen(region.palette),
      Object.isFrozen(region.tiles),
      Object.isFrozen(region.tiles[0]),
      Object.isFrozen(region.branches),
      Object.isFrozen(region.branches[0]),
      Object.isFrozen(region.resident),
      Object.isFrozen(region.resident.dialogue),
    ]);

    // When: its immutable boundaries and dialogue stages are read
    const stages = REGIONS.map(({ resident }) => Object.keys(resident.dialogue).sort());

    // Then: callers cannot alter shared maps, palettes, or resident copy
    expect(Object.isFrozen(REGIONS)).toBe(true);
    expect(mutability).toEqual([[true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true]]);
    expect(stages).toEqual([
      ["approach", "closed", "problem", "result"],
      ["approach", "closed", "problem", "result"],
      ["approach", "closed", "problem", "result"],
      ["approach", "closed", "problem", "result"],
      ["approach", "closed", "problem", "result"],
    ]);
  });

  test("rejects a cloned map whose interaction path is broken", () => {
    // Given: a mutable clone of a valid map
    const malformed = structuredClone(REGIONS[0]);
    for (const [deltaX, deltaY] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
      const x = malformed.interaction.x + deltaX;
      const y = malformed.interaction.y + deltaY;
      if (malformed.tiles[y]?.[x] === "path") malformed.tiles[y][x] = "terrain";
    }

    // When / Then: validation refuses the unreachable interaction tile
    expect(() => validateRegion(malformed)).toThrow(/reachable/);
  });

  test("rejects a cloned map with a walkable edge exit", () => {
    // Given: a mutable clone with a boundary route tile
    const malformed = structuredClone(REGIONS[0]);
    malformed.tiles[0][1] = "path";

    // When / Then: validation refuses a cross-region exit
    expect(() => validateRegion(malformed)).toThrow(/edge/);
  });

  test("rejects a cloned region with a fifth palette tone", () => {
    // Given: a mutable clone with an invalid extra LCD color
    const malformed = structuredClone(REGIONS[0]);
    malformed.palette.push("#ffffff");

    // When / Then: validation refuses palettes outside the four-tone contract
    expect(() => validateRegion(malformed)).toThrow(/palette/);
  });

  test("rejects scenery that escapes the local map boundary", () => {
    // Given: a mutable clone with an out-of-bounds regional mass
    const malformed = structuredClone(REGIONS[0]);
    malformed.scenery[0].x = MAP_WIDTH - 1;
    malformed.scenery[0].width = 4;

    // When / Then: validation rejects composition outside the 40 by 64 map
    expect(() => validateRegion(malformed)).toThrow(/scenery/);
  });

  test("rejects a scenery descriptor that falls back to a solid rectangle", () => {
    // Given: a mutable clone whose authored mask has lost every corner cut
    const malformed = structuredClone(REGIONS[0]);
    const feature = malformed.scenery[0];
    feature.mask = Array.from({ length: feature.height }, () => "#".repeat(feature.width));

    // When / Then: validation refuses the generic slab geometry
    expect(() => validateRegion(malformed)).toThrow(/scenery/);
  });
});
