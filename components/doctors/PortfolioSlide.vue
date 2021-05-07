<template>
  <div class="row">
    <div
      class="col-xl-4 col-sm-6 d-flex justify-content-center align-items-center"
      v-for="(item, index) in slide"
      :key="index"
    >
      <div class="portfolio-box">
        <div class="img-container">
          <get-img-by-link :imglink="cover(item.cover)" classes="bg-image" />
        </div>
        <h6 class="title">{{ item.title }}</h6>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    slide: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    cover(cover) {
      return `${process.env.storageBase}/${cover}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.portfolio-box {
  width: 210px;
  position: relative;
  margin-bottom: 30px;
  .img-container::v-deep {
    @include h.box-ratio(3, 2);
    border-radius: 10px;
    border: 1px solid #f0f0f0;
  }
  .title {
    margin-bottom: 0;
    margin-top: 5px;
    color: h.$body-color;
  }
}
</style>
