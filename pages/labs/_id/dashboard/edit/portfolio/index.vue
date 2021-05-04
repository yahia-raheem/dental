<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Portfolio</h6>
      <edit-portfolio />
    </div>
  </div>
</template>
<script>
import EditPortfolio from "~/components/profiles/EditPortfolio.vue";
export default {
  components: { EditPortfolio }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.sub-title {
  color: #4b6b83;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
