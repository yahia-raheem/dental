<template>
  <div class="form-container">
    <div class="header">
      <h5>Authorization</h5>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group col">
          <label for="password">Current Password</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': $v.oldPassword.$error }"
            id="currnetPassword"
            v-model.trim="oldPassword"
            placeholder="Current Password"
          />
          <div class="invalid-feedback" v-if="!$v.oldPassword.required">
            This field is Required
          </div>
        </div>
        <div class="form-group col">
          <label for="password">New Password</label>
          <input
            type="password"
            class="form-control"
            :class="{ 'is-invalid': $v.password.$error }"
            id="password"
            v-model.trim="password"
            placeholder="New Password"
          />
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
      </div>
      <div class="form-row">
        <div class="form-group col-12">
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
          <button
            type="submit"
            class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
          >
            <span class="text">
              Update
            </span>
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
      oldPassword: null,
      password: null,
      confirmPassword: null
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = {
          old_password: this.oldPassword,
          password: this.password,
          password_confirmation: this.confirmPassword
        };
        this.$store
          .dispatch("user/changePass", data)
          .then(result => {
            this.$auth
              .setUserToken(result.token, result.refresh_token)
              .then(res => {
                this.$vToastify.success({
                  body: "Password Updated!",
                  title: "Success"
                });
                this.$router.go();
              });
          })
          .catch(err => {
            if (err.response.status < 500) {
              this.$vToastify.error({
                body: err.response.data.errors[0],
                title: "Error"
              });
            } else {
              this.$vToastify.error({
                body: "Sorry, an unknown error occured",
                title: "Error"
              });
            }
          });
      }
    }
  },
  validations: {
    oldPassword: {
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
<style lang=""></style>
