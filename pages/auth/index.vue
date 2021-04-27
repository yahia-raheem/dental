<template>
  <section class="auth-page page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h4 class="sec-title">Login</h4>
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
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': $v.password.$error }"
                    id="password"
                    v-model.trim="password"
                    placeholder="Password"
                  />
                  <div class="invalid-feedback" v-if="!$v.password.required">
                    This field is Required
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="cta-container">
                  <p>
                    don't have an account ? click
                    <nuxt-link to="/auth/register" class="text-primary"
                      >here</nuxt-link
                    >
                    to sign up instead.
                  </p>
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
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.$auth
          .loginWith("local", {
            data: {
              'email': this.email,
              'password': this.password
            }
          },);
      }
    }
  },
  validations: {
    email: {
      required
    },

    password: {
      required
    }
  }
};
</script>
<style lang=""></style>
