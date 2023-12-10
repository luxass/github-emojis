import { defineConfig } from "astro/config";
import qwikdev from "@qwikdev/astro";
import vercel from "@astrojs/vercel/serverless";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    qwikdev(),
  ],
  compressHTML: false,
  output: "server",
  adapter: vercel(),
});
