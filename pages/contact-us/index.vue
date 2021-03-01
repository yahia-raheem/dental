<template>
  <section class="Contact-us">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="banner-container"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async asyncData(context) {
    const pageData = await context.store.dispatch(
      "pages/setCurrentPage",
      process.env.contactUs
    );
    return {
      page: pageData,
    };
  }
};
</script>
<style lang=""></style>
