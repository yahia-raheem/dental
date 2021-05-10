<template>
  <div class="banner-container">
    <div class="vail"></div>
    <get-img
      :imgobj="bannerImage"
      classes="bg-image"
      responsive="xxl:80vw,lg:90vw,sm:95vw"
    />
    <div class="data-container">
      <h5 class="title">{{ bannerTitle }}</h5>
      <p class="subtitle">{{ bannerSubtitle }}</p>
      <div class="buttons-container">
        <nuxt-link to="/auth/register" class="btn btn-doctor">Create Your Account</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bannerImage: {
      required: true
    },
    bannerTitle: {
      type: String,
      required: true
    },
    bannerSubtitle: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.banner-container {
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 50px;
  overflow: hidden;
  border-radius: 10px;
  .vail {
    z-index: 2;
  }
  .data-container {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px 20px;
    @include h.media(">500px") {
      padding: 20px 40px;
    }
    .title,
    .subtitle {
      color: white;
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }
    .buttons-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .btn {
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        border-radius: 10px;
        &:first-of-type {
          margin-bottom: 20px;
        }
        &.btn-doctor {
          background-color: #ffb964;
          color: #af702b;
          &:hover {
            background-color: #49b9c9;
            color: #135d6c;
          }
        }
        &.btn-lab {
          background-color: #49b9c9;
          color: #135d6c;
          &:hover {
            background-color: #ffb964;
            color: #af702b;
          }
        }
        @include h.media(">410px") {
          &:not(:last-of-type) {
            @include h.appDirAuto($margin-end: 15px);
          }
          &:first-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
