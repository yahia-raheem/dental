import Sass from "sass";
import { WP_PAGES_IDS } from "./constants/pageConstants";
const customSass = {
  implementation: Sass,
  additionalData: '$dir: "ltr";'
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
  plugins: [
    { src: "~/plugins/helpers", mode: "client" },
    { src: "~/plugins/vue-slick-slider.js" },
    { src: "~/plugins/global-components.js" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/vue-star-rating.js", mode: "client" },
    { src: "~/plugins/vue-simple-accordion.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/image"],

  image: {
    domains: ["http://dental.local/"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    sizes: [320, 420, 768, 1024, 1200]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  env: {
    baseUrl: process.env.BASE_URL || "http://dental.local",
    ...WP_PAGES_IDS
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: customSass
    }
  }
};
