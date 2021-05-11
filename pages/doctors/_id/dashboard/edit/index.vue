<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Edit Profile</h6>
      <edit-general :doctor="doctor" />
      <edit-details :doctor="doctor" />
      <edit-qualifications :doctor="doctor" />
      <edit-verification :doctor="doctor" />
      <div class="save-all shadow">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 d-flex justify-content-end align-items-center">
              <button class="btn btn-primary" @click.prevent="saveAll">
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditDetails from "~/components/doctors/dashboard/EditDetails.vue";
import EditGeneral from "~/components/doctors/dashboard/EditGeneral.vue";
import EditQualifications from "~/components/doctors/dashboard/EditQualifications.vue";
import EditVerification from "~/components/doctors/dashboard/EditVerification.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EditGeneral,
    EditDetails,
    EditQualifications,
    EditVerification
  },
  async asyncData(context) {
    await context.store.dispatch("doctors/getDocById", context.params.id);
    return {};
  },
  methods: {
    saveAll() {
      this.$emit("saveAll");
    }
  },
  computed: {
    ...mapGetters({
      doctor: "doctors/currDoc"
    })
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
.save-all {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  padding: 10px 0;
  background-color: white;
}
</style>
