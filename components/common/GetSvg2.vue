<template>
  <!-- <img
      :src="src"
      class="style-svg"
      ref="theImg"
      :width="width"
      :height="height"
    /> -->
  <div
    v-html="require(`~/static/svgs/${svg}.svg?raw`)"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>
<script>
export default {
  props: {
    svg: {
      reauired: false
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
    src() {
      return `@/svgs/${this.svg}.svg`;
    }
  }
};
</script>
<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
