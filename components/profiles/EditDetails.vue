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
              :options="labSpec"
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
            <label for="loc" class="form-label">Locations</label>
            <v-select
              id="loc"
              v-model.trim="location"
              :options="labLoc"
              :reduce="option => option.id"
              label="name"
              :class="{ 'is-invalid': $v.location.$error }"
              placeholder="Locations"
              :multiple="true"
            ></v-select>
            <div class="invalid-feedback" v-if="!$v.location.required">
              This field is Required
            </div>
            <small id="locHelp" class="form-text text-muted"
              >Locations where the lab branches exist</small
            >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="aos" class="form-label">Areas of Service</label>
            <v-select
              id="aos"
              v-model.trim="aos"
              :options="labAos"
              :reduce="option => option.id"
              label="name"
              :class="{ 'is-invalid': $v.aos.$error }"
              placeholder="Areas of Service"
              :multiple="true"
            ></v-select>
            <div class="invalid-feedback" v-if="!$v.aos.required">
              This field is Required
            </div>
            <small id="locHelp" class="form-text text-muted"
              >Locations where your lab is able to provide it's services</small
            >
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
    lab: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      spec: this.lab.specialties,
      location: this.lab.locations,
      aos: this.lab.areas
    };
  },
  validations: {
    spec: {
      required
    },
    location: {
      required
    },
    aos: {
      required
    }
  },
  computed: {
    ...mapGetters({
      labSpec: "parameters/labSpec",
      labLoc: "parameters/labLoc",
      labAos: "parameters/labAos"
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
          this.spec.forEach((element, index) => {
            this.form.append(
              `specialties[${index}]`,
              typeof element == "object" ? element.id : element
            );
          });
        }
        if (this.location != null) {
          this.location.forEach((element, index) => {
            this.form.append(
              `locations[${index}]`,
              typeof element == "object" ? element.id : element
            );
          });
        }
        if (this.aos != null) {
          this.aos.forEach((element, index) => {
            this.form.append(
              `areas[${index}]`,
              typeof element == "object" ? element.id : element
            );
          });
        }
        const data = { labId: this.lab.id, data: this.form };
        this.$store
          .dispatch("labs/updateLab", data)
          .then(_ => {
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
