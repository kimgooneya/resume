import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

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
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./preview/index.html", import.meta.url)),
        explore: fileURLToPath(new URL("./preview/explore.html", import.meta.url)),
        resume: fileURLToPath(new URL("./preview/resume/developer-resume.html", import.meta.url)),
      },
    },
  },
});
