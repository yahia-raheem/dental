<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Profile Details</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col-12">
            <label for="spec" class="form-label">Specialities</label>
            <v-select
              id="spec"
              v-model.trim="spec"
              :options="docSpec"
              :class="{ 'is-invalid': $v.spec.$error }"
              :reduce="option => option.id"
              label="name"
              placeholder="Specialities"
              :multiple="true"
            ></v-select>
            <div class="invalid-feedback" v-if="!$v.spec.required">
              This field is Required
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="spec" class="form-label">Locations</label>
            <v-select
              id="spec"
              v-model.trim="location"
              :options="docLoc"
              :class="{ 'is-invalid': $v.location.$error }"
              :reduce="option => option.id"
              label="name"
              placeholder="Locations"
              :multiple="true"
            ></v-select>
            <div class="invalid-feedback" v-if="!$v.location.required">
              This field is Required
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="spec" class="form-label">Availabitiy</label>
            <v-select
              id="spec"
              v-model.trim="availability"
              :options="parameters.availability"
              placeholder="Availability"
              :multiple="true"
            ></v-select>
          </div>
        </div>
        <div class="form-row">
          <div class="cta-container">
            <button
              type="submit"
              class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    doctor: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      spec: this.doctor.specialties,
      degree: this.doctor.degree,
      availability: this.doctor.availability,
      location: this.doctor.locations
    };
  },
  validations: {
    spec: {
      required
    },
    location: {
      required
    }
  },
  computed: {
    ...mapGetters({
      docSpec: "parameters/docSpec",
      docLoc: "parameters/docLoc",
      parameters: "parameters/parameters"
    }),
    form() {
      return new FormData();
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.spec != null) {
          this.spec.forEach(element => {
            this.form.append(
              "specialties[]",
              typeof element == "object" ? element.id : element
            );
          });
        }
        if (this.availability != null) {
          this.availability.forEach(element => {
            this.form.append(
              "availability[]",
              typeof element == "object" ? element.id : element
            );
          });
        }
        if (this.location != null) {
          this.location.forEach(element => {
            this.form.append(
              "locations[]",
              typeof element == "object" ? element.id : element
            );
          });
        }
        const data = { docId: this.doctor.id, data: this.form };
        this.$store
          .dispatch("doctors/updateDoc", data)
          .then(result => {
            this.$vToastify.success({
              body: "Profile Updated Successfully",
              title: "Success"
            });
            // this.$router.go();
          })
          .catch(err => {
            this.$vToastify.error({
              body: "An unknown error occured",
              title: "Sorry"
            });
          });
      }
    }
  }
};
</script>

<style></style>
