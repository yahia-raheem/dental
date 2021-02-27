<template>
  <div class="row tab-container">
    <div class="col-4" v-for="(unit, index) in units" :key="index">
      <div class="wgtab">
        <div class="logo-container">
          <get-svg :svgid="unit.unit_icon" />
        </div>
        <div class="data-container">
          <h5 class="title">{{ unit.unit_title }}</h5>
          <p class="desc">{{ unit.unit_description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    units: {
      default() {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.wgtab {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 30px;
  .title {
    font-weight: bold;
    color: #574f4f;
  }
  .logo-container::v-deep {
    @include h.appDirAuto($margin-end: 15px);
    svg {
      width: 45px;
      height: auto;
    }
  }
}
</style>
