<template>
  <div>
    <nuxt-img
      quality="90"
      :src="img"
      :class="classes"
      format="webp"
      :sizes="responsive"
      :fit="fit"
      :alt="imgAlt"
      loading="lazy"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      img: "",
      imgAlt: ""
    };
  },
  props: {
    imgid: {
      required: true
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
    },
  },
  async fetch() {
    const data = await this.getImage({
      id: this.imgid,
      size: this.size ? this.size : null
    });
    this.img = data.image;
    this.imgAlt = data.alt;
  },
  methods: {
    ...mapActions({
      getImage: "general/getImage"
    })
  }
};
</script>
<style lang=""></style>
