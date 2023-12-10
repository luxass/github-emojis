import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index", "./src/utils"],
  outDir: "dist",
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
    json: {
      compact: true,
      namedExports: false,
    },
  },
});
