<template>
  <div class="row mt-4">
    <div class="col-12">
      <div class="filter-buttons">
        <button :class="{ lab: true, active: labActive }" @click="activateTab">
          <span class="icon">
            <get-svg :svgid="labsvgId" />
          </span>
          <span class="title">Laboratory</span>
        </button>
        <button
          :class="{ dentist: true, active: dentistActive }"
          @click="activateTab"
        >
          <span class="icon">
            <get-svg :svgid="docsvgId" />
          </span>
          <span class="title">Dentist</span>
        </button>
      </div>
    </div>
    <div class="col-12">
      <div class="filter-form-container">
        <div class="vail-white"></div>
        <form @submit.prevent="submitFilter">
          <div class="form-row">
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.servicedd.$error }"
            >
              <v-select
                id="servicedd"
                v-model.trim="servicedd"
                :options="['1', '2', '3']"
                placeholder="Service"
              >
              </v-select>
            </div>
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.locationdd.$error }"
            >
              <v-select
                id="locationdd"
                v-model.trim="locationdd"
                :options="['1', '2', '3']"
                placeholder="Location"
              >
              </v-select>
            </div>
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.aosdd.$error }"
            >
              <v-select
                id="aosdd"
                v-model.trim="aosdd"
                :options="['1', '2', '3']"
                placeholder="Area Of Service"
              >
              </v-select>
            </div>
            <div
              v-if="labActive"
              class="form-group"
              :class="{ 'form-group--error': $v.lab.$error }"
            >
              <input
                type="text"
                class="form-control"
                id="labname"
                placeholder="Lab Name"
                v-model.trim="lab"
                @input="setLab($event.target.value)"
              />
            </div>
            <div
              v-if="dentistActive"
              class="form-group"
              :class="{ 'form-group--error': $v.doctor.$error }"
            >
              <input
                type="text"
                class="form-control"
                id="doctorname"
                placeholder="Doctor Name"
                v-model.trim="doctor"
                @input="setDoctor($event.target.value)"
              />
            </div>
            <button type="submit" class="btn btn-primary submit-btn">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      // labsvgId: null,
      // docsvgId: null,
      dentistActive: true,
      labActive: false,
      servicedd: null,
      locationdd: null,
      aosdd: null,
      lab: "",
      doctor: ""
    };
  },
  validations: {
    servicedd: {
      required
    },
    locationdd: {
      required
    },
    aosdd: {
      required
    },
    lab: {
      minLength: minLength(4)
    },
    doctor: {
      minLength: minLength(4)
    }
  },
  computed: {
    ...mapGetters({
      pageById: 'pages/pageById'
    }),
    labsvgId() {
      return this.pageById(process.env.homepageId).meta_box.lab_svg.ID
    },
    docsvgId() {
      return this.pageById(process.env.homepageId).meta_box.doctor_svg.ID
    }
    // const data = await this.getPage(process.env.homepageId);
    // this.labsvgId = data.meta_box.lab_svg.ID;
    // this.docsvgId = data.meta_box.doctor_svg.ID;
  },
  methods: {
    activateTab(e) {
      if (e.target.classList.contains("dentist")) {
        this.dentistActive = true;
        this.labActive = false;
      }
      if (e.target.classList.contains("lab")) {
        this.dentistActive = false;
        this.labActive = true;
      }
    },
    setDoctor(v) {
      this.doctor = v;
      this.$v.doctor.$touch();
    },
    setLoctor(v) {
      this.lab = v;
      this.$v.lab.$touch();
    },
    submitFilter() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        console.log("success");
        console.log(this.servicedd)
      }
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);

.filter-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  @include h.appDirAuto($border-top-end-radius: 15px);
  overflow: hidden;
  button {
    width: 50%;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 55px;
    opacity: 0.9;
    transition: all 0.5s;
    .icon svg {
      max-width: 30px;
      max-height: 30px;
      width: auto;
      height: auto;
      @include h.appDirAuto($margin-end: 15px);
      path {
        fill: h.$body-color;
      }
    }
    &.active {
      background-color: h.$primary;
      opacity: 1;
      color: white;
      svg path {
        fill: white;
      }
    }
  }
}
.filter-form-container {
  padding: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  position: relative;
  .vail-white {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ecebea;
    opacity: 0.9;
    z-index: -1;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .form-group {
    width: 20%;
    min-width: 100px;
    @include h.appDirAuto($margin-end: 15px);
    margin-bottom: 0;
    position: relative;
    z-index: 1;
    .form-control {
      min-height: 50px;
    }
    .vs__dropdown-toggle {
      min-height: 50px;
      background-color: white;
      padding: 0;
      input {
        color: h.$body-color;
      }
    }
  }
  .submit-btn {
    background-color: h.$primary;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: none;
  }
}
</style>
