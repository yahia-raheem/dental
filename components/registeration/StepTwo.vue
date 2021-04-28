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
        <label class="form-check-label mb-0">
          Dentist
        </label>
      </button>
      <button
        class="lab btn d-flex justify-content-center align-items-center"
        :class="{ active: type == 'lab' }"
        @click="activate('lab')"
      >
        <input type="radio" name="type" ref="labCheck" />
        <label class="form-check-label mb-0">
          Laboratory
        </label>
      </button>
    </div>
    <form @submit.prevent="submitDentist" v-if="type == 'dentist'">
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
        <div class="invalid-feedback" v-if="!$v.dentist.speciality.required">
          This field is Required
        </div>
      </div>
      <div class="form-row">
        <div class="cta-container">
          <button
            type="submit"
            class="btn btn-primary submit-btn d-flex justify-content-center align-items-center"
          >
            <span class="text">
              Next
            </span>
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
          :options="['1', '2', '3']"
          :class="{ 'is-invalid': $v.lab.spec.$error }"
          placeholder="Degree"
        ></v-select>
        <div class="invalid-feedback" v-if="!$v.lab.spec.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <v-select
          id="location"
          v-model.trim="lab.location"
          :options="['1', '2', '3']"
          :class="{ 'is-invalid': $v.lab.location.$error }"
          placeholder="Location"
        ></v-select>
        <div class="invalid-feedback" v-if="!$v.lab.location.required">
          This field is Required
        </div>
      </div>
      <div class="form-group">
        <label for="location">Area of Service</label>
        <v-select
          id="location"
          v-model.trim="lab.aos"
          :options="['1', '2', '3']"
          :class="{ 'is-invalid': $v.lab.aos.$error }"
          placeholder="Area of Service"
        ></v-select>
        <div class="invalid-feedback" v-if="!$v.lab.aos.required">
          This field is Required
        </div>
      </div>
      <div class="form-row">
        <div class="cta-container">
          <button type="submit" class="btn btn-primary submit-btn">
            <span class="text">
              Next
            </span>
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
      docSpecs: "parameters/docSpec"
    })
  },
  methods: {
    async submitDentist() {
      this.$v.dentist.$touch();
      if (!this.$v.dentist.$invalid) {
        try {
          const formBody = {
            profile_name: this.dentist.name,
            degree: this.dentist.degree,
            specialities: this.dentist.speciality
          };
          await this.$axios.$post(
            `${process.env.apiUrl}/api/doctor/add`,
            JSON.stringify(formBody)
          );
          this.$emit("done");
        } catch (err) {
          if (400 < err.response.status < 500) {
            console.log(err.response.data.errors);
            for (const key in err.response.data.errors) {
              if (Object.hasOwnProperty.call(err.response.data.errors, key)) {
                const element = err.response.data.errors[key];
                this.$vToastify.error({ body: element[0], title: key });
              }
            }
          } else {
            this.$vToastify.error({ body: "Sorry an unknown error occured" });
          }
        }
      }
    },
    submitLab() {
      this.$v.lab.$touch();
      if (!this.$v.lab.$invalid) {
        this.$emit("done");
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
