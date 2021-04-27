<template>
  <div class="home-page">
    <home-slider
      :slideImgs="sliderImages"
      :title="page.custom_fields.slider_title"
      :subtitle="page.custom_fields.slider_subtitle"
    />
    <home-steps
      :labGroup="page.custom_fields.step_group"
      :secTitle="page.custom_fields.lab_section_title"
      :secSubtitle="page.custom_fields.lab_sections_subtitle"
    />
    <home-wg-tabs
      :secTitle="page.custom_fields.wg_section_title"
      :secPrefix="page.custom_fields.wg_section_prefix"
      :secTabs="page.custom_fields.wg_tab"
    />
    <home-partners
      :secTitle="page.custom_fields.partners_section_title"
      :slides="page.custom_fields.partners_slider_images"
    />
  </div>
</template>

<script>
import HomePartners from "~/components/home/HomePartners.vue";
import HomeSlider from "~/components/home/HomeSlider.vue";
import HomeSteps from "~/components/home/HomeSteps.vue";
import HomeWgTabs from "~/components/home/HomeWgTabs.vue";
export default {
  layout: "home",
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.homepageId
    );
    return {
      page: pageData,
      sliderImages: pageData.custom_fields.slider_images
    };
  },
  components: {
    HomeSlider,
    HomeSteps,
    HomeWgTabs,
    HomePartners
  },
};
</script>

<style></style>
