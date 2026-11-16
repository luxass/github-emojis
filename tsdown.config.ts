import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/utils.ts"],
  format: ["esm"],
  clean: true,
  dts: true,
  treeshake: true,
  publint: true,
  exports: true,
});
