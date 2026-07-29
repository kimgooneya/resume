import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base =
  process.env.GITHUB_ACTIONS === "true" && repositoryName
    ? `/${repositoryName}/`
    : "/";

export default defineConfig({
  root: "preview",
  base,
  assetsInclude: ["**/*.glb"],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
