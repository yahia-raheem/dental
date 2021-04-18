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
      <client-only>
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
      </client-only>
    </div>
    <div class="filter-section">
      <client-only>
        <vsa-list :force-active="true">
          <vsa-item>
            <vsa-heading>
              <div class="title">
                <div class="icon">
                  <get-svg :svgid="79" />
                </div>
                <h6 class="text">Locations</h6>
              </div>
            </vsa-heading>
            <vsa-content>
              <div
                class="form-check"
                v-for="(item, key) in locations"
                :key="key"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item"
                  @change="locationFilter"
                  :checked="
                    locationSelected.includes(item.trim().toLowerCase())
                  "
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {{ item }}
                </label>
              </div>
            </vsa-content>
          </vsa-item>
        </vsa-list>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      specialities: [
        "Periodontics",
        "Orthodontics",
        "Prosthodontics",
        "Oral and Maxillofacial",
        "Endodontics"
      ],
      specSelected: [],
      locations: ["Maadi", "Nasr City", "Heliopolis"],
      locationSelected: [],
    };
  },
  methods: {
    filterPrep() {
      if (typeof this.$route.query.specialities != "undefined") {
        const specArr = this.$route.query.specialities.split(",");
        specArr.forEach(el => {
          if (!this.specSelected.includes(el)) {
            this.specSelected.push(el);
          } else {
            this.specSelected = this.specSelected.filter(item => item !== el);
          }
        });
      }
      if (typeof this.$route.query.locations != "undefined") {
        const specArr = this.$route.query.locations.split(",");
        specArr.forEach(el => {
          if (!this.locationSelected.includes(el)) {
            this.locationSelected.push(el);
          } else {
            this.locationSelected = this.locationSelected.filter(
              item => item !== el
            );
          }
        });
      }
    },
    nameSearch(event) {
      if (event.target.value != "") {
        this.$router.push({
          query: { ...this.$route.query, name: event.target.value }
        });
      } else {
        this.$router.replace({
          ...this.$router.currentRoute,
          query: {
            ...this.$route.query,
            name: undefined
          }
        });
      }
    },
    specFilter(event) {
      const value = event.target.value.trim().toLowerCase();
      var oldSpec =
        typeof this.$route.query.specialities != "undefined"
          ? this.$route.query.specialities
          : "";
      const oldSpecArr = oldSpec.split(",");
      if (oldSpecArr.includes(value)) {
        const specIndex = oldSpecArr.indexOf(value);
        oldSpecArr.splice(specIndex, 1);
        this.$router.push({
          query: {
            ...this.$route.query,
            specialities:
              oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
          }
        });
      } else {
        oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
        this.$router.push({
          query: {
            ...this.$route.query,
            specialities: oldSpec + value
          }
        });
      }
    },
    locationFilter(event) {
      const value = event.target.value.trim().toLowerCase();
      var oldSpec =
        typeof this.$route.query.locations != "undefined"
          ? this.$route.query.locations
          : "";
      const oldSpecArr = oldSpec.split(",");
      if (oldSpecArr.includes(value)) {
        const specIndex = oldSpecArr.indexOf(value);
        oldSpecArr.splice(specIndex, 1);
        this.$router.push({
          query: {
            ...this.$route.query,
            locations: oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
          }
        });
      } else {
        oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
        this.$router.push({
          query: {
            ...this.$route.query,
            locations: oldSpec + value
          }
        });
      }
    }
  },
  mounted() {
    this.filterPrep();
  },
};
</script>
<style lang="scss"></style>
