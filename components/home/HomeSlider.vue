<template>
  <section class="home-slider">
    <div class="slider-data">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h1 class="title">{{ title }}</h1>
            <h2 class="subtitle">{{ subtitle }}</h2>
          </div>
        </div>
        <slider-filter />
      </div>
    </div>
    <VueSlickCarousel v-bind="settings">
      <div class="slide" v-for="(item, key) in slideImgs" :key="key">
        <get-img :imgid="item.ID" responsive="xl:100vw,lg:700px" />
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
    }
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
      height: 800px;
    }
  }
  .slider-data {
    @include h.center();
    width: 100%;
    z-index: 1;
    .title,
    .subtitle {
      text-align: center;
    }
    .title {
      font-weight: 700;
    }
  }
}
</style>
