<template>
  <section class="our-story page internal">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-12 mb-5 content-col"
          v-html="page.content"
        ></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 col-md-12 mb-4 d-flex justify-content-center align-items-center"
          v-for="(item, index) in page.custom_fields.mv_box"
          :key="index"
        >
          <mv-block :block="item" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <banner
            :bannerImage="page.custom_fields.banner_image"
            :bannerTitle="page.custom_fields.banner_title"
            :bannerSubtitle="page.custom_fields.textarea_a7kztlhi4ms"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Banner from "~/components/our-story/Banner.vue";
import MvBlock from "~/components/our-story/MvBlock.vue";
export default {
  components: { MvBlock, Banner },
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.ourStory
    );
    return {
      page: pageData
    };
  }
};
</script>
<style lang="scss">
.content-col {
  p {
    margin-bottom: 25px;
  }
}
</style>
