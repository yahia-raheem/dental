<template>
  <div class="form-container pending">
    <form @submit.prevent="submitRegister">
      <div class="form-row">
        <div class="form-group col-lg-6 col-md-12">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': $v.firstName.$error }"
            id="firstName"
            v-model.trim="firstName"
            placeholder="First Name"
          />
          <div class="invalid-feedback" v-if="!$v.firstName.required">
            This field is Required
          </div>
        </div>
        <div class="form-group col-lg-6 col-md-12">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': $v.lastName.$error }"
            id="lastName"
            v-model.trim="lastName"
            placeholder="Last Name"
          />
          <div class="invalid-feedback" v-if="!$v.lastName.required">
            This field is Required
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-lg-6 col-md-12">
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
          <div class="invalid-feedback" v-if="!$v.email.email">
            This field must be a valid email
          </div>
        </div>
        <div class="form-group col-lg-6 col-md-12">
          <label for="phoneNumber">Phone Number</label>
          <input
            type="number"
            class="form-control"
            :class="{ 'is-invalid': $v.phoneNumber.$error }"
            id="phoneNumber"
            v-model.trim="phoneNumber"
            placeholder="Phone Number"
          />
          <div class="invalid-feedback" v-if="!$v.phoneNumber.required">
            This field is Required
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-lg-6 col-md-12">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': $v.password.$error }"
            id="password"
            v-model.trim="password"
            placeholder="Password"
          />
          <small id="passHelp" class="form-text text-muted">
            <ul>
              <li>Password must contain at least 1 upper case character</li>
              <li>Password must contain at least 1 number</li>
              <li>Password must be at least 6 characters long</li>
            </ul>
          </small>
          <div class="invalid-feedback" v-if="!$v.password.required">
            This field is Required
          </div>
          <div class="invalid-feedback" v-if="!$v.password.valid">
            Password must contain one lowercase, and one uppercase character,
            and one number
          </div>
          <div class="invalid-feedback" v-if="!$v.password.minLength">
            Password must be at least 6 characters
          </div>
        </div>
        <div class="form-group col-lg-6 col-md-12">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': $v.confirmPassword.$error }"
            id="confirmPassword"
            v-model.trim="confirmPassword"
            placeholder="Confirm Password"
          />
          <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs">
            Password and confirmation must match
          </div>
          <div class="invalid-feedback" v-if="!$v.confirmPassword.required">
            This field is Required
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="cta-container">
          <p class="text-center mb-3">
            already have an account ? click
            <nuxt-link to="/auth" class="text-primary">here</nuxt-link> to sign
            in instead.
          </p>
          <button
            type="submit"
            class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
          >
            <span class="text"> Next </span>
            <div class="icon">
              <get-svg :svgid="108" width="15" />
            </div>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      password: null,
      confirmPassword: null
    };
  },
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy();
  },
  methods: {
    async submitRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = await this.$recaptcha.execute("register");
        const data = { token };
        const captchaRes = await this.$store.dispatch(
          "general/checkCaptcha",
          data
        );
        if (captchaRes.success == true) {
          this.$axios
            .$post(`${process.env.apiUrl}/api/register`, {
              first_name: this.firstName,
              last_name: this.lastName,
              email: this.email,
              phone_number: this.phoneNumber,
              password: this.password,
              password_confirmation: this.confirmPassword,
              recaptcha: token
            })
            .then(result => {
              this.$auth
                .setUserToken(result.token, result.refresh_token)
                .then(_ => {
                  this.$emit("done");
                  this.$router.go();
                });
            })
            .catch(err => {
              if (400 < err.response.status < 500) {
                for (const key in err.response.data.errors) {
                  if (
                    Object.hasOwnProperty.call(err.response.data.errors, key)
                  ) {
                    const element = err.response.data.errors[key];
                    this.$vToastify.error({ body: element[0], title: key });
                  }
                }
              } else {
                this.$vToastify.error({
                  body: "Sorry an unknown error occured"
                });
              }
            });
        } else {
          this.$vToastify.error({
            body:
              "Sorry, this request faild the reCaptcha test. try again later",
            title: "reCaptcha Error"
          });
        }
      }
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      required
    },
    password: {
      required,
      minLength: minLength(6),
      valid: function(value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return containsUppercase && containsLowercase && containsNumber;
      }
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
#passHelp ul {
  @include h.appDirAuto($padding-start: 15px);
}
</style>
