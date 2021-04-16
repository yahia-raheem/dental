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
      console.log("ran prep");
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
    console.log(this.compKey);
  },
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);

.filter-section {
  border-bottom: 1px solid #dddedf;
  padding-bottom: 15px;
  padding-top: 15px;
  &:first-of-type {
    padding-top: 0;
  }
  width: 100%;
  @include h.appDirAuto($padding-end: 15px);
  input[type="text"] {
    height: 35px;
    font-size: 1rem;
    margin-bottom: 10px;
  }
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    .text {
      color: #6a6fb6;
      margin: 0;
    }
    .icon::v-deep {
      @include h.appDirAuto($margin-end: 10px);
      svg {
        width: 15px;
        height: auto;
        path {
          fill: #6a6fb6;
        }
      }
    }
  }
  &::v-deep {
    .vsa-list {
      --vsa-max-width: 100%;
      --vsa-heading-padding: 0;
      --vsa-text-color: #838383;
      --vsa-highlight-color: none;
      --vsa-bg-color: none;
      --vsa-border: none;
      --vsa-content-padding: 0.5rem;
      --vsa-default-icon-size: 0.3;
      --vsa-min-width: 200px;
      .vsa-item__trigger {
        height: 20px;
        position: relative;
        &::after {
          @include h.appDirAuto($end: 10px);
          @include h.center("v");
          @include h.circle(20px);
          border: 1px solid #6a6eb3;
          content: "";
        }
        .vsa-item__trigger__icon--is-default {
          &::before,
          &::after {
            background-color: #6a6eb3;
          }
        }
        &:hover,
        &:focus,
        &:active {
          color: black;
          .vsa-item__trigger__icon--is-default {
            &::before,
            &::after {
              background-color: #6a6eb3;
            }
          }
        }
      }
      .title {
        margin: 0;
      }
      .form-check {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
