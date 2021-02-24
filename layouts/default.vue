<template>
  <div>
    <side-bar />
    <the-header />
    <Nuxt />
  </div>
</template>
<script>
import SideBar from '~/components/UI/SideBar.vue'
import TheHeader from '~/components/UI/TheHeader.vue'
export default {
  components: { TheHeader, SideBar },
}
</script>
<style lang="scss">
</style>
