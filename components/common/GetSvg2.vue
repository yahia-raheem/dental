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
    :style="cssProps"
    class="svg-container"
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
    },
    cssProps() {
      return {
        "--svg-width": this.width ? `${this.width}px` : "auto",
        "--svg-height": this.height ? `${this.height}px` : "auto"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.svg-container::v-deep {
  svg {
    width: var(--svg-width);
    height: var(--svg-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
