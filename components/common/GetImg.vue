<template>
  <div>
    <nuxt-picture
      quality="90"
      :src="img"
      :class="classes"
      format="webp"
      :sizes="responsive"
      :fit="fit"
      :alt="imgAlt"
      loading="lazy"
      v-if="$fetchState.pending == false"
    />
    <!-- <img
      :src="img"
      :class="classes"
      :alt="imgAlt"
      loading="lazy"
    /> -->
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
    },
    imgobj: {
      required: false,
      default: null
    }
  },
  async fetch() {
    if (this.imgobj == null) {
      const data = await this.getImage({
        id: this.imgid,
        size: this.size ? this.size : null
      });
      this.img = data.image;
      this.imgAlt = data.alt;
    } else {
      this.img = this.imgobj.full_url;
      this.imgAlt = this.imgobj.alt;
      this.addImg({
        alt: this.imgobj.alt,
        id: this.imgobj.ID,
        image: this.imgobj.full_url
      });
    }
  },
  methods: {
    ...mapActions({
      getImage: "general/getImage",
      addImg: "general/addImg"
    })
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
