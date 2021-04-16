<template>
  <section class="labs-page page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 d-none d-lg-block">
          <div class="archive-sidebar">
            <sidebar-filter :key="comKey" />
          </div>
        </div>
        <div class="col-lg-9 col-md-12">
          <button
            class="mobile-filter-btn btn btn-primary d-md-block d-lg-none"
            @click="openMobileSheet"
          >
            Filter
          </button>
          <div class="header">
            <h6 class="title">Search Results</h6>
            <div class="sort">
              <span class="label">Sort By</span>
              <v-select
                :value="sortSelected.value != null ? sortSelected : null"
                :options="sortOptions"
                placeholder="Select a Sorting Method"
                @input="sortLabs"
              >
              </v-select>
            </div>
          </div>
          <div class="row">
            <div class="col-12" v-for="(lab, index) in labs" :key="index">
              <lab-block :lab="lab" v-on:spec-changed="forceRefresh" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <vue-bottom-sheet
        ref="mobileFilter"
        max-width="100vw"
        max-height="100vh"
        :rounded="false"
      >
        <sidebar-filter :key="comKey + 1" />
      </vue-bottom-sheet>
    </client-only>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import LabBlock from "~/components/labs/LabBlock.vue";
import SidebarFilter from "~/components/UI/SidebarFilter.vue";
import { sortArray } from "~/plugins/js/components/helper-funcs";

export default {
  created() {
    this.labs = this.labsGetter;
  },
  data() {
    return {
      labs: [],
      comKey: 0,
      sortOptions: [
        { label: "Most Popular", value: "rating" },
        { label: "Name", value: "title" }
      ],
      sortSelected: {
        label: null,
        value: null
      }
    };
  },
  computed: {
    ...mapGetters({
      labsGetter: "labs/labs"
    })
  },
  components: {
    SidebarFilter,
    LabBlock
  },
  methods: {
    openMobileSheet() {
      this.$refs.mobileFilter.open();
    },
    forceRefresh() {
      this.comKey += 1;
    },
    nameSearch() {
      const field = this.$route.query.name;
      if (typeof field != "undefined") {
        this.labs = this.labsGetter.filter(lab =>
          lab.title.toLowerCase().includes(field.toLowerCase())
        );
      }
    },
    sortLabs(v) {
      if (v != null) {
        this.labs = sortArray(this.labs, v.value, "desc");
        this.$router.push({ query: { ...this.$route.query, sort: v.value } });
        this.sortSelected = this.sortOptions.find(
          option => option.value == v.value
        );
      } else {
        this.$router.replace({
          ...this.$router.currentRoute,
          query: {
            ...this.$route.query,
            sort: undefined
          }
        });
        this.sortSelected = {
          label: null,
          value: null
        };
      }
    },
    specFilter() {
      const v = this.$route.query.specialities;
      if (typeof v != "undefined") {
        const speccArr = v.split(",");
        this.labs = this.labs.filter(lab => {
          for (let index = 0; index < speccArr.length; index++) {
            const spec = speccArr[index];
            const specList = lab.specialities.map(one => {
              return one.trim().toLowerCase();
            });
            if (specList.includes(spec)) {
              return true;
            }
          }
        });
      }
    },
    locFilter() {
      const v = this.$route.query.locations;
      if (typeof v != "undefined") {
        const speccArr = v.split(",");
        this.labs = this.labs.filter(lab => {
          for (let index = 0; index < speccArr.length; index++) {
            const spec = speccArr[index];
            const specList = lab.location.map(one => {
              return one.trim().toLowerCase();
            });
            if (specList.includes(spec)) {
              return true;
            }
          }
        });
      }
    },
    filter() {
      this.labs = this.labsGetter;
      this.nameSearch();
      this.specFilter();
      this.locFilter();
      if (typeof this.$route.query.sort != "undefined") {
        this.sortLabs({ value: this.$route.query.sort });
        this.sortSelected = this.sortOptions.find(
          option => option.value == this.$route.query.sort
        );
      }
    }
  },
  watch: {
    "$route.query"() {
      this.filter();
    },
    $route(to, from) {
      if (to.name == this.$route.name && Object.keys(to.query).length != 0) {
        this.forceRefresh();
      }
    }
  },
  mounted() {
    this.filter();
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section::v-deep {
  .bottom-sheet__content {
    padding: 10px 20px;
  }
}
.mobile-filter-btn {
  margin-bottom: 15px;
  width: 100%;
}
.archive-sidebar {
  @include h.appDirAuto($border-end: 2px solid #d5d7d8, $padding-end: 30px);
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  .sort {
    width: 250px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .label {
      @include h.appDirAuto($margin-end: 20px);
      white-space: nowrap;
      font-size: 0.9rem;
      font-weight: bold;
    }
    .v-select {
      width: stretch;
      background-color: white;
      input {
        color: h.$body-color;
        font-size: 1rem;
      }
    }
  }
  .title {
    position: relative;
    padding-bottom: 15px;
    &::after {
      content: "";
      bottom: 0;
      @include h.appDirAuto($start: 0);
      width: 35px;
      height: 5px;
      background-color: h.$secondary;
      border-radius: 30px;
      position: absolute;
    }
  }
}
</style>
