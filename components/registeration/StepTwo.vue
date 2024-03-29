<template>
  <div class="form-container pending">
    <div
      class="profile-type d-flex justify-content-center align-items-center mb-4"
    >
      <button
        class="dentist btn d-flex justify-content-center align-items-center"
        :class="{ active: type == 'dentist' }"
        @click="activate('dentist')"
      >
        <input type="radio" name="type" ref="dentistCheck" />
        <label class="form-check-label mb-0"> Dentist </label>
      </button>
      <button
        class="lab btn d-flex justify-content-center align-items-center"
        :class="{ active: type == 'lab' }"
        @click="activate('lab')"
      >
        <input type="radio" name="type" ref="labCheck" />
        <label class="form-check-label mb-0"> Laboratory </label>
      </button>
    </div>
    <form @submit.prevent="submitDentist" v-if="type == 'dentist'">
      <p class="text-center mb-3">
        Please note that you're only allowed to create only one doctor account
      </p>
      <div class="form-group">
        <label for="firstName">Name</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.dentist.name.$error }"
          id="firstName"
          v-model.trim="dentist.name"
          placeholder="Name"
        />
        <div class="invalid-feedback" v-if="!$v.dentist.name.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="degree">Degree</label>
        <v-select
          id="degree"
          v-model.trim="dentist.degree"
          :options="parameters.degree"
          :class="{ 'is-invalid': $v.dentist.degree.$error }"
          placeholder="Degree"
        ></v-select>
        <div class="invalid-feedback" v-if="!$v.dentist.degree.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="speciality">Speciality</label>
        <v-select
          id="speciality"
          v-model.trim="dentist.speciality"
          :options="docSpecs"
          :reduce="option => option.id"
          label="name"
          :class="{ 'is-invalid': $v.dentist.speciality.$error }"
          placeholder="Speciality"
          multiple
        ></v-select>
        <small id="locHelp" class="form-text text-muted"
          >You can choose more than one speciality</small
        >
        <div class="invalid-feedback" v-if="!$v.dentist.speciality.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="speciality">Location</label>
        <v-select
          id="speciality"
          v-model.trim="dentist.location"
          :options="docLoc"
          :reduce="option => option.id"
          label="name"
          :class="{ 'is-invalid': $v.dentist.location.$error }"
          placeholder="Location"
          multiple
        ></v-select>
        <small id="locHelp" class="form-text text-muted"
          >You can choose more than one location</small
        >
        <div class="invalid-feedback" v-if="!$v.dentist.location.required">
          This field is Required
        </div>
      </div>
      <div class="form-row">
        <div class="cta-container">
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
    <form @submit.prevent="submitLab" v-if="type == 'lab'">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $v.lab.name.$error }"
          id="name"
          v-model.trim="lab.name"
          placeholder="Lab Name"
        />
        <div class="invalid-feedback" v-if="!$v.lab.name.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="labSpec">Speciality</label>
        <v-select
          id="labSpec"
          v-model.trim="lab.spec"
          :options="labSpec"
          :reduce="option => option.id"
          label="name"
          :class="{ 'is-invalid': $v.lab.spec.$error }"
          placeholder="Speciality"
          multiple
        ></v-select>
        <small id="locHelp" class="form-text text-muted"
          >You can choose more than one speciality</small
        >
        <div class="invalid-feedback" v-if="!$v.lab.spec.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <v-select
          id="location"
          v-model.trim="lab.location"
          :options="labLoc"
          :reduce="option => option.id"
          label="name"
          :class="{ 'is-invalid': $v.lab.location.$error }"
          placeholder="Location"
          multiple
        ></v-select>
        <small id="locHelp" class="form-text text-muted"
          >You can choose more than one location</small
        >
        <div class="invalid-feedback" v-if="!$v.lab.location.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="location">Area of Service</label>
        <v-select
          id="location"
          v-model.trim="lab.aos"
          :options="labAos"
          :reduce="option => option.id"
          label="name"
          :class="{ 'is-invalid': $v.lab.aos.$error }"
          placeholder="Area of Service"
          multiple
        ></v-select>
        <small id="locHelp" class="form-text text-muted"
          >You can choose more than one area of service</small
        >
        <div class="invalid-feedback" v-if="!$v.lab.aos.required">
          This field is Required
        </div>
      </div>
      <div class="form-row">
        <div class="cta-container">
          <button type="submit" class="btn btn-primary submit-btn">
            <span class="text"> Next </span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dentist: {
        degree: null,
        speciality: null,
        location: null,
        name: null
      },
      lab: {
        name: null,
        spec: null,
        location: null,
        aos: null
      },
      type: "dentist"
    };
  },
  mounted() {
    this.$refs.dentistCheck.checked = true;
  },
  computed: {
    ...mapGetters({
      parameters: "parameters/parameters",
      docSpecs: "parameters/docSpec",
      docLoc: "parameters/docLoc",
      labSpec: "parameters/labSpec",
      labLoc: "parameters/labLoc",
      labAos: "parameters/labAos"
    })
  },
  methods: {
    async submitDentist() {
      if (this.type == "dentist") {
        this.$v.dentist.$touch();
        if (!this.$v.dentist.$invalid) {
          try {
            const formBody = {
              profile_name: this.dentist.name,
              degree: this.dentist.degree,
              specialties: this.dentist.speciality,
              locations: this.dentist.location
            };
            const res = await this.$axios.$post(
              `${process.env.apiUrl}/api/doctor/add`,
              formBody
            );
            this.$auth.fetchUser().then(() => {
              this.$emit("done", res.profile.id);
            });
          } catch (err) {
            if (400 < err.response.status < 500) {
              for (const key in err.response.data.errors) {
                if (Object.hasOwnProperty.call(err.response.data.errors, key)) {
                  const element = err.response.data.errors[key];
                  this.$vToastify.error({ body: element, title: "Error" });
                }
              }
            } else {
              this.$vToastify.error({ body: "Sorry an unknown error occured" });
            }
          }
        }
      }
    },
    submitLab() {
      if (this.type == "lab") {
        this.$v.lab.$touch();
        if (!this.$v.lab.$invalid) {
          const formBody = {
            profile_name: this.lab.name,
            areas: this.lab.aos,
            locations: this.lab.location,
            specialties: this.lab.spec
          };
          this.$axios
            .$post(`${process.env.apiUrl}/api/lab/add`, formBody)
            .then(res => {
              this.$auth.fetchUser().then(() => {
                this.$emit("done", res.profile.id);
              });
            })
            .catch(err => {
              if (400 < err.response.status < 500) {
                err.response.data.errors.forEach(error => {
                  this.$vToastify.error({ body: error });
                });
              } else {
                this.$vToastify.error({
                  body: "Sorry an unknown error occured"
                });
              }
            });
        }
      }
    },
    activate(type) {
      switch (type) {
        case "dentist":
          this.type = "dentist";
          this.$refs.dentistCheck.checked = true;
          this.$emit("changeType", "dentest");
          break;
        case "lab":
          this.type = "lab";
          this.$refs.labCheck.checked = true;
          this.$emit("changeType", "lab");
          break;
        default:
          break;
      }
    }
  },
  validations: {
    dentist: {
      degree: {
        required
      },
      speciality: {
        required
      },
      name: {
        required
      },
      location: {
        required
      }
    },
    lab: {
      name: {
        required
      },
      spec: {
        required
      },
      location: {
        required
      },
      aos: {
        required
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);

.form-container {
  .profile-type {
    button {
      border: 1px solid #c5c5c5;
      background-color: #fbfbfb;
      width: 130px;
      height: 45px;
      @include h.appDirAuto($margin-end: 20px);
      input {
        @include h.appDirAuto($margin-end: 10px);
        min-height: 0;
      }
      label {
        font-size: 0.9rem;
        font-weight: normal;
      }
      &.active {
        border-color: #77aa7f;
        background-color: #f8fff8;
      }
    }
  }
  form {
    max-width: 400px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
