<template>
  <div class="success form-container">
    <div class="row">
      <div
        class="col-12 mt-5 mb-5 d-flex justify-content-center align-items-center flex-column"
      >
        <div class="check-box">
          <get-svg :svgid="99" width="20" height="20" />
        </div>
        <h3 class="success-title">Congratulation!</h3>
        <p class="success-subtitle" v-if="type == 'dentist'">
          You have just created your account and your first profile. Please
          check your profile's dashboard to upload the required document for
          account verification.
        </p>
        <p class="success-subtitle" v-if="type == 'lab'">
          You have just created your account and your first profile. Feel free
          to check your profile for now while we verify your information.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: ""
  },
  mounted() {
    setTimeout(() => {
      this.$router.go();
    }, 3000);
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.form-container {
  &.success {
    .success-title {
      color: #438850;
      margin-bottom: 20px;
    }
    .success-subtitle {
      text-align: center;
    }
    .check-box::v-deep {
      @include h.circle(30px);
      margin-bottom: 20px;
      background-color: #438850;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        path {
          fill: white;
        }
      }
    }
    .skip-btn {
      width: auto;
      padding: 0.5rem;
      @include h.appDirAuto($margin-end: 10px);
    }
  }
}
</style>
