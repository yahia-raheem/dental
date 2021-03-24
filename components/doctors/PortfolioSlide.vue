<template>
  <div class="row">
    <div class="col-4">
      <div class="portfolio-box">
        <div class="img-container">
          <get-img :imgid="92" classes="bg-image" responsive="xxl:210px" />
        </div>
        <h6 class="title">Case Name</h6>
      </div>
    </div>
    <div class="col-4">
      <div class="portfolio-box">
        <div class="img-container">
          <get-img :imgid="91" classes="bg-image" responsive="xxl:210px" />
        </div>
        <h6 class="title">Case Name</h6>
      </div>
    </div>
    <div class="col-4">
      <div class="portfolio-box">
        <div class="img-container">
          <get-img :imgid="92" classes="bg-image" responsive="xxl:210px" />
        </div>
        <h6 class="title">Case Name</h6>
      </div>
    </div>
    <div class="col-4">
      <div class="portfolio-box">
        <div class="img-container">
          <get-img :imgid="91" classes="bg-image" responsive="xxl:210px" />
        </div>
        <h6 class="title">Case Name</h6>
      </div>
    </div>
    <div class="col-4">
      <div class="portfolio-box">
        <div class="img-container">
          <get-img :imgid="92" classes="bg-image" responsive="xxl:210px" />
        </div>
        <h6 class="title">Case Name</h6>
      </div>
    </div>
    <div class="col-4">
      <div class="portfolio-box">
        <div class="img-container">
          <get-img :imgid="91" classes="bg-image" responsive="xxl:210px" />
        </div>
        <h6 class="title">Case Name</h6>
      </div>
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
.portfolio-box {
  width: 210px;
  position: relative;
  margin-bottom: 30px;
  .img-container {
    @include h.box-ratio(3, 2);
    border-radius: 10px;
    border: 1px solid #f0f0f0;
  }
  .title {
    margin-bottom: 0;
    margin-top: 5px;
    color: h.$body-color;
  }
}
</style>
