<template>
  <nuxt-link
    :to="{
      name: type == 'lab' ? 'labs-id' : 'doctors-id',
      params: { id: profile.id }
    }"
  >
    <div class="prof-box">
      <div class="leading">
        <div class="logo">
          <get-img-by-link
            :imglink="profileImage"
            responsive="xxl:35px"
            classes="bg-image"
          />
        </div>
        <div class="title">{{ profile.name }}</div>
      </div>
      <div class="trailing">
        <client-only>
          <nuxt-link :to="editLink">
            <get-svg-2 svg="edit" width="15" height="15" />
          </nuxt-link>
        </client-only>
      </div>
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
    editLink() {
      if (this.type == "lab") {
        return `/labs/${this.profile.id}/dashboard/edit`;
      } else {
        return `/doctors/${this.profile.id}/dashboard/edit`;
      }
    },
    profileImage() {
      if (this.profile.picture != null) {
        return `${process.env.storageBase}/${this.profile.picture}`;
      } else {
        return "/images/Group-571.png";
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
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  .trailing::v-deep {
    display: flex;
    min-width: 15px;
    justify-content: center;
    align-items: center;
    @include h.appDirAuto($margin-start: 10px);
    svg path {
      fill: white;
    }
    @include h.media(">992px") {
      svg path {
        fill: h.$body-color;
      }
    }
  }
  .leading {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
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
