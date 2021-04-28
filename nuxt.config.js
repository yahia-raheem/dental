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
    { src: "~/plugins/vue-simple-accordion.js", mode: "client" },
    { src: "~/plugins/vue-bottom-sheet.js", mode: "client" },
    { src: "~/plugins/vue-toastify", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/image"],

  image: {
    domains: ["https://projects.cloudmaize.com/dentalwp/"],
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
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/auth-next"
  ],

  router: {
    middleware: ["mobile"]
  },

  auth: {
    redirect: {
      login: "/auth",
      logout: "/",
      callback: "/",
      home: "/"
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "token",
          type: "Bearer",
          maxAge: 60 * 60
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: "user",
          autoFetch: true
        },
        endpoints: {
          login: {
            url: `http://dental.al-estshary.com/api/login`,
            method: "post"
          },
          logout: {
            url: `http://dental.al-estshary.com/api/logout`,
            method: "post"
          },
          refresh: {
            url: `http://dental.al-estshary.com/api/refresh-token`,
            method: "post"
          },
          user: {
            url: `http://dental.al-estshary.com/api/loggeduser`,
            method: "get"
          }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: false
  },

  env: {
    baseUrl:
      process.env.BASE_URL || "https://projects.cloudmaize.com/dentalwp/",
    apiUrl: process.env.API_URL || "http://dental.al-estshary.com",
    ...WP_PAGES_IDS
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: customSass
    }
  }
};
