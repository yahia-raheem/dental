<template>
  <section class="error-page">
    <div class="container">
      <div class="row">
        <div
          class="col-12 d-flex justify-content-center align-items-center flex-column"
        >
          <div class="circle">
            <div class="vail"></div>
            <div class="status-code">{{ error.statusCode }}</div>
          </div>
          <p class="msg-prefix">
            Sorry! an error occured. the following message could be helpfull.
          </p>
          <div class="msg-box">
            <span>{{ error.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "error",
  props: ["error"],
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.error-page {
  background-color: #f5f9fa;
}
.circle {
  border: 2px solid h.$primary;
  position: relative;
  overflow: hidden;
  @include h.circle(90px);
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .vail {
    background-color: h.$primary;
  }
  .status-code {
    color: h.$primary;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
.msg-box {
    margin-top: 30px;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d6f5ff;
}
</style>
