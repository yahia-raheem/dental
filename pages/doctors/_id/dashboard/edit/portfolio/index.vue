<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Portfolio</h6>
      <edit-portfolio profileType="doctor" />
      <h6 class="sub-title">current Albums</h6>
      <div class="current-portfolios">
        <album-block
          profileType="doctor"
          :album="item"
          v-for="(item, index) in doctor.portfolio"
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
  computed: {
    ...mapGetters({
      doctor: "doctors/currDoc"
    })
  },
  components: { EditPortfolio, AlbumBlock },
  methods: {
    async deleteAlbum(albumId) {
      const data = {
        action: "delete",
        id: albumId
      };
      await this.$store.dispatch("doctors/portfolioAction", {
        docId: this.$route.params.id,
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
