<template>
  <section class="home-slider">
    <div class="slider-data">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h1 class="stitle">{{ title }}</h1>
            <h2 class="ssubtitle">{{ subtitle }}</h2>
          </div>
        </div>
        <slider-filter />
      </div>
    </div>
    <VueSlickCarousel v-bind="settings">
      <div class="slide" v-for="(item, key) in slideImgs" :key="key">
        <get-img
          :imgid="item.ID"
          responsive="xl:100vw lg:1280px md:1024px sm:768px xs:100vw"
          classes="bg-image"
        />
      </div>
    </VueSlickCarousel>
  </section>
</template>
<script>
import SliderFilter from "./SliderFilter.vue";
export default {
  components: { SliderFilter },
  data() {
    return {
      settings: {
        dots: false,
        arrows: false,
        autoplay: true,
        fade: true
      }
    };
  },
  props: {
    slideImgs: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.home-slider {
  padding: 0;
  @include h.slick($use-arrows: false, $use-dots: false) {
    .slide {
      height: 500px;
      @include h.media(">992px") {
        height: 800px;
      }
    }
  }
  .slider-data {
    @include h.center();
    width: 100%;
    z-index: 1;
    .stitle,
    .ssubtitle {
      text-align: center;
    }
    .stitle {
      font-weight: 700;
      font-size: 1.8rem;
      @include h.media(">992px") {
        font-size: 2.5rem;
      }
    }
    .ssubtitle {
      font-size: 1.3rem;
      @include h.media(">992px") {
        font-size: 2rem;
      }
    }
  }
}
</style>
