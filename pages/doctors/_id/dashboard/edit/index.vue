<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Edit Profile</h6>
      <edit-general :doctor="doctor" />
      <edit-details :doctor="doctor" />
      <edit-qualifications :doctor="doctor" />
      <edit-verification :doctor="doctor" />
    </div>
  </div>
</template>
<script>
import EditDetails from "~/components/doctors/dashboard/EditDetails.vue";
import EditGeneral from "~/components/doctors/dashboard/EditGeneral.vue";
import EditQualifications from "~/components/doctors/dashboard/EditQualifications.vue";
import EditVerification from "~/components/doctors/dashboard/EditVerification.vue";

export default {
  components: {
    EditGeneral,
    EditDetails,
    EditQualifications,
    EditVerification
  },
  async asyncData(context) {
    const doctor = await context.store.dispatch(
      "doctors/getDocById",
      context.params.id
    );
    if (doctor.user_id != context.$auth.user.id) {
      context.redirect("/");
    }
    return {
      doctor
    };
  }
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
