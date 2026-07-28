const paletteNames = Object.freeze([
  "space-deep",
  "space-core",
  "text-primary",
  "accent-cyan",
  "water-deep",
  "water-light",
  "forest-deep",
  "meadow",
  "city",
  "coast",
  "sand",
  "snow",
  "ice",
  "road",
  "rail",
  "building-light",
  "building-dark",
  "roof",
  "beacon",
  "warning",
  "soil-deep",
  "soil-mid",
  "cliff-light",
  "road-marking",
  "rail-metal",
  "shore-foam",
  "explorer-skin",
  "explorer-scarf",
  "explorer-pack",
  "shadow-contact",
]);

export function readPalette() {
  const rootStyles = getComputedStyle(document.documentElement);
  return Object.fromEntries(
    paletteNames.map((name) => [
      name,
      rootStyles.getPropertyValue(`--${name}`).trim(),
    ]),
  );
}
