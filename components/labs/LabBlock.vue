<template>
  <div class="lab-block shadow-sm">
    <div class="logo">
      <div class="img-container">
        <get-img :imgid="29" responsive="xxl:120px" classes="bg-image" />
      </div>
    </div>
    <div class="data-container">
      <h6 class="title">{{ lab.title }}</h6>
      <client-only>
        <div class="lab-rating">
          <div class="value shadow-sm">
            {{ lab.rating }}
          </div>
          <star-rating
            :rating="lab.rating"
            :increment="0.5"
            :show-rating="false"
            :read-only="true"
            :star-size="18"
            :glow="1"
          ></star-rating>
          <div class="review-count">
            ( 24 Reviews)
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lab: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.lab-block {
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 30px;
  .logo {
    width: 120px;
    @include h.appDirAuto($margin-end: 15px);
    .img-container {
      @include h.box-ratio(4, 3);
      border: 1px solid #f2f2f3;
      border-radius: 10px;
    }
  }
  .data-container {
    .title {
      color: #4b6b83;
      margin-bottom: 5px;
    }
    .lab-rating {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .value {
        background-color: #ffd161;
        margin-top: 5px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        @include h.appDirAuto($margin-end: 15px);
        font-size: 0.7rem;
      }
      .review-count {
        margin-top: 5px;
        @include h.appDirAuto($margin-start: 10px);
        font-size: 0.8rem;
      }
    }
  }
}
</style>
