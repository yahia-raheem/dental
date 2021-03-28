<template>
  <section class="page internal doctor-register">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h4 class="sec-title">Dentist Sign Up</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-start">
          <div class="form-container pending" v-if="status == 'pending'">
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
                  <div class="invalid-feedback" v-if="!$v.firstName.required">
                    This field is Required
                  </div>
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
                  <div class="invalid-feedback" v-if="!$v.lastName.required">
                    This field is Required
                  </div>
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
                  <div class="invalid-feedback" v-if="!$v.email.required">
                    This field is Required
                  </div>
                  <div class="invalid-feedback" v-if="!$v.email.email">
                    This field must be a valid email
                  </div>
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
                  <div class="invalid-feedback" v-if="!$v.phoneNumber.required">
                    This field is Required
                  </div>
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
                  <div class="invalid-feedback" v-if="!$v.password.required">
                    This field is Required
                  </div>
                  <div class="invalid-feedback" v-if="!$v.password.valid">
                    Password must contain one lowercase, and one uppercase
                    character, and one number
                  </div>
                  <div class="invalid-feedback" v-if="!$v.password.minLength">
                    Password must be at least 6 characters
                  </div>
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
                  <div
                    class="invalid-feedback"
                    v-if="!$v.confirmPassword.sameAs"
                  >
                    Password and confirmation must match
                  </div>
                  <div
                    class="invalid-feedback"
                    v-if="!$v.confirmPassword.required"
                  >
                    This field is Required
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="degree">Degree</label>
                  <v-select
                    id="degree"
                    v-model.trim="degree"
                    :options="['1', '2', '3']"
                    :class="{ 'is-invalid': $v.degree.$error }"
                    placeholder="Degree"
                  ></v-select>
                  <div class="invalid-feedback" v-if="!$v.degree.required">
                    This field is Required
                  </div>
                </div>
                <div class="form-group col">
                  <label for="speciality">Speciality</label>
                  <v-select
                    id="speciality"
                    v-model.trim="speciality"
                    :options="['1', '2', '3']"
                    :class="{ 'is-invalid': $v.speciality.$error }"
                    placeholder="Speciality"
                  ></v-select>
                  <div class="invalid-feedback" v-if="!$v.speciality.required">
                    This field is Required
                  </div>
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
          <div class="success form-container" v-if="status == 'success'">
            <div class="row">
              <div
                class="col-12 mt-5 mb-5 d-flex justify-content-center align-items-center flex-column"
              >
                <div class="check-box">
                  <get-svg :svgid="99" width="20" height="20" />
                </div>
                <h3 class="success-title">Congratulation!</h3>
                <p class="success-subtitle">
                  Your Account has been created successfully. Please verify by
                  uploading your University ID or syndicate ID to gain full
                  access
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="cta-container">
                  <p>
                    Have a Problem?
                    <nuxt-link to="/">Contact us now </nuxt-link>
                    to help you
                  </p>
                  <div class="cta-buttons">
                    <button class="btn skip-btn">Skip</button>
                    <button type="submit" class="btn btn-primary submit-btn">
                      Go to Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      confirmPassword: null,
      degree: null,
      speciality: null,
      status: "pending"
    };
  },
  methods: {
    submitRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.status = "success";
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
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.doctor-register {
  .sec-title {
    text-align: center;
    color: h.$primary;
    margin-bottom: 35px;
  }
  .form-container::v-deep {
    transition: all 0.5s;
    max-width: 830px;
    padding: 30px 40px;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 100%;
    input:not([type="search"]),
    .vs__dropdown-toggle {
      background-color: #f8f9fd;
      box-shadow: none;
      min-height: 40px;
      font-size: 0.9rem;
      &:not(.is-invalid) {
        border: 1px solid #e3eef8;
      }
    }
    .vs__dropdown-toggle {
      input {
        color: #495057;
      }
    }
    .v-select.is-invalid {
      .vs__dropdown-toggle {
        border: 1px solid #dc3545;
      }
    }
    label {
      color: #505050;
      font-weight: bold;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    .form-row {
      .col {
        &:first-of-type {
          @include h.appDirAuto($padding-end: 25px);
        }
        &:last-of-type {
          @include h.appDirAuto($padding-start: 25px);
        }
      }
    }
    .form-group {
      margin-bottom: 20px;
    }
    .cta-container {
      display: flex;
      width: 100%;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      background-color: #f0f5fa;
      border-radius: 5px;
      border: 1px solid #e3eef8;
      button {
        font-size: 0.8rem;
        padding: 0;
        width: 115px;
        height: 35px;
      }
      p {
        font-size: 0.9rem;
        a {
          color: h.$primary;
        }
      }
    }
    &.success {
      .success-title {
        color: #438850;
        margin-bottom: 20px;
      }
      .success-subtitle {
        text-align: center;
      }
      .check-box {
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
}
</style>
