<template>
  <div class="edit-box">
    <div class="header">
      <h6 class="title">Profile Details</h6>
    </div>
    <div class="form-container">
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group col-12">
            <label for="spec" class="form-label">Specialitites</label>
            <v-select
              id="spec"
              v-model.trim="profSpecs"
              :options="specOptions"
              placeholder="Specialities"
              :multiple="true"
            ></v-select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="loc" class="form-label">Locations</label>
            <v-select
              id="loc"
              v-model.trim="profLocations"
              :options="locOptions"
              placeholder="Locations"
              :multiple="true"
            ></v-select>
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
              v-model.trim="profAOS"
              :options="locOptions"
              placeholder="Areas of Service"
              :multiple="true"
            ></v-select>
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
export default {
  props: {
    specs: {
      type: Array,
      default() {
        return [];
      },
    },
    locations: {
      type: Array,
      default() {
        return [];
      },
    },
    aos: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      profSpecs: [],
      specOptions: [
        "Periodontics",
        "Orthodontics",
        "Prosthodontics",
        "Oral and Maxillofacial",
        "Endodontics",
      ],
      profLocations: [],
      locOptions: ["Maadi", "Nasr City", "Heliopolis"],
      profAOS: [],
    };
  },
  mounted() {
    this.profSpecs = this.specs;
    this.profLocations = this.locations;
    this.profAOS = this.aos
  },
};
</script>

<style>
</style>