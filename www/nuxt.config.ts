// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/devtools",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-icon",
  ],
  devtools: { enabled: true },
  plugins: [
    {
      src: "~/plugins/vercel-analytics.ts",
      mode: "client",
    },
  ],
  sourcemap: false,
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "ProjectRC",
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