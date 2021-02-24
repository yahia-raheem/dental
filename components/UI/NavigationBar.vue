<template>
  <ul class="navbar-nav mx-auto">
    <li class="nav-item">
      <nuxt-link class="nav-link" to="/">Our Story</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" to="/">How It Works ?</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" to="/">Browse Labs</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" to="/">Contact Us</nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as *;
.nav-item {
  .nav-link {
    color: $primary;
    font-weight: 600;
    @include appDirAuto($margin-end: 20px);
    transition: all 1s;
    &:hover {
      color: $secondary;
    }
  }
}
</style>
