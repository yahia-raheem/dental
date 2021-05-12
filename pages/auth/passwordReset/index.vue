<template>
  <section class="auth-page page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h4 class="sec-title">Reset Password</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-start">
          <div class="form-container pending">
            <form @submit.prevent="submit">
              <div class="form-row">
                <div class="form-group col-12">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': $v.email.$error }"
                    id="email"
                    v-model.trim="email"
                    placeholder="Email"
                  />
                  <div class="invalid-feedback" v-if="!$v.email.required">
                    This field is Required
                  </div>
                  <small id="locHelp" class="form-text text-muted"
                    >If this email is correct you'll get an email with the
                    required steps to continue</small
                  >
                </div>
              </div>
              <div class="form-row">
                <div class="cta-container">
                  <button
                    type="submit"
                    class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
                  >
                    <span class="text">
                      Submit
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  async fetch(context) {
    context.store.dispatch("pages/setTitle", "Reset Password");
  },
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: {
      required
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const form = new FormData();
        form.append("email", email);
        await this.$store.dispatch("user/resetPass", form);
      }
    }
  }
};
</script>
<style lang="scss">
.text-primary {
  text-decoration: underline;
}
</style>
