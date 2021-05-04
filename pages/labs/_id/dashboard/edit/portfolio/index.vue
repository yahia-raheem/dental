<template>
  <div class="row">
    <div class="col-12">
      <h6 class="sub-title">Portfolio</h6>
      <edit-portfolio v-on:syncPortfolio="syncPortfolio" />
      <h6 class="sub-title">current Albums</h6>
      <div class="current-portfolios" v-for="(item, index) in portfolio" :key="index">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import EditPortfolio from "~/components/profiles/EditPortfolio.vue";
export default {
  async asyncData(context) {
    const { portfolio } = await context.store.dispatch(
      "labs/getLabById",
      context.params.id
    );
    return {
      portfolio,
    };
  },
  components: { EditPortfolio },
  methods: {
    syncPortfolio(portfolio) {
      this.portfolio = portfolio;
    },
  },
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
