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
          <div class="header">
            <h6 class="title">Search Results</h6>
            <button
              class="mobile-filter-btn btn btn-primary d-md-block d-lg-none"
              @click="openMobileSheet"
            >
              Filter
            </button>
            <div class="sort d-none d-lg-flex">
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
              <lab-block :lab="lab" v-on:filterSpec="specModify" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <vue-bottom-sheet
        ref="mobileFilter"
        max-width="100vw"
        max-height="90vh"
        :rounded="true"
      >
        <div class="filter-section">
          <div class="title">
            <div class="icon">
              <get-svg :svgid="102" />
            </div>
            <h6 class="text">
              Sort By
            </h6>
          </div>
          <v-select
            :value="sortSelected.value != null ? sortSelected : null"
            :options="sortOptions"
            placeholder="Select a Sorting Method"
            @input="sortLabs"
          >
          </v-select>
        </div>
        <sidebar-filter :key="comKey + 1" />
        <button class="btn btn-primary sheet-apply" @click="closeSheet">
          Apply
        </button>
      </vue-bottom-sheet>
    </client-only>
  </section>
</template>
<script>
import LabBlock from "~/components/labs/LabBlock.vue";
import SidebarFilter from "~/components/UI/SidebarFilter.vue";
import { sortArray } from "~/plugins/js/components/helper-funcs";

export default {
  async asyncData(context) {
    var res = await context.store.dispatch("labs/getLabs");
    return {
      labs: res.data
    };
  },
  data() {
    return {
      comKey: 0,
      pending: false,
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
  components: {
    SidebarFilter,
    LabBlock
  },
  methods: {
    openMobileSheet() {
      this.$refs.mobileFilter.open();
    },
    closeSheet() {
      this.$refs.mobileFilter.close();
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
    // specFilter(ids) {
    //   this.$store.dispatch("labs/getLabs", { specialties: ids }).then(res => {
    //     this.labs = res.data;
    //   });
    // },
    // locFilter(ids) {
    //   this.$store.dispatch("labs/getLabs", { locations: ids }).then(res => {
    //     this.labs = res.data;
    //   });
    // },
    async specModify(value) {
      const v = this.$route.query.specialities;
      var oldSpec = typeof v != "undefined" ? v : "";
      const oldSpecArr = oldSpec.split(",");
      if (oldSpecArr.includes(`${value}`)) {
        const specIndex = oldSpecArr.indexOf(`${value}`);
        oldSpecArr.splice(specIndex, 1);
        await this.$router.push({
          query: {
            ...this.$route.query,
            specialities:
              oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
          }
        });
      } else {
        oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
        await this.$router.push({
          query: {
            ...this.$route.query,
            specialities: oldSpec + value
          }
        });
      }
    },
    async locModify(value) {
      var oldSpec =
        typeof this.$route.query.locations != "undefined"
          ? this.$route.query.locations
          : "";
      const oldSpecArr = oldSpec.split(",");
      if (oldSpecArr.includes(`${value}`)) {
        const specIndex = oldSpecArr.indexOf(`${value}`);
        oldSpecArr.splice(specIndex, 1);
        await this.$router.push({
          query: {
            ...this.$route.query,
            locations: oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
          }
        });
      } else {
        oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
        await this.$router.push({
          query: {
            ...this.$route.query,
            locations: oldSpec + value
          }
        });
      }
    },
    async nameModify(value) {
      if (value != "") {
        await this.$router.push({
          query: { ...this.$route.query, name: value }
        });
      } else {
        await this.$router.replace({
          ...this.$router.currentRoute,
          query: {
            ...this.$route.query,
            name: undefined
          }
        });
      }
    },
    async filter() {
      // await this.nameModify();
      // await this.specModify();
      // await this.locModify();
      var params = {
        specialties:
          typeof this.$route.query.specialities != "undefined"
            ? this.$route.query.specialities.split(",")
            : this.$route.query.specialities,
        locations:
          typeof this.$route.query.locations != "undefined"
            ? this.$route.query.locations.split(",")
            : this.$route.query.locations,
        name:
          typeof this.$route.query.name != "undefined"
            ? this.$route.query.name.split(",")
            : this.$route.query.name
      };
      this.$store.dispatch("labs/getLabs", params).then(res => {
        this.labs = res.data;
      });
    }
  },
  watch: {
    async "$route.query"() {
      if (this.pending == false) {
        this.pending = true;
        await this.filter();
        this.pending = false;
      }
    }
    // $route(to, from) {
    //   if (to.name == this.$route.name && Object.keys(to.query).length != 0) {
    //     this.forceRefresh();
    //   }
    // }
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
    .sheet-apply {
      width: 100%;
      margin: 10px 0;
    }
  }
  .filter-section {
    border-bottom: 1px solid #dddedf;
    padding-bottom: 15px;
    padding-top: 15px;
    @include h.media(">992px") {
      &:first-of-type {
        padding-top: 0;
      }
    }
    width: 100%;
    @include h.appDirAuto($padding-end: 15px);
    input[type="text"] {
      height: 35px;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    .v-select {
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
      .icon {
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
  justify-content: flex-start;
  margin-bottom: 10px;
  align-items: flex-start;
  flex-direction: column;
  @include h.media(">992px") {
    justify-content: space-between;
    flex-direction: row;
  }
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
