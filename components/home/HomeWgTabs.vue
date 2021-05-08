<template>
  <section class="home-wg" ref="homewg">
    <div class="container-fluid">
      <div class="row sec-header">
        <div class="col-lg-6 col-md-12">
          <h3 class="prefix">{{ secPrefix }}</h3>
          <h2 class="sec-title">{{ secTitle }}</h2>
        </div>
        <div class="col-lg-6 col-md-12">
          <h2 class="bg-text">{{ secBgText }}</h2>
          <div
            class="btns-container d-flex justify-content-center align-items-center justify-content-lg-end flex-wrap"
          >
            <button
              v-for="(item, index) in secTabs"
              :key="index"
              :class="{ btn: true, 'tab-btn': true, active: index == 0 }"
              :forslide="index"
              @click="activateTab"
            >
              {{ item.tab_title }}
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <VueSlickCarousel
            v-bind="settings"
            ref="carousel"
            @afterChange="activateBtn"
          >
            <div class="slide" v-for="(item, index) in secTabs" :key="index">
              <wg-tab :units="item.tab_unit" />
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import WgTab from "./WgTab.vue";
export default {
  components: { WgTab },
  data() {
    return {
      settings: {
        dots: true,
        arrows: false,
        autoplay: false
      }
    };
  },
  props: {
    secTitle: {
      type: String,
      default: ""
    },
    secPrefix: {
      type: String,
      default: ""
    },
    secTabs: {
      type: Array,
      default() {
        return [];
      }
    },
    secBgText: {
      type: String,
      default: ""
    }
  },
  methods: {
    activateTab(e) {
      this.$refs.carousel.goTo(e.target.attributes.forslide.value);
      e.target.parentElement.children.forEach(btn => {
        if (
          btn.attributes.forslide.value != e.target.attributes.forslide.value
        ) {
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
        }
      });
    },
    activateBtn(n) {
      this.$refs.homewg
        .querySelector(".tab-btn")
        .parentElement.children.forEach(btn => {
          if (btn.attributes.forslide.value != n) {
            btn.classList.remove("active");
          } else {
            btn.classList.add("active");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.home-wg {
  padding: 60px 0;
  .sec-header {
    margin-bottom: 80px;
  }
  .prefix {
    color: h.$primary;
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 1.5rem;
    @include h.media(">992px") {
      font-size: 2rem;
    }
  }
  .bg-text {
    display: none;
    @include h.media(">992px") {
      display: block;
      position: absolute;
      opacity: 0.04;
      margin: 0;
      top: 0%;
      transform: translateY(-50%);
      font-size: 4rem;
      width: 100%;
      text-align: center;
    }
  }
  .sec-title {
    font-size: 2rem;
    color: #ffbb64;
    font-weight: 900;
    position: relative;
    margin-bottom: 50px;
    &::after {
      position: absolute;
      bottom: -20px;
      @include h.appDirAuto($start: 0);
      width: 75px;
      height: 8px;
      border-radius: 15px;
      background-color: h.$secondary;
      content: "";
    }
    @include h.media(">992px") {
      font-size: 2.5rem;
    }
  }
  .tab-btn {
    border: 1px solid #4b6b83;
    color: #4b6b83;
    @include h.appDirAuto($margin-end: 15px);
    min-width: 170px;
    border-radius: 10px;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
    &.active {
      background-color: #ffbb64;
      color: #98662b;
      border-color: #ffbb64;
      outline: none;
      box-shadow: none;
    }
  }
  @include h.slick(
    $use-arrows: false,
    $slick-dot-color: gray,
    $slick-dot-color-active: h.$secondary,
    $slick-dot-size: 16px,
    $slick-margin-bet-dots: 7px
  ) {
    .slick-dots {
      bottom: -35px;
    }
  }
}
</style>
