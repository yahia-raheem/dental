<template>
  <div>
    <img :src="svg" class="style-svg">
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      svg: ""
    };
  },
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
  methods: {
    ...mapActions({
      getImage: "general/getImage"
    })
  }
};
</script>
<style lang=""></style>
