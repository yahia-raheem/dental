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
        <label for="degree">Degree</label>
        <v-select
          id="degree"
          v-model.trim="dentist.degree"
          :options="['1', '2', '3']"
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
          :options="['1', '2', '3']"
          :class="{ 'is-invalid': $v.dentist.speciality.$error }"
          placeholder="Speciality"
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
      <div class="form-group col">
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

export default {
  data() {
    return {
      dentist: {
        degree: null,
        speciality: null
      },
      lab: {
        name: null
      },
      type: "dentist"
    };
  },
  mounted() {
    this.$refs.dentistCheck.checked = true;
  },
  methods: {
    submitDentist() {
      this.$v.dentist.$touch();
      console.log(this.$v);
      if (!this.$v.dentist.$invalid) {
        this.$emit("done");
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
      }
    },
    lab: {
      name: {
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
