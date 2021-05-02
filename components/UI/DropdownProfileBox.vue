<template>
  <nuxt-link
    :to="{
      name: type == 'lab' ? 'labs-id' : 'doctors-id',
      params: { id: profile.id }
    }"
  >
    <div class="prof-box">
      <div class="logo">
        <get-img-by-link
          :imglink="profileImage"
          responsive="xxl:35px"
          classes="bg-image"
        />
      </div>
      <div class="title">{{ profile.name }}</div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      }
    },
    type: {
      type: String,
      default: "lab"
    }
  },
  computed: {
    profileImage() {
      if (this.profile.picture != null) {
        return `${process.env.storageBase}/${this.profile.picture}`;
      } else {
        return "/images/Profile_avatar_placeholder_large.png";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.prof-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
  .logo {
    position: relative;
    min-width: 25px;
    min-height: 25px;
    @include h.circle(25px);
    @include h.appDirAuto($margin-end: 10px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
