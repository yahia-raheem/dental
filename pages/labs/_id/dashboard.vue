<template>
  <section class="lab-edit page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-md-12">
          <div class="sidebar-container">
              <dash-side-nav
                :list="list"
                :settings="{
                  title: 'Edit Profile',
                  link: `/labs/${$route.params.id}/dashboard/edit`
                }"
              />
          </div>
        </div>
        <div class="col-lg-9 col-md-12">
          <nuxt-child />
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
    };
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.sidebar-container {
  height: 100%;
  @include h.appDirAuto($padding-end: 20px);
  @include h.appDirAuto($border-end: 1px solid #eaebec);
}
</style>
