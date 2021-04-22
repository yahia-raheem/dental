<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Edit Profile</h6>
      <edit-general />
    </div>
  </div>
</template>
<script>
import EditGeneral from "~/components/profiles/EditGeneral.vue";

export default {
  components: { EditGeneral },
  methods: {
    coverImage(e) {
      console.log(e.target.files);
    },
    profileImage(e) {
      console.log(e.target.files);
    },
  },
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.edit-box {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px 30px;
  .header {
    padding: 15px 0;
    border-bottom: 1px dotted #e0e0e0;
    .title {
      color: h.$primary;
      margin-bottom: 10px;
    }
  }
}
</style>