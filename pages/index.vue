<template>
  <div class="home-page">
    <home-slider :slideImgs="page.meta_box.slider_images"/>
  </div>
</template>

<script>
import HomeSlider from "~/components/home/HomeSlider.vue";
export default {
  async asyncData(context) {
    const pageData = await context.store.dispatch('pages/getPage', 40)
    return {
      page: pageData
    }
  },

  components: {
    HomeSlider
  },
};
</script>

<style></style>
