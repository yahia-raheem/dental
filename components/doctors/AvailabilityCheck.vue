<template>
  <div :class="{ 'check-box': true, active: active }">
    <div class="icon">
      <div class="vail"></div>
    </div>
    <div class="text">{{ text }}</div>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "check"
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.check-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .text {
    font-weight: 600;
  }
  .icon {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    @include h.circle(25px);
    @include h.appDirAuto($margin-end: 15px);
    .vail {
      opacity: 0.2;
    }
    &::after {
      @include h.center();
      content: "\2713";
      font-size: 1.3rem;
    }
  }
  &.active {
    .icon {
      .vail {
        background-color: h.$primary;
      }
      &::after {
        color: h.$primary;
      }
    }
    .text {
      color: h.$primary;
    }
  }
}
</style>
