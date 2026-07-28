export const WORLD = Object.freeze({
  minX: -48,
  maxX: 47,
  minZ: -30,
  maxZ: 29,
  tileSize: 0.82,
});

export const VILLAGES = Object.freeze([
  {
    id: "forest",
    biome: "forest",
    label: "숲 마을",
    landmark: "별빛 관측소",
    position: { x: -30, z: -16 },
  },
  {
    id: "city",
    biome: "city",
    label: "도시 마을",
    landmark: "시안 타워",
    position: { x: 4, z: -18 },
  },
  {
    id: "desert",
    biome: "desert",
    label: "사막 마을",
    landmark: "자동화 공방",
    position: { x: 30, z: -14 },
  },
  {
    id: "snow",
    biome: "snow",
    label: "설원 마을",
    landmark: "릴레이 기지",
    position: { x: -30, z: 16 },
  },
  {
    id: "coast",
    biome: "coast",
    label: "항구 마을",
    landmark: "연결의 등대",
    position: { x: 24, z: 16 },
  },
]);

function riverCenter(z) {
  return Math.round(-1 + Math.sin(z * 0.4) * 1.5);
}

function isSeaAt(x, z) {
  const seaEdge = 32 + Math.round(Math.sin(z * 0.45) * 2);
  return z >= 8 && x >= seaEdge;
}

export function isWaterAt(x, z) {
  const river = x === riverCenter(z) && z < 8;
  return river || isSeaAt(x, z);
}

export function isRoadAt(x, z) {
  const main = z === 0 && x > WORLD.minX + 2 && x < WORLD.maxX - 3;
  const villageSpur = VILLAGES.some(({ position }) => {
    const start = Math.min(0, position.z);
    const end = Math.max(0, position.z);
    return x === position.x && z >= start && z <= end;
  });
  return main || villageSpur;
}

export function tileKindAt(x, z) {
  if (isWaterAt(x, z)) return "water";
  if (x < -14 && z > 4) return "snow";
  if (x > 10 && z > 4) return "coast";
  if (x > 14 && z <= 4) return "desert";
  if (x >= -12 && x <= 14 && z < -8) return "city";
  if (x < -12 && z <= 4) return "forest";
  return "meadow";
}

export function terrainLevelAt(x, z) {
  if (isWaterAt(x, z)) return 0;
  const outerRim =
    x === WORLD.minX ||
    x === WORLD.maxX ||
    z === WORLD.minZ ||
    z === WORLD.maxZ;
  if (outerRim) return 1;
  const nearVillage = VILLAGES.some(
    ({ position }) => Math.hypot(x - position.x, z - position.z) <= 2.2,
  );
  if (nearVillage || isRoadAt(x, z)) return 1;

  const kind = tileKindAt(x, z);
  const ridge = Math.abs((x * 13 + z * 7 + x * z) % 11);
  if (kind === "forest" || kind === "snow") return ridge < 3 ? 3 : ridge < 7 ? 2 : 1;
  if (kind === "desert") return ridge < 2 ? 3 : ridge < 6 ? 2 : 1;
  if (kind === "coast") return ridge < 4 ? 2 : 1;
  return ridge === 0 ? 2 : ridge === 10 ? 0 : 1;
}

export function heightAt(x, z) {
  if (isWaterAt(x, z) && !isRoadAt(x, z)) return 0.18;
  return 0.54 + terrainLevelAt(x, z) * 0.24;
}

export function isWalkableAt(worldX, worldZ) {
  const x = Math.round(worldX / WORLD.tileSize);
  const z = Math.round(worldZ / WORLD.tileSize);
  const inside =
    x > WORLD.minX && x < WORLD.maxX && z > WORLD.minZ && z < WORLD.maxZ;
  return inside && (!isWaterAt(x, z) || isRoadAt(x, z));
}
