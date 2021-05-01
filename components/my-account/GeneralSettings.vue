<template>
  <div class="form-container mb-5">
    <div class="header">
      <h5>General Settings</h5>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group col-12">
          <label for="Name">Name</label>
          <input
            type="text"
            class="form-control"
            id="Name"
            v-model.trim="name"
            :class="{ 'is-invalid': $v.name.$error }"
            placeholder="Name"
          />
          <div class="invalid-feedback" v-if="!$v.name.required">
            This field is required
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
            This field is required
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
import { email, required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: this.$auth.user.name,
      email: this.$auth.user.email,
      phoneNumber: this.$auth.user.phone_number
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("user/updateUser", {
            name: this.name,
            phone_number: this.phoneNumber,
            email: this.email
          })
          .then(result => {
            this.$vToastify.success({
              body: "Profile Updated Successfully",
              title: "Success"
            });
            this.$auth.fetchUser().then(res => {
              this.$router.go();
            });
          })
          .catch(err => {
            if (err.response.status < 500) {
              for (const key in err.response.data.errors) {
                if (Object.hasOwnProperty.call(err.response.data.errors, key)) {
                  const element = err.response.data.errors[key];
                  this.$vToastify.error({
                    body: element[0],
                    title: "Error"
                  });
                }
              }
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
    email: {
      email,
      required
    },
    name: {
      required
    }
  }
};
</script>
<style lang=""></style>
