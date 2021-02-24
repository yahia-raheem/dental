import Sass from "sass";

const customSass = {
  implementation: Sass
};

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "dental",
    htmlAttrs: {
      lang: "en",
      dir: "ltr"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/bundle.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/helpers", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  env: {
    baseUrl: process.env.BASE_URL || "http://dental.local"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: customSass
    }
  }
};
