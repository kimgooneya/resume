import {
  TILE_KINDS,
  TILE_SIZE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "./region-data.js";

function fill(context, color, x, y, width, height) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function paintCell(context, palette, kind, cell) {
  const { x, y, localX, localY, edge } = cell;
  const phase = (localX * 2 + localY) % 4;

  switch (kind) {
    case "canopy":
      fill(context, palette[0], x, y, 16, 16);
      fill(context, palette[1], x + 2, y + (phase % 2 === 0 ? 2 : 5), 12, 9);
      fill(context, palette[2], x + 5, y + 3, 6, phase === 3 ? 3 : 5);
      if (edge.top) fill(context, palette[3], x + 6, y + 1, 4, 3);
      if (edge.bottom) fill(context, palette[1], x + 5, y + 13, 6, 3);
      break;
    case "clearing":
      fill(context, palette[2], x, y, 16, 16);
      if (edge.top || edge.bottom) fill(context, palette[3], x, y + (edge.top ? 1 : 13), 16, 3);
      fill(context, palette[3], x + 2 + (phase % 3) * 4, y + 5, 3, 3);
      fill(context, palette[1], x + 9 - phase, y + 11, 4, 2);
      break;
    case "pond":
      fill(context, palette[1], x, y, 16, 16);
      fill(context, palette[2], x + (phase % 3) * 2, y + 4, 10, 2);
      fill(context, palette[3], x + 5, y + 9, 8, 2);
      if (edge.left) fill(context, palette[0], x, y, 3, 16);
      if (edge.bottom) fill(context, palette[0], x, y + 14, 16, 2);
      break;
    case "block":
      fill(context, palette[0], x, y, 16, 16);
      fill(context, palette[1], x + (edge.left ? 4 : 2), y + 2, edge.right ? 8 : 12, 14);
      if (phase % 2 === 1) fill(context, palette[3], x + 5, y + 5, 5, 4);
      if (edge.top) fill(context, palette[2], x + 2, y + 2, 12, 3);
      if (edge.bottom) fill(context, palette[0], x, y + 13, 16, 3);
      break;
    case "plaza":
      fill(context, palette[2], x, y, 16, 16);
      fill(context, palette[1], x, y + (phase % 2 === 0 ? 7 : 14), 16, 2);
      fill(context, palette[3], x + 6, y + 3 + (phase % 2) * 6, 4, 4);
      if (edge.left || edge.right) fill(context, palette[0], x + (edge.left ? 0 : 13), y, 3, 16);
      break;
    case "canyon":
      fill(context, palette[0], x, y, 16, 16);
      fill(context, palette[1], x + (edge.left ? 0 : 3), y + 3, edge.left ? 16 : 13, 10);
      fill(context, palette[2], x + 3 + phase, y + 3, 8 - (phase % 3), 3);
      fill(context, palette[0], x + 2, y + 13, 14, 3);
      if (edge.top) fill(context, palette[3], x + 5, y, 8, 3);
      break;
    case "channel":
      fill(context, palette[1], x, y, 16, 16);
      fill(context, palette[0], x, y + 5 + (phase % 3), 16, 4);
      fill(context, palette[2], x + 3, y + 6 + (phase % 3), 6, 2);
      if (edge.bottom) fill(context, palette[3], x + 2, y + 13, 12, 3);
      break;
    case "ridge":
      fill(context, palette[1], x, y, 16, 16);
      fill(context, palette[0], x, y + 12, 16, 4);
      fill(context, palette[2], x + (phase % 3) * 2, y + 5, 14 - (phase % 3) * 2, 7);
      fill(context, palette[3], x + 2, y + 3, 10, 3);
      if (edge.top) fill(context, palette[3], x + 5, y, 8, 3);
      break;
    case "snowbank":
      fill(context, palette[2], x, y, 16, 16);
      fill(context, palette[3], x + 1, y + 2 + (phase % 3), 14, 7);
      fill(context, palette[1], x + 3, y + 12, 13, 3);
      if (edge.left) fill(context, palette[0], x, y + 8, 3, 8);
      break;
    case "stream":
      fill(context, palette[1], x, y, 16, 16);
      fill(context, palette[2], x, y + 3 + (phase % 3), 12, 3);
      fill(context, palette[3], x + 5, y + 9, 11, 3);
      if (edge.top || edge.bottom) fill(context, palette[0], x, y + (edge.top ? 0 : 14), 16, 2);
      break;
    case "water":
      fill(context, palette[1], x, y, 16, 16);
      fill(context, palette[0], x + (phase % 3) * 2, y + 4, 10, 3);
      fill(context, palette[2], x + 5, y + 11, 11, 2);
      if (edge.right) fill(context, palette[3], x + 13, y, 3, 16);
      break;
    case "shore":
      fill(context, palette[2], x, y, 16, 16);
      fill(context, palette[3], x + (edge.left ? 2 : 0), y + 3 + (phase % 3), 12, 3);
      fill(context, palette[1], x, y + 13, 16, 3);
      if (edge.right) fill(context, palette[0], x + 13, y, 3, 16);
      break;
    case "dock":
    case "bridge":
      fill(context, palette[0], x, y, 16, 16);
      fill(context, palette[2], x + 1, y + 2, 14, 12);
      fill(context, palette[1], x + (kind === "dock" ? 3 : 7), y + 2, 2, 12);
      fill(context, palette[3], x + 2, y + 3 + (phase % 3) * 4, 12, 2);
      if (edge.left || edge.right) fill(context, palette[0], x + (edge.left ? 0 : 14), y, 2, 16);
      break;
  }
}

function maskCell(feature, localX, localY) {
  return feature.mask[localY]?.[localX] === "#";
}

function paintFeature(context, region, camera, feature) {
  const startX = Math.max(feature.x, camera.x);
  const endX = Math.min(feature.x + feature.width, camera.x + VIEWPORT_WIDTH);
  const startY = Math.max(feature.y, camera.y);
  const endY = Math.min(feature.y + feature.height, camera.y + VIEWPORT_HEIGHT);
  for (let worldY = startY; worldY < endY; worldY += 1) {
    for (let worldX = startX; worldX < endX; worldX += 1) {
      if (region.tiles[worldY][worldX] !== TILE_KINDS.TERRAIN) continue;
      const localX = worldX - feature.x;
      const localY = worldY - feature.y;
      if (!maskCell(feature, localX, localY)) continue;
      paintCell(context, region.palette, feature.kind, {
        x: (worldX - camera.x) * TILE_SIZE,
        y: (worldY - camera.y) * TILE_SIZE,
        localX,
        localY,
        edge: {
          top: !maskCell(feature, localX, localY - 1),
          right: !maskCell(feature, localX + 1, localY),
          bottom: !maskCell(feature, localX, localY + 1),
          left: !maskCell(feature, localX - 1, localY),
        },
      });
    }
  }
}

export function renderRegionScenery(context, region, camera) {
  for (const feature of region.scenery) paintFeature(context, region, camera, feature);
}
