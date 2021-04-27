<template>
  <div>
    <side-bar />
    <the-header />
    <the-innercover />
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    <the-footer />
  </div>
</template>
<script>
import SideBar from '~/components/UI/SideBar.vue'
import TheFooter from '~/components/UI/TheFooter.vue'
import TheHeader from '~/components/UI/TheHeader.vue'
import TheInnercover from '~/components/UI/TheInnercover.vue'
export default {
  name: "default",
  components: { TheHeader, SideBar, TheFooter, TheInnercover },
}
</script>
<style>
  
</style>
