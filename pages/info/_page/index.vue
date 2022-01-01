<template>
  <div class="col-12" v-html="page.content"></div>
</template>

<script>
export default {
  async asyncData(context) {
    try {
      const pageData = await context.store.dispatch(
        "pages/setCurrentPage",
        context.params.page
      );
      return {
        page: pageData,
      };
    } catch (error) {
      context.redirect('/')
    }
  },
};
</script>

<style>
</style>