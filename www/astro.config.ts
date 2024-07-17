import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import UnoCSS from "unocss/astro";
import type { AstroIntegration } from "astro";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
const astroHTMX: AstroIntegration = {
  name: "astro-htmx",
  hooks: {
    "astro:config:setup": ({
      injectScript
    }) => {
      injectScript("page", `import * as htmx from "htmx.org";
        document.addEventListener('astro:after-swap', () => {
          htmx.process(document.body)
        })`);
    }
  }
};


// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
    injectReset: true
  }),
  icon()],
  compressHTML: false,
  output: "hybrid",
  adapter: netlify()
});
