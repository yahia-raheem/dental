<template>
  <div class="album_slide_container">
    <div class="img-container" v-if="slide.image != 'null'">
      <get-img-by-link :imglink="slideImage" classes="bg-image" />
    </div>
    <h5 class="title" v-if="slide.title">{{ slide.title }}</h5>
    <p class="desc" v-if="slide.description">{{ slide.description }}</p>
  </div>
</template>
<script>
export default {
  props: {
    slide: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    slideImage() {
      return `${process.env.storageBase}/${this.slide.image}`;
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.album_slide_container {
  background-color: white;
  padding: 30px 35px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  max-height: 70vh;
  overflow: scroll;
  .img-container {
    @include h.box-ratio(16, 9);
    border-radius: 5px;
  }
  .title {
    color: h.$primary;
    position: relative;
    margin-top: 20px;
    padding-bottom: 20px;
    &::after {
      content: "";
      width: 50px;
      height: 7px;
      border-radius: 10px;
      background-color: #f67e70;
      position: absolute;
      bottom: 0;
      @include h.appDirAuto($start: 0);
    }
  }
}
</style>
