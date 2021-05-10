<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Portfolio</h6>
      <edit-portfolio />
      <h6 class="sub-title">current Albums</h6>
      <div class="current-portfolios">
        <album-block
          :album="item"
          v-for="(item, index) in lab.portfolio"
          :key="index"
          v-on:deleteAlbum="deleteAlbum"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlbumBlock from "~/components/profiles/AlbumBlock.vue";
import EditPortfolio from "~/components/profiles/EditPortfolio.vue";
import { mapGetters } from "vuex";

export default {
  middleware: ["auth"],
  async asyncData(context) {
    const lab = await context.store.dispatch(
      "labs/getLabById",
      context.params.id
    );
    if (lab.user_id != context.$auth.user.id) {
      context.redirect("/");
    }
    return {};
  },
  computed: {
    ...mapGetters({
      lab: "labs/currLab"
    })
  },
  components: { EditPortfolio, AlbumBlock },
  methods: {
    async deleteAlbum(albumId) {
      const data = {
        action: "delete",
        id: albumId
      };
      await this.$store.dispatch("labs/portfolioAction", {
        labId: this.$route.params.id,
        data: data
      });
      this.$vToastify.success({
        body: "Album Deleted",
        title: "success"
      });
    }
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
