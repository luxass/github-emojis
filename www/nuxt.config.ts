// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-icon",
    "@unocss/nuxt",
  ],
  devtools: { enabled: true },
  plugins: [
    {
      src: "~/plugins/vercel-analytics.ts",
      mode: "client",
    },
    "~/plugins/floating-vue.ts",
  ],
  sourcemap: false,
  app: {
    head: {
      viewport: "width=device-width,initial-scale=1",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
    pageTransition: false,
    layoutTransition: false,
  },
  experimental: {
    typescriptBundlerResolution: true,
    viewTransition: true,
    componentIslands: true,
    payloadExtraction: true,
    typedPages: true,
  },
  css: [
    "@unocss/reset/tailwind.css",
  ],
  image: {
    domains: [
      "github.githubassets.com",
    ],
  },
  nitro: {
    routeRules: {
      "/api/emojis": {
        cache: {
          maxAge: 3600,
        },
      },
      "/api/emojis/**": {
        cache: {
          maxAge: 3600,
        },
      },
    },
  },
});
