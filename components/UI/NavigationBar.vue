<template>
  <ul class="navbar-nav mx-auto">
    <li class="nav-item" v-for="(item, index) in headerMenu" :key="index">
      <nuxt-link class="nav-link" :to="item.parent.url != '#' ? item.parent.url : '/'">{{ item.parent.title }}</nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      headerMenu: "general/headerMenu"
    })
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.nav-item {
  .nav-link {
    color: h.$primary;
    font-weight: 600;
    @include h.appDirAuto($margin-end: 20px);
    transition: all 1s;
    &:hover {
      color: h.$secondary;
    }
    &.nuxt-link-active {
      color: h.$secondary;
    }
  }
}
</style>
