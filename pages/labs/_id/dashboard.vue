<template>
  <section class="lab-edit page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="sidebar-container">
            <dash-side-nav
              :list="list"
              :settings="{'title': 'Edit Profile', 'link': {'name': 'labs-id-dashboard-edit'}}"
            />
          </div>
        </div>
        <div class="col-9">
          <nuxt-child keep-alive />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import DashSideNav from "~/components/profiles/DashSideNav.vue";

export default {
  components: { DashSideNav },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    console.log(this.$route.name);
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.sidebar-container {
  @include h.appDirAuto($padding-end: 20px);
  @include h.appDirAuto($border-end: 1px solid #eaebec)
}
</style>
