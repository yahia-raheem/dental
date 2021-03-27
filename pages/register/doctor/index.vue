<template>
  <section class="page internal doctor-register">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 sec-title">
          <h4>Dentist Sign Up</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-start">
          <div class="form-container">
            <form @submit.prevent="submitRegister">
              <div class="form-row">
                <div class="form-group col">
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': $v.firstName.$error }"
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
                    :class="{ 'is-invalid': $v.lastName.$error }"
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
                </div>
                <div class="form-group col">
                  <label for="phoneNumber">Phone Number</label>
                  <input
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': $v.phoneNumber.$error }"
                    id="phoneNumber"
                    v-model.trim="phoneNumber"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': $v.password.$error }"
                    id="password"
                    v-model.trim="password"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group col">
                  <label for="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': $v.confirmPassword.$error }"
                    id="confirmPassword"
                    v-model.trim="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="degree">Degree</label>
                  <v-select
                    id="degree"
                    v-model.trim="degree"
                    :class="{ 'is-invalid': $v.degree.$error }"
                    placeholder="Degree"
                  ></v-select>
                </div>
                <div class="form-group col">
                  <label for="speciality">Speciality</label>
                  <v-select
                    id="speciality"
                    v-model.trim="speciality"
                    :class="{ 'is-invalid': $v.speciality.$error }"
                    placeholder="Speciality"
                  ></v-select>
                </div>
              </div>
              <div class="form-row">
                <div class="cta-container">
                  <p>
                    Are you a Laboratory?
                    <nuxt-link to="/">Click here</nuxt-link>
                  </p>
                  <button type="submit" class="btn btn-primary submit-btn">
                    Register
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      password: null,
      confirmPassword: null,
      degree: null,
      speciality: null
    };
  },
  methods: {
    submitRegister() {
      this.$v.$touch();
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
      required
    },
    phoneNumber: {
      required
    },
    password: {
      required,
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
    },
    degree: {
      required
    },
    speciality: {
      required
    }
  }
};
</script>
<style lang="scss">
.form-container {
    max-width: 830px;
    padding: 40px;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    width: stretch;
}
</style>
