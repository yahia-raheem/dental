<template>
  <div>
    <side-bar />
    <the-header />
    <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    <the-footer />
  </div>
</template>
<script>
import SideBar from "~/components/UI/SideBar.vue";
import TheFooter from "~/components/UI/TheFooter.vue";
import TheHeader from "~/components/UI/TheHeader.vue";
export default {
  name: "home",
  components: { TheHeader, SideBar, TheFooter }
};
</script>
<style lang="scss"></style>
