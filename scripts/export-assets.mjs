import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

import { createAssetLibrary } from "./voxel-assets.mjs";

class ServerFileReader {
  result = null;
  onloadend = null;

  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend?.();
  }
}

globalThis.FileReader = ServerFileReader;

const outputDirectory = path.resolve("assets/voxel");
await mkdir(outputDirectory, { recursive: true });

const exporter = new GLTFExporter();
const manifest = [];

for (const [name, asset] of createAssetLibrary()) {
  const binary = await new Promise((resolve, reject) => {
    exporter.parse(asset, resolve, reject, {
      binary: true,
      onlyVisible: true,
    });
  });
  const bytes = new Uint8Array(binary);
  const filename = `${name}.glb`;
  await writeFile(path.join(outputDirectory, filename), bytes);

  const bounds = new THREE.Box3().setFromObject(asset);
  const size = bounds.getSize(new THREE.Vector3());
  manifest.push({
    bytes: bytes.byteLength,
    file: filename,
    name,
    size: [size.x, size.y, size.z].map((value) =>
      Number(value.toFixed(3)),
    ),
  });
}

await writeFile(
  path.join(outputDirectory, "manifest.json"),
  `${JSON.stringify({ assets: manifest }, null, 2)}\n`,
);
