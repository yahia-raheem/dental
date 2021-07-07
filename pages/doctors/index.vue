<template>
  <section class="doctors-page page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 d-none d-lg-block">
          <div class="archive-sidebar">
            <doctor-sidebar-filter
              v-on:nameFilter="nameModify"
              v-on:specFilter="specModify"
              v-on:locFilter="locModify"
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
          <div class="row" v-if="doctors && doctors.length > 0">
            <div class="col-12" v-for="(doctor, index) in doctors" :key="index">
              <doc-block
                :doc="doctor"
                v-on:filterSpec="specOverwrite"
                v-on:filterLoc="locOverwrite"
              />
            </div>
            <div
              class="col-12 d-flex justify-content-center align-items-center"
              v-if="currentPage != lastPage"
            >
              <button class="btn vm-btn" @click="viewMore">View More</button>
            </div>
          </div>
          <div class="row" v-if="!doctors || doctors.length == 0">
            <div class="col-12">
              <p>Sorry! no results match your filteration.</p>
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
        <doctor-sidebar-filter
          v-on:nameFilter="nameModify"
          v-on:specFilter="specModify"
          v-on:locFilter="locModify"
        />
        <button class="btn btn-primary sheet-apply" @click="closeSheet">
          Apply
        </button>
      </vue-bottom-sheet>
    </client-only>
  </section>
</template>
<script>
import DocBlock from '~/components/doctors/docBlock.vue';
import DoctorSidebarFilter from '~/components/UI/DoctorSidebarFilter.vue';

export default {
  async asyncData(context) {
    context.store.dispatch("pages/setTitle", "Doctors");
    var params = {
      specialties:
        typeof context.query.specialities != "undefined"
          ? context.query.specialities.split(",")
          : context.query.specialities,
      locations:
        typeof context.query.locations != "undefined"
          ? context.query.locations.split(",")
          : context.query.locations,
      name: context.query.name,
    };
    var res = await context.store.dispatch("doctors/getDoctors", params);
    return {
      doctors: res.data,
      currentPage: res.current_page,
      lastPage: res.last_page,
    };
  },
  data() {
    return {
      pending: false,
      params: {},
    };
  },
  components: {
    DoctorSidebarFilter,
    DocBlock,
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
    async specOverwrite(value) {
      if (value != null) {
        await this.$router.push({
          query: {
            ...this.$route.query,
            specialities: value,
          },
        });
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            specialities: undefined,
          },
        });
      }
    },
    async locOverwrite(value) {
      if (value != null) {
        await this.$router.push({
          query: {
            ...this.$route.query,
            locations: value,
          },
        });
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            locations: undefined,
          },
        });
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
                oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined,
            },
          });
        } else {
          oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
          await this.$router.push({
            query: {
              ...this.$route.query,
              specialities: oldSpec + value,
            },
          });
        }
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            specialities: undefined,
          },
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
                oldSpecArr.length > 0 ? oldSpecArr.join(",") : undefined,
            },
          });
        } else {
          oldSpec = oldSpec != "" ? oldSpec + "," : oldSpec;
          await this.$router.push({
            query: {
              ...this.$route.query,
              locations: oldSpec + value,
            },
          });
        }
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            locations: undefined,
          },
        });
      }
    },
    async nameModify(value) {
      if (value != "") {
        await this.$router.push({
          query: { ...this.$route.query, name: value },
        });
      } else {
        await this.$router.push({
          query: {
            ...this.$route.query,
            name: undefined,
          },
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
        name: this.$route.query.name,
      };
      this.$store.dispatch("doctors/getDoctors", this.params).then((res) => {
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.doctors = res.data;
      });
    },
    async viewMore() {
      this.currentPage = this.currentPage + 1;
      this.params.page = this.currentPage;
      await this.$store.dispatch("doctors/getDoctors", this.params).then((res) => {
        res.data.forEach((doctor) => {
          this.doctors.push(doctor);
        });
      });
    },
  },
  watch: {
    async "$route.query"() {
      if (this.pending == false) {
        this.pending = true;
        await this.filter();
        this.pending = false;
      }
    },
  },
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
