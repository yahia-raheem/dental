<template>
  <div :class="{'nav-container': true, 'home-header': $route.fullPath == '/'}">
    <div class="white-gradient">
      <get-img :imgid="navBgGradient" />
    </div>
    <div class="container-fluid">
      <div class="row py-3">
        <div class="col-6 d-flex justify-content-start align-items-center">
          <ul class="social">
            <li v-for="(item, key) in socialMedia" :key="key">
              <a :href="item.link">
                <get-svg :svgid="item.image" />
              </a>
            </li>
          </ul>
        </div>
        <div class="col-6 d-flex justify-content-end align-items-center">
          <div class="header-cta header-phone-cta">
            <div class="img-container">
              <get-svg :svgid="numberImage" />
            </div>
            <span class="text">Need help?</span>
            <a :href="`tel:${headerPhone}`">{{ headerPhone }}</a>
          </div>
          <div class="header-cta header-signin-cta">
            <div class="img-container">
              <get-svg :svgid="signinImage" />
            </div>
            <span class="text"></span>
            <a to="/">Doctor? Sign Up</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <hr class="sep" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-expand-lg navbar-dark">
            <nuxt-link class="navbar-brand" to="/">
            <get-img :imgid="siteLogo" :classes="'site-logo'" :size="['130', 'auto']" />
            </nuxt-link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse d-none d-lg-block"
              id="navbarSupportedContent"
            >
              <navigation-bar />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "~/components/UI/NavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  components: { NavigationBar },
  data() {
    return {
      headerPhone: this.getOption("header_number"),
      siteLogo: this.getOption("site_logo"),
      numberImage: this.getOption("header_number_image"),
      signinImage: this.getOption("header_signin_image"),
      navBgGradient: this.getOption("nav_bg_gradient")
    };
  },
  computed: {
    ...mapGetters({
      socialMedia: "general/socialMedia"
    })
  },
  methods: {
    getOption(optionId) {
      return this.$store.getters["general/headerOption"](optionId);
    },
  },
};
</script>

<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.nav-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  .white-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    img {
      width: 100%;
      height: auto;
    }
  }
  .social {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    li {
      @include h.appDirAuto($margin-end: 15px);
      svg,
      img {
        max-width: 16px;
        max-height: 20px;
        width: auto;
        height: auto;
      }
    }
  }
  .header-cta {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    font-size: 0.9rem;
    .text {
      @include h.appDirAuto($margin-end: 10px);
    }
    &:not(:last-of-type) {
      @include h.appDirAuto($margin-end: 15px, $padding-end: 15px);
      &::after {
        content: "";
        @include h.center("v");
        @include h.appDirAuto($end: 0);
        height: 20px;
        width: 1px;
        background-color: #e1e1e1;
      }
    }
    svg,
    img {
      max-width: 20px;
      max-height: 20px;
      width: auto;
      height: auto;
      @include h.appDirAuto($margin-end: 10px);
    }
  }
  .sep {
    border-top: 1px solid #e1e1e1;
    margin: 0;
  }
  .site-logo {
    width: 130px;
    height: auto;
  }
  nav.navbar {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
