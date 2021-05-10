<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Edit Profile</h6>
      <edit-general :lab="lab" />
      <edit-details :lab="lab" />
      <edit-price-list
        :labId="lab.id"
        :plist="lab.price_list"
        v-if="lab.price_list != null"
      />
      <edit-price-list :labId="lab.id" v-if="lab.price_list == null" />
      <edit-social-media :labSocial="lab.social_profiles" :labId="lab.id" />
    </div>
  </div>
</template>
<script>
import EditDetails from "~/components/profiles/EditDetails.vue";
import EditGeneral from "~/components/profiles/EditGeneral.vue";
import EditPriceList from "~/components/profiles/EditPriceList.vue";
import EditSocialMedia from "~/components/profiles/EditSocialMedia.vue";
import { mapGetters } from "vuex";

export default {
  middleware: ["auth"],
  components: { EditGeneral, EditDetails, EditPriceList, EditSocialMedia },
  async asyncData(context) {
    const lab = await context.store.dispatch(
      "labs/getLabById",
      context.params.id
    );
    if (lab.user_id != context.$auth.user.id) {
      context.redirect("/");
    }
    context.store.dispatch("pages/setTitle", lab.name);
  },
  computed: {
    ...mapGetters({
      lab: "labs/currLab"
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
</style>
