<template>
  <div class="lab-block shadow-sm">
    <div class="logo">
      <div class="img-container">
        <get-img :imgid="29" responsive="xxl:500px" classes="bg-image" />
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
      <div class="location">
        <get-svg :svgid="79" width="18" />
        <span class="text">{{ lab.location | stringify }}</span>
      </div>
      <hr>
      <div class="footer d-flex justify-content-between align-items-center w-100">
        <button class="btn profile-cta">View Profile</button>
        <button class="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lab: {
      type: Object
    }
  },
  filters: {
    stringify(v) {
      return v.join(", ")
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
    min-width: 120px;
    @include h.appDirAuto($margin-end: 15px);
    .img-container {
      @include h.box-ratio(6,5);
      border: 1px solid #f2f2f3;
      border-radius: 10px;
    }
  }
  .data-container {
    width: stretch;
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
  .location::v-deep {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 8px;
    svg {
      @include h.appDirAuto($margin-end: 10px);
      path {
        fill: #6a6fb6;
      }
    }
    .text {
      font-size: 0.8rem;
      margin-top: 4px;
    }
  }
  hr {
    margin-top: 0.5rem;
    margin-bottom: 0.8rem;
  }
  .footer {
    .btn {
      font-size: 0.8rem;
      padding: 5px 10px;
      &.profile-cta {
        font-weight: bold;
      }
    }
  }
}
</style>
