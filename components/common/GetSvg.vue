<template>
  <div>
    <img :src="svg" class="style-svg" ref="theImg">
  </div>
</template>
<script>
import { mapActions } from "vuex";
import imgToSvg from '~/mixins/imgToSvg.js'
export default {
  data() {
    return {
      svg: ""
    };
  },
  mixins: [imgToSvg],
  props: {
    svgid: {
      reauired: true
    }
  },
  async fetch() {
    const data = await this.getImage({
        id: this.svgid,
    });
    this.svg = data.image
  },
  mounted() {
    this.transformToSvg(this.$refs.theImg)
  },
  methods: {
    ...mapActions({
      getImage: "general/getImage"
    })
  }
};
</script>
<style lang=""></style>
