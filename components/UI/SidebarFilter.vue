<template>
  <div class="filter-container">
    <div class="filter-section">
      <div class="title">
        <div class="icon">
          <get-svg :svgid="102" />
        </div>
        <h6 class="text">
          Search by Name
        </h6>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Keywords"
        :value="$route.query.name"
        @change="nameSearch"
      />
    </div>
    <div class="filter-section">
      <!-- <client-only>
        <vsa-list :force-active="true">
          <vsa-item>
            <vsa-heading>
              <div class="title">
                <div class="icon">
                  <get-svg :svgid="98" />
                </div>
                <h6 class="text">Specialities</h6>
              </div>
            </vsa-heading>
            <vsa-content>
              <div
                class="form-check"
                v-for="(item, key) in specialities"
                :key="key"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item"
                  @change="specFilter"
                  :checked="specSelected.includes(item.trim().toLowerCase())"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {{ item }}
                </label>
              </div>
            </vsa-content>
          </vsa-item>
        </vsa-list>
      </client-only> -->
      <div class="header">
        <div class="title">
          <div class="icon">
            <get-svg :svgid="98" />
          </div>
          <h6 class="text">Specialities</h6>
        </div>
      </div>
      <v-select
        v-model="specs"
        id="speciality"
        :options="labSpec"
        :reduce="option => option.id"
        label="name"
        placeholder="Filter Specialities"
        @input="specFilter"
        multiple
      ></v-select>
    </div>
    <div class="filter-section">
      <div class="header">
        <div class="title">
          <div class="icon">
            <get-svg :svgid="79" />
          </div>
          <h6 class="text">Locations</h6>
        </div>
      </div>
      <v-select
        v-model="locations"
        id="Locations"
        :options="labLoc"
        :reduce="option => option.id"
        label="name"
        placeholder="Filter Lab Locations"
        @input="locationFilter"
        multiple
      ></v-select>
    </div>
    <div class="filter-section">
      <div class="header">
        <div class="title">
          <div class="icon">
            <get-svg :svgid="79" />
          </div>
          <h6 class="text">Areas of Service</h6>
        </div>
      </div>
      <v-select
        v-model="aos"
        id="Locations"
        :options="labAos"
        :reduce="option => option.id"
        label="name"
        placeholder="Filter Areas of Service"
        @input="aosFilter"
        multiple
      ></v-select>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      specs: [],
      locations: [],
      aos: []
    };
  },
  computed: {
    ...mapGetters({
      labSpec: "parameters/labSpec",
      labLoc: "parameters/labLoc",
      labAos: "parameters/labAos"
    })
  },
  methods: {
    filterPrep() {
      const specQuery = this.$route.query.specialities;
      const locQuery = this.$route.query.locations;
      const aosQuery = this.$route.query.aos;
      if (typeof specQuery != "undefined") {
        const specArr = specQuery.split(",");
        specArr.forEach(element => {
          var elementInt = parseInt(element);
          if (!this.specs.includes(elementInt)) {
            this.specs.push(elementInt);
          }
        });
      }
      if (typeof locQuery != "undefined") {
        const locArr = locQuery.split(",");
        locArr.forEach(element => {
          var elementInt = parseInt(element);
          if (!this.locations.includes(elementInt)) {
            this.locations.push(elementInt);
          }
        });
      }
      if (typeof aosQuery != "undefined") {
        const aosArr = aosQuery.split(",");
        aosArr.forEach(element => {
          var elementInt = parseInt(element);
          if (!this.aos.includes(elementInt)) {
            this.aos.push(elementInt);
          }
        });
      }
    },
    nameSearch(event) {
      this.$emit("nameFilter", event.target.value);
    },
    specFilter(value) {
      this.$emit("specFilter", value);
    },
    locationFilter(value) {
      this.$emit("locFilter", value);
    },
    aosFilter(value) {
      this.$emit("aosFilter", value);
    }
  },
  mounted() {
    this.filterPrep();
  },
  watch: {
    "$route.query"() {
      this.filterPrep();
    }
  }
};
</script>
<style lang="scss"></style>
