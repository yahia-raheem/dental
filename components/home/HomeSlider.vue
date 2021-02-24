<template>
  <section class="home-slider">
    <div class="slider-container">
      <div class="splide" id="homeslider">
        <div class="splide__track">
          <ul class="splide__list">
            <li
              class="splide__slide"
              v-for="(item, key) in imgs"
              :key="key"
              v-html="item"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.slideImgs.forEach(element => {
      this.getImage({
        id: element.ID,
        size: "full",
        classes: "slide-image"
      }).then(res => {
        this.imgs.push(res.image);
      });
    });
  },
  data() {
    return {
      imgs: []
    };
  },
  props: {
    slideImgs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    ...mapActions({
      getImage: "general/getImage"
    })
  }
};
</script>
<style lang="scss" scoped>
section.home-slider {
    padding: 0;
}
</style>
