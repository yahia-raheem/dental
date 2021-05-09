<template>
  <div>
    <nuxt-picture
      quality="90"
      :src="imglink"
      :class="classes"
      format="webp"
      :sizes="responsive"
      :fit="fit"
      loading="lazy"
    />
    <!-- <img
      :src="imglink"
      :class="classes"
      loading="lazy"
    /> -->
  </div>
</template>
<script>
export default {
  props: {
    imglink: {
      required: false
    },
    size: {
      required: false
    },
    classes: {
      type: String,
      default: null,
      required: false
    },
    responsive: {
      type: String,
      default: null,
      required: false
    },
    fit: {
      type: String,
      default: null,
      required: false
    }
  }
};
</script>
<style lang="scss" scoped>
.img-fluid {
  width: 100%;
  height: auto;
}
picture.bg-image::v-deep {
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
