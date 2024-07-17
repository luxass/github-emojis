import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    icon(),
  ],
  compressHTML: false,
  adapter: netlify({
    cacheOnDemandPages: true,
  }),
  output: "hybrid",
});
