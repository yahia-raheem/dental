<template>
  <div class="home-page">
    <home-slider
      :slideImgs="sliderImages"
      :title="page.meta_box.slider_title"
      :subtitle="page.meta_box.slider_subtitle"
    />
    <home-steps
      :labGroup="page.meta_box.step_group"
      :secTitle="page.meta_box.lab_section_title"
      :secSubtitle="page.meta_box.lab_sections_subtitle"
    />
    <home-wg-tabs
      :secTitle="page.meta_box.wg_section_title"
      :secPrefix="page.meta_box.wg_section_prefix"
      :secTabs="page.meta_box.wg_tab"
    />
    <home-partners
      :secTitle="page.meta_box.partners_section_title"
      :slides="page.meta_box.partners_slider_images"
    />
  </div>
</template>

<script>
import HomePartners from '~/components/home/HomePartners.vue';
import HomeSlider from "~/components/home/HomeSlider.vue";
import HomeSteps from "~/components/home/HomeSteps.vue";
import HomeWgTabs from "~/components/home/HomeWgTabs.vue";
export default {
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/getPage",
      process.env.homepageId
    );
    return {
      page: pageData,
      sliderImages: pageData.meta_box.slider_images
    };
  },
  components: {
    HomeSlider,
    HomeSteps,
    HomeWgTabs,
    HomePartners
  }
};
</script>

<style></style>
