<template>
  <div>
    <img :src="svg" class="style-svg" ref="theImg" />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import imgToSvg from "~/mixins/imgToSvg.js";
export default {
  mixins: [imgToSvg],
  data() {
    return {
      svg: ""
    };
  },
  props: {
    svgid: {
      reauired: false
    },
    svgobj: {
      required: false,
      default: null
    }
  },
  mounted() {
    if (this.svgobj == null) {
      this.getImage({
        id: this.svgid
      }).then(data => {
        this.svg = data.image;
        this.transformToSvg(this.$refs.theImg);
      });
    } else {
      this.addImg({
        alt: this.svgobj.alt,
        id: this.svgobj.ID,
        image: this.svgobj.full_url
      });
      this.svg = this.svgobj.full_url;
      this.transformToSvg(this.$refs.theImg);
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
<style lang=""></style>
