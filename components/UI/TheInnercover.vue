<template>
  <div class="inner-cover">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-12 d-flex justify-content-start align-items-center">
          <h1 class="innercover-title">{{ pageTitle }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      currPage: "pages/currentPage",
      pageTitle: "pages/currPageTitle"
    })
  }
};
</script>
<style lang="scss" scopeed>
.inner-cover {
  color: white;
  background: rgb(136, 128, 228);
  background: linear-gradient(
    90deg,
    rgba(136, 128, 228, 1) 0%,
    rgba(86, 210, 250, 1) 100%
  );
  padding: 25px 0;
  .innercover-title {
    color: white;
    font-size: 1.6rem;
    margin: 0;
  }
}
</style>
