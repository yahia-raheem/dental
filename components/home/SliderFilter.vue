<template>
  <div class="row mt-2 mt-lg-4">
    <div class="col-12 d-none d-lg-block">
      <div class="filter-buttons">
        <button :class="{ lab: true, active: labActive }" @click="activateTab">
          <span class="icon">
            <get-svg-2 svg="lab" />
          </span>
          <span class="title">Laboratory</span>
        </button>
        <button
          :class="{ dentist: true, active: dentistActive }"
          @click="activateTab"
        >
          <span class="icon">
            <get-svg-2 svg="dentist" />
          </span>
          <span class="title">Dentist</span>
        </button>
      </div>
    </div>
    <div class="col-12 d-none d-lg-block">
      <div class="filter-form-container">
        <div class="vail-white"></div>
        <form @submit.prevent="submitFilter">
          <div class="form-row flex-nowrap">
            <div class="form-group">
              <v-select
                id="servicedd"
                v-model.trim="servicedd"
                :options="labActive ? labSpec : docSpec"
                :reduce="option => option.id"
                label="name"
                placeholder="Service"
              >
              </v-select>
            </div>
            <div class="form-group">
              <v-select
                id="locationdd"
                v-model.trim="locationdd"
                :options="labActive ? labLoc : docLoc"
                :reduce="option => option.id"
                label="name"
                placeholder="Location"
              >
              </v-select>
            </div>
            <div class="form-group" v-if="labActive">
              <v-select
                id="aosdd"
                v-model.trim="aosdd"
                :options="labAos"
                :reduce="option => option.id"
                label="name"
                placeholder="Area Of Service"
              >
              </v-select>
            </div>
            <div v-if="labActive" class="form-group">
              <input
                type="text"
                class="form-control"
                id="labname"
                placeholder="Lab Name"
                v-model.trim="lab"
                @input="setLab($event.target.value)"
              />
            </div>
            <div v-if="dentistActive" class="form-group">
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
              <div class="icon">
                <get-svg-2 svg="search" width="20" height="20" />
              </div>
              <div class="text">Submit</div>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      class="
        col-12
        d-flex
        flex-column
        d-lg-none
        justify-content-center
        align-items-center
      "
    >
      <nuxt-link
        to="/doctors"
        class="btn home-mobile-cta dentist-cta mb-3 text-white"
      >
        <span class="icon">
          <get-svg-2 svg="dentist" width="15" height="15" />
        </span>
        Search for a Dentist
      </nuxt-link>
      <nuxt-link to="/labs" class="btn btn-primary home-mobile-cta">
        <span class="icon">
          <get-svg-2 svg="lab" width="15" height="15" />
        </span>
        Search for a Dental Lab
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dentistActive: false,
      labActive: true,
      servicedd: null,
      locationdd: null,
      aosdd: null,
      lab: "",
      doctor: ""
    };
  },
  computed: {
    ...mapGetters({
      pageById: "pages/pageById",
      labSpec: "parameters/labSpec",
      labLoc: "parameters/labLoc",
      labAos: "parameters/labAos",
      docSpec: "parameters/docSpec",
      docLoc: "parameters/docLoc"
    })
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
    },
    setLab(v) {
      this.lab = v;
    },
    submitFilter() {
      var url;
      if (this.labActive) {
        url = { name: "labs", query: {} };
        if (this.locationdd) {
          url["query"]["locations"] = `${this.locationdd}`;
        }
        if (this.servicedd) {
          url["query"]["specialities"] = `${this.servicedd}`;
        }
        if (this.aosdd) {
          url["query"]["aos"] = `${this.aosdd}`;
        }
        if (this.lab != "") {
          url["query"]["name"] = `${this.lab}`;
        }
        this.$router.push(url);
      } else if (this.dentistActive) {
        url = { name: "doctors", query: {} };
        if (this.locationdd) {
          url["query"]["locations"] = `${this.locationdd}`;
        }
        if (this.servicedd) {
          url["query"]["specialities"] = `${this.servicedd}`;
        }
        if (this.doctor != "") {
          url["query"]["name"] = `${this.doctor}`;
        }
        this.$router.push(url);
      }
    }
  }
};
</script>
<style lang="scss">
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.home-mobile-cta {
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    @include h.appDirAuto($margin-end: 10px);
    svg path {
      fill: white;
    }
  }
}
.filter-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  button {
    width: 100%;
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
    width: 15%;
    .icon {
      @include h.appDirAuto($margin-end: 15px);
      svg {
        path {
          fill: white;
        }
      }
    }
  }
}
</style>
