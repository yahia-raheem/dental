<template>
  <div class="form-container pending">
    <div class="profile-type d-flex justify-content-center align-items-center">
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
          <button type="submit" class="btn btn-primary submit-btn">
            <span class="text">
              Next
            </span>
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

.form-container::v-deep {
  transition: all 0.5s;
  max-width: 830px;
  padding: 30px 40px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 100%;
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
    justify-content: flex-end;
    align-items: center;
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
}
</style>
