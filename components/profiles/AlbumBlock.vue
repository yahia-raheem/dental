<template>
  <div class="album-tile">
    <div class="body">
      <nuxt-link to="/">
        <h6 class="title">{{ album.title }}</h6>
      </nuxt-link>
    </div>
    <div class="trailing">
      <button class="btn btn-primary">
        <get-svg :svgid="119" width="15" height="15" />
      </button>
      <button class="btn delete-btn" @click="deleteAlbum">
        <get-svg :svgid="112" width="15" height="15" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    album: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    console.log(this.album);
  },
  methods: {
    deleteAlbum() {}
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.album-tile {
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .title {
    margin-bottom: 0;
    color: h.$primary;
  }
  .trailing {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button::v-deep {
      padding: 5px;
      line-height: 0;
      svg path,
      svg polygon {
        fill: white;
      }
      &:not(:last-of-type) {
        @include h.appDirAuto($margin-end: 5px);
      }
      &.delete-btn {
        background-color: #d5072a;
      }
    }
  }
}
</style>
