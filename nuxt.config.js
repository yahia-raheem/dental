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
    { src: "~/plugins/vue-toastify", mode: "client" },
    { src: "~plugins/vue-modal.js" },
    { src: "~/plugins/axios" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [],
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/auth-next",
    "@nuxtjs/recaptcha",
    "@nuxtjs/svg",
    "@/modules/axCache",
    "@nuxt/image"
  ],

  image: {
    dir: 'static',
    domains: [
      "https://projects.cloudmaize.com/dentalwp/",
      "https://dental.al-estshary.com/storage",
      "https://dental-njsk8.ondigitalocean.app/",
      "https://dentalcloud-eg.com/",
      "https://dentalwp.dentalcloud-eg.com/"
    ],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  router: {
    middleware: ["mobile"]
  },

  auth: {
    redirect: {
      login: "/auth",
      logout: "/",
      callback: "/auth",
      home: "/"
    },
    plugins: ["~/plugins/auth.js"],
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
            url: `${process.env.API_URL}/api/login`,
            method: "post"
          },
          logout: {
            url: `${process.env.API_URL}/api/logout`,
            method: "post"
          },
          refresh: {
            url: `${process.env.API_URL}/api/refresh-token`,
            method: "post"
          },
          user: {
            url: `${process.env.API_URL}/api/loggeduser`,
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

  serverMiddleware: [{ path: "/api/check-token", handler: "~/api/recaptcha" }],

  env: {
    baseUrl:
      process.env.BASE_URL,
    apiUrl: process.env.API_URL,
    storageBase:
      process.env.STORAGE_BASE,
    ...WP_PAGES_IDS,
    recaptchaSiteKey:
      process.env.RECAPTCHA_SITE_LEY,
    recaptchaSecret:
      process.env.RECAPTCHA_SECRET
  },

  recaptcha: {
    // hideBadge: true,
    siteKey: process.env.RECAPTCHA_SITE_LEY,
    version: 3,
    size: "compact"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]]
    },
    loaders: {
      scss: customSass
    }
  },
  server: {
    port: 8080, // default: 3000
    host: "0.0.0.0" // default: localhost
  }
};
