<template>
  <div class="form-container mb-5">
    <div class="header">
      <h5>General Settings</h5>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group col">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model.trim="firstName"
            placeholder="First Name"
          />
        </div>
        <div class="form-group col">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model.trim="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': $v.email.$error }"
            id="email"
            v-model.trim="email"
            placeholder="Email"
          />

          <div class="invalid-feedback" v-if="!$v.email.email">
            This field must be a valid email
          </div>
        </div>
        <div class="form-group col">
          <label for="phoneNumber">Phone Number</label>
          <input
            type="number"
            class="form-control"
            id="phoneNumber"
            v-model.trim="phoneNumber"
            placeholder="Phone Number"
          />
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
import { email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("done");
      }
    }
  },
  validations: {
    email: {
      email
    }
  }
};
</script>
<style lang=""></style>
