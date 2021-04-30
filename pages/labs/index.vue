<template>
  <section class="labs-page page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 d-none d-lg-block">
          <div class="archive-sidebar">
            <sidebar-filter
              v-on:nameFilter="nameModify"
              v-on:specFilter="specPreModify"
              v-on:locFilter="locPreModify"
              v-on:aosFilter="aosPreModify"
            />
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
          </div>
          <div class="row">
            <div class="col-12" v-for="(lab, index) in labs" :key="index">
              <lab-block :lab="lab" v-on:filterSpec="specModify" />
            </div>
            <div
              class="col-12 d-flex justify-content-center align-items-center"
              v-if="currentPage != lastPage"
            >
              <button class="btn vm-btn" @click="viewMore">
                View More
              </button>
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
        <sidebar-filter
          v-on:nameFilter="nameModify"
          v-on:specFilter="specPreModify"
          v-on:locFilter="locPreModify"
          v-on:aosFilter="aosPreModify"
        />
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

export default {
  async asyncData(context) {
    var params = {
      specialties:
        typeof context.query.specialities != "undefined"
          ? context.query.specialities.split(",")
          : context.query.specialities,
      locations:
        typeof context.query.locations != "undefined"
          ? context.query.locations.split(",")
          : context.query.locations,
      areas:
        typeof context.query.aos != "undefined"
          ? context.query.aos.split(",")
          : context.query.aos,
      name: context.query.name
    };
    var res = await context.store.dispatch("labs/getLabs", params);
    return {
      labs: res.data,
      currentPage: res.current_page,
      lastPage: res.last_page
    };
  },
  data() {
    return {
      pending: false,
      params: {}
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
    async specPreModify(vArr) {
      if (vArr.length > 0) {
        this.pending = true;
        await vArr.forEach(async (element, index) => {
          if (index == vArr.length - 1) {
            this.pending = false;
          }
          await this.specModify(element);
        });
      } else {
        await this.specModify(null);
      }
    },
    async locPreModify(vArr) {
      if (vArr.length > 0) {
        this.pending = true;
        await vArr.forEach(async (element, index) => {
          if (index == vArr.length - 1) {
            this.pending = false;
          }
          await this.locModify(element);
        });
      } else {
        await this.locModify(null);
      }
    },
    async aosPreModify(vArr) {
      if (vArr.length > 0) {
        this.pending = true;
        await vArr.forEach(async (element, index) => {
          if (index == vArr.length - 1) {
            this.pending = false;
          }
          await this.aosModify(element);
        });
      } else {
        await this.aosModify(null);
      }
    },
    async specModify(value) {
      if (value != null) {
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
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            specialities: undefined
          }
        });
      }
    },
    async locModify(value) {
      if (value != null) {
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
              locations:
                oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
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
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            locations: undefined
          }
        });
      }
    },
    async aosModify(value) {
      if (value != null) {
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
              aos: oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined
            }
          });
        } else {
          oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
          await this.$router.push({
            query: {
              ...this.$route.query,
              aos: oldSpec + value
            }
          });
        }
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            aos: undefined
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
        await this.$router.push({
          query: {
            ...this.$route.query,
            name: undefined
          }
        });
      }
    },
    async filter() {
      this.params = {
        specialties:
          typeof this.$route.query.specialities != "undefined"
            ? this.$route.query.specialities.split(",")
            : this.$route.query.specialities,
        locations:
          typeof this.$route.query.locations != "undefined"
            ? this.$route.query.locations.split(",")
            : this.$route.query.locations,
        areas:
          typeof this.$route.query.aos != "undefined"
            ? this.$route.query.aos.split(",")
            : this.$route.query.aos,
        name: this.$route.query.name
      };
      this.$store.dispatch("labs/getLabs", this.params).then(res => {
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.labs = res.data;
      });
    },
    async viewMore() {
      this.currentPage = this.currentPage + 1;
      this.params.page = this.currentPage;
      await this.$store.dispatch("labs/getLabs", this.params).then(res => {
        res.data.forEach(lab => {
          this.labs.push(lab);
        });
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
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
.vm-btn {
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding-left: 30px;
  padding-right: 30px;
}
section::v-deep {
  .bottom-sheet__content {
    padding: 10px 20px;
    .sheet-apply {
      width: 100%;
      margin: 10px 0;
    }
  }
  .filter-section {
    padding-bottom: 15px;
    padding-top: 15px;
    @include h.media(">992px") {
      &:first-of-type {
        padding-top: 0;
      }
    }
    width: 100%;
    @include h.appDirAuto($padding-end: 15px);
    &:not(:last-of-type) {
      border-bottom: 1px solid #dddedf;
    }
    input[type="text"] {
      height: 35px;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    .v-select {
      margin-bottom: 10px;
      .vs__dropdown-toggle {
        background-color: white;
      }
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
