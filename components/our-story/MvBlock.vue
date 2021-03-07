<template>
  <div class="mv-block shadow-sm">
    <div class="logo-container">
      <div class="vail"></div>
      <get-svg :svgid="block.logo" />
    </div>
    <h4 class="title">{{ block.title }}</h4>
    <p class="content">
      {{ block.content }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    block: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.mv-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  max-width: 500px;
  .title {
    color: #7072a0;
    margin-bottom: 20px;
  }
  .logo-container::v-deep {
    position: relative;
    @include h.circle(60px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    .vail {
      background-color: #7072a0;
      opacity: 0.3;
    }
    svg {
      width: 40px;
      height: auto;
      path {
        fill: #7072a0;
      }
    }
  }
}
</style>
