<template>
  <section class="our-story">
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-12 mb-5 content-col"
          v-html="page.content.rendered"
        ></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 col-md-12 mb-4 d-flex justify-content-center align-items-center"
          v-for="(item, index) in page.meta_box.mv_box"
          :key="index"
        >
          <mv-block :block="item" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <banner
            :bannerImage="page.meta_box.banner_image"
            :bannerTitle="page.meta_box.banner_title"
            :bannerSubtitle="page.meta_box.textarea_a7kztlhi4ms"
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
section.our-story {
  background-color: #f5f9fa;
}
.content-col {
  p {
    margin-bottom: 25px;
  }
}
</style>
