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
  async fetch(context) {
    context.store.dispatch("pages/setTitle", "Log In");
  },
  created() {
    if (typeof this.$route.query.reset != "undefined") {
      if (this.$route.query.reset == 'true') {
        this.$vToastify.success({ title: 'success', body: 'password has been reset' });
      } else {
        this.$vToastify.error({ title: 'error', body: 'Either the link was invalid or expired. Please try again' });
      }
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$auth
          .loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(_ => {
          })
          .catch(err => {
            if (400 < err.response.status < 500) {
              err.response.data.errors.forEach(error => {
                this.$vToastify.error({ body: error });
              });
            } else {
              this.$vToastify.error({ body: "Sorry an unknown error occured" });
            }
          });
      }
    },
    getMethods(obj) {
      var result = [];
      for (var id in obj) {
        try {
          result.push(id + ": " + obj[id].toString());
        } catch (err) {
          result.push(id + ": inaccessible");
        }
      }
      return result;
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
<style lang="scss" scoped>
.text-primary {
  text-decoration: underline;
}
</style>
