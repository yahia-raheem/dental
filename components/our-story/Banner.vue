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
        <nuxt-link to="/" class="btn btn-doctor">Doctor</nuxt-link>
        <nuxt-link to="/" class="btn btn-lab">Laboratory</nuxt-link>
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
    padding: 20px 40px;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title,
    .subtitle {
      color: white;
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }
    .buttons-container {
      display: flex;
      .btn {
        width: 160px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        border-radius: 10px;
        &:not(:last-of-type) {
          @include h.appDirAuto($margin-end: 15px);
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
      }
    }
  }
}
</style>
