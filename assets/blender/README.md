# Blender P0–P1 Asset Pack

`DESIGN.md`의 Voxel Village 디자인 시스템을 기준으로 Blender 5.2에서 제작한 웹용 GLB 에셋 팩이다.

## Output

- Blender source: `voxel-portfolio-p0-p1.blend`
- GLB files: `glb/`
- Individual evaluation renders: `renders/01-explorer.png` through `renders/14-story-props.png`
- Catalog renders: `renders/catalog-p0.png`, `renders/catalog-p1.png`
- Machine-readable metrics: `manifest.json`

## P0

| File | Contents | Triangles | Evaluation |
|---|---|---:|---|
| `01-explorer.glb` | Explorer with face, scarf, backpack, map terminal, named limb joints | 4,012 | PASS: identity and silhouette remain readable at isometric scale |
| `02-cyan-tower.glb` | Three-tier tower, emissive windows, antenna, servers, bench | 8,304 | PASS: strongest vertical city silhouette |
| `03-automation-workshop.glb` | Factory, gear, stack, tank, crane, solar array, toolbox | 7,544 | PASS: automation role is readable without UI copy |
| `04-relay-station.glb` | Station, striped mast, dish, cable boxes, ice pillars, warning sign | 7,188 | PASS: dish and mast remain distinct from the observatory |
| `05-lighthouse.glb` | Tapered lighthouse, balcony, lantern, pier, boat, buoy | 9,020 | PASS: clear coastal landmark silhouette |
| `06-starlight-observatory.glb` | Round observatory, dome slit, telescope, data cube, star marker, pines | 7,392 | PASS: dome and angled telescope create a unique profile |

## P1

| File | Contents | Triangles | Evaluation |
|---|---|---:|---|
| `07-pine-set.glb` | Three forest and two snow pine variants | 5,748 | PASS: useful height and material variation for instancing |
| `08-house-set.glb` | Two city and two coast house variants | 4,112 | PASS: roof, chimney, vent, and prop variation prevent repetition |
| `09-rock-set.glb` | Six forest, desert, and snow rock variants | 300 | PASS: intentionally very light for dense instancing |
| `10-cactus-set.glb` | Five height and branch variants | 5,588 | PASS: silhouettes remain distinct at distance |
| `11-coast-vegetation.glb` | Five reed clumps | 11,788 | PASS with caution: instance clumps, not individual stems |
| `12-buoy-set.glb` | Five light and daymark buoy variants | 6,224 | PASS: two top profiles and multiple scales |
| `13-plaza-beacon-kit.glb` | Plaza, stairs, corner lights, three beacon sizes | 4,212 | PASS: reusable landmark grammar is preserved |
| `14-story-props.glb` | Forest, city, desert, snow, and coast narrative props | 5,564 | PASS: each village receives role-specific secondary detail |

## Validation

- All 14 GLB files were exported and successfully re-imported into Blender.
- Total geometry across the complete pack: 86,996 triangles.
- Combined GLB size: 6,117,716 bytes.
- Every individual GLB is below 1 MB.
- Materials use only color roles defined in the project `DESIGN.md`.

## Integration note

`preview/blender-assets.js` loads all 14 GLBs. P0 replaces the explorer and five
procedural landmarks while preserving movement, arrival, hover, and hit-area
behavior. P1 keeps the original instanced terrain props for density and adds
curated detailed variants, story clusters, and a central plaza kit by biome.

Same-viewport before/after captures and responsive QA images are stored in
`comparison/`.
