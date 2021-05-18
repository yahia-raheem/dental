<template>
  <div
    :class="{ 'nav-container': true, 'home-header': $route.fullPath == '/' }"
  >
    <div class="white-gradient" v-if="$route.fullPath == '/'">
      <get-img :imgid="navBgGradient" responsive="sm:100vw md:100vw lg:100vw xl:100vw" />
    </div>
    <div class="container-fluid">
      <div class="row py-3">
        <div
          class="col-lg-4 col-md-4 col-sm-2 col-12 d-flex justify-content-start align-items-center"
          v-if="!isMobile"
        >
          <ul class="social">
            <li v-for="(item, key) in socialMedia" :key="key">
              <a :href="item.link" target="_blank">
                <get-svg-2 :svg="item.image" />
              </a>
            </li>
          </ul>
        </div>
        <div
          class="col-lg-8 col-md-8 col-sm-10 col-12 d-flex justify-content-between justify-content-lg-end align-items-center"
        >
          <div class="header-cta header-phone-cta" :class="{'nolog': !isLoggedIn}">
            <div class="img-container">
              <get-svg-2 svg="phone" />
            </div>
            <a :href="`tel:${headerPhone}`"
              ><span class="text">Need help?</span>
              <div class="tel" v-if="!isMobile">{{ headerPhone }}</div></a
            >
          </div>
          <div class="header-cta header-signin-cta" v-show="!isLoggedIn">
            <div class="img-container">
              <get-svg-2 svg="user" />
            </div>
            <span class="text"></span>
            <nuxt-link to="/auth/register">Sign Up</nuxt-link>
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
          <nav class="navbar navbar-expand-lg">
            <nuxt-link class="navbar-brand" to="/">
              <get-img :imgid="siteLogo" :classes="'site-logo'" responsive="xxl:130px,md:100" />
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
            <nuxt-link
              class="btn login-btn"
              to="/auth"
              v-show="!isLoggedIn && !isMobile"
            >
              <div class="icon">
                <!-- <get-svg :svgid="116" width="18" height="18" /> -->
                <get-svg-2 svg="padlock" width="18" height="18" />
              </div>
              <div class="text">
                Sign in
              </div>
            </nuxt-link>
            <account-drop v-show="isLoggedIn && !isMobile" />
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "~/components/UI/NavigationBar.vue";
import { mapGetters } from "vuex";
import AccountDrop from "./AccountDrop.vue";
export default {
  components: { NavigationBar, AccountDrop },
  data() {
    return {
      headerPhone: this.getOption("header_number"),
      siteLogo: this.getOption("site_logo"),
      signinImage: this.getOption("header_signin_image"),
      navBgGradient: this.getOption("nav_bg_gradient"),
      isMobile: this.$store.getters["general/isMobile"],
      isLoggedIn: this.$auth.loggedIn
    };
  },
  computed: {
    ...mapGetters({
      socialMedia: "general/socialMedia"
    }),
  },
  methods: {
    getOption(optionId) {
      return this.$store.getters["general/headerOption"](optionId);
    }
  },
  watch: {
    "$auth.loggedIn"() {
      this.isLoggedIn = this.$auth.loggedIn;
    }
  },
  mounted() {
    const sideBar = document.getElementById("mySidenav");
    const togglebtn = document.querySelector(".navbar-toggler");
    const closebtn = document.querySelector(".closebtn");
    const sidemenuItems = document.querySelectorAll(".sidenav a");

    sidemenuItems.forEach(item => {
      item.addEventListener("click", e => {
        e.stopPropagation();
        if (item.classList.contains("menu-item-has-children")) {
          const submenu = item.querySelector(".sub-menu");
          const itemsNum = item.querySelectorAll(".menu-item").length;
          if (submenu.classList.contains("opened")) {
            item.classList.remove("child-menu-opened");
            submenu.classList.remove("opened");
            submenu.style.maxHeight = 0;
          } else {
            item.classList.add("child-menu-opened");
            submenu.classList.add("opened");
            submenu.style.maxHeight = `${itemsNum * 64}px`;
          }
        } else {
          sideBar.style.width = "0";
        }
      });
    });

    togglebtn.addEventListener("click", () => {
      sideBar.style.width = "100vw";
    });
    closebtn.addEventListener("click", () => {
      sideBar.style.width = "0";
    });
  }
};
</script>

<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.login-btn {
  border: 2px solid #5b5b5b;
  color: #5b5b5b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  .text {
    font-size: 0.9rem;
  }
  .icon {
    @include h.appDirAuto($margin-end: 5px);
    svg path {
      fill: #5b5b5b;
    }
  }
}
.nav-container {
  .navbar-toggler {
    border: 1px solid black;
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
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
    &.header-phone-cta {
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .text {
          @include h.appDirAuto($margin-end: 10px);
        }
      }
    }
    @include h.media(">992px") {
      &.nolog {
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
    height: auto;
    width: 100px;
    height: auto;
    @include h.media(">992px") {
      width: 130px;
    }
  }
  nav.navbar {
    padding-left: 0;
    padding-right: 0;
  }
  &.home-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    nav.navbar {
      .navbar-toggler {
        border: 1px solid white;
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
        }
      }
    }
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
  }
}
</style>
