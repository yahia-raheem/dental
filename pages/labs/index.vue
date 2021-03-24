<template>
  <section class="labs-page page internal">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="archive-sidebar">
            <sidebar-filter v-on:nameSearch="nameSearch" />
          </div>
        </div>
        <div class="col-9">
          <div class="header">
            <h6 class="title">Search Results</h6>
            <div class="sort">
              <span class="label">Sort By</span>
              <v-select
                :options="['Most Popular', 'Rating', 'Name']"
                placeholder="Select a Sorting Method"
                @input="sortLabs"
              >
              </v-select>
            </div>
          </div>
          <div class="row">
            <div class="col-6" v-for="(lab, index) in labs" :key="index">
              <lab-block :lab="lab" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import LabBlock from "~/components/labs/LabBlock.vue";
import SidebarFilter from "~/components/UI/SidebarFilter.vue";

export default {
  data() {
    return {
      labs: []
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
    nameSearch(field) {
      this.labs = this.labsGetter.filter(lab =>
        lab.title.toLowerCase().includes(field.toLowerCase())
      );
    },
    sortLabs(v) {
      console.log(v);
    }
  },
  mounted() {
    this.labs = this.labsGetter;
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
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
