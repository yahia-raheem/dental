<template>
  <div class="filter-container">
    <div class="filter-section">
      <div class="title">
        <div class="icon">
          <get-svg :svgid="102" />
        </div>
        <h6 class="text">Search by Name</h6>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Keywords"
        @change="$emit('nameSearch', $event.target.value)"
      />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.filter-section {
  border-bottom: 1px solid #dddedf;
  padding-bottom: 25px;
  width: 100%;
  @include h.appDirAuto($padding-end: 15px);
  input {
    height: 35px;
    font-size: 1rem;
  }
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    .text {
      color: #6a6fb6;
      margin: 0;
    }
    .icon::v-deep {
      @include h.appDirAuto($margin-end: 10px);
      svg {
        width: 15px;
        height: auto;
        path {
          fill: #6a6fb6;
        }
      }
    }
  }
}
</style>
