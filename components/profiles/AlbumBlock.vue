<template>
  <div class="album-tile">
    <div class="body">
      <nuxt-link
        :to="{
          name: 'labs-id-dashboard-edit-portfolio-album',
          params: { id: $route.params.id, album: album.id }
        }"
      >
        <h6 class="title">{{ album.title }}</h6>
      </nuxt-link>
    </div>
    <div class="trailing">
      <nuxt-link
        :to="{
          name: 'labs-id-dashboard-edit-portfolio-album',
          params: { id: $route.params.id, album: album.id }
        }"
        class="btn btn-primary"
      >
        <get-svg-2 svg="edit" width="15" height="15" />
      </nuxt-link>
      <button class="btn delete-btn" @click="deleteAlbum">
        <get-svg-2 svg="delete" width="15" height="15" />
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
  methods: {
    deleteAlbum() {
      this.$emit("deleteAlbum", this.album.id);
    }
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
    .btn::v-deep {
      padding: 5px;
      line-height: 0;
      svg path,
      svg polygon {
        fill: white;
      }

      &.delete-btn {
        background-color: #d5072a;
        @include h.appDirAuto($margin-start: 5px);
      }
    }
  }
}
</style>
