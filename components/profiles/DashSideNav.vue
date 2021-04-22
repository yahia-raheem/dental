<template>
  <ul class="list">
    <li class="list-item" v-for="(item, key) in list" :key="key">
      <nuxt-link :to="item.link">
        <div class="icon">
          <get-svg :svgid="item.icon" width="20" height="20" />
        </div>
        <div class="title">{{ item.title }}</div>
      </nuxt-link>
    </li>
    <div class="sep" v-if="list.length > 0"></div>
    <li class="list-item">
      <nuxt-link :to="settings.link">
        <div class="icon">
          <get-svg :svgid="109" width="20" height="20" />
        </div>
        <div class="title">{{ settings.title }}</div>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    settings: {
      type: Object,
      default() {
        return {};
      },
      required: false
    }
  },
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.list {
  padding: 0;
  list-style: none;
  .list-item {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #797ebd;
      padding: 7px 10px;
      &.nuxt-link-exact-active {
        background-color: #f2f3fe;
      }
    }
    .icon::v-deep {
      @include h.appDirAuto($margin-end: 15px);
      svg path {
        fill: #797ebd;
      }
    }
  }
}
</style>
