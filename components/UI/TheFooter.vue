<template>
  <section class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="img-container mb-4">
            <get-img
              :imgid="siteLogo"
              :classes="'site-logo'"
              responsive="xxl:150px"
            />
          </div>
          <p class="desc">{{ footerDesc }}</p>
        </div>
        <div
          class="col-3 d-flex flex-column justify-content-start align-items-center"
          v-for="(item, index) in footerWArea"
          :key="index"
        >
          <div class="nav-area">
            <h5 class="nav-title">{{ item.instance.title }}</h5>
            <ul class="footer-nav">
              <li class="nav-item" v-for="(link, i) in item.value" :key="i">
                <nuxt-link class="nav-link" :to="link.url">{{
                  link.title
                }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
          <hr class="sep mt-5" />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p class="copyrights">{{ copyrightsDesc }}</p>
        </div>
        <div class="col-6">
          <ul class="copyrights-nav">
            <li
              class="nav-item"
              v-for="(link, index) in copyrightsNav"
              :key="index"
            >
              <nuxt-link class="nav-link" :to="link.url">{{
                link.title
              }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      footerWArea: [],
      copyrightsDesc: "",
      footerDesc: "",
      siteLogo: this.getOption("site_logo"),
      copyrightsNav: []
    };
  },
  async fetch() {
    const menus = await this.footerMenus();
    this.footerWArea = menus.footer_widget_area;
    this.copyrightsDesc = menus.copyrights_widget_area.find(
      e => e.type === "text"
    ).instance.text;
    this.copyrightsNav = menus.copyrights_widget_area.find(
      e => e.type === "nav_menu"
    ).value;
  },
  mounted() {
    this.getMetabox({
      key: "footer_text",
      args: { object_type: "setting" },
      post_id: "theme_mods_dental"
    }).then(res => {
      this.footerDesc = res.item;
    });
  },
  methods: {
    ...mapActions({
      footerMenus: "general/getFooterMenus",
      getMetabox: "general/getMetaField"
    }),
    getOption(optionId) {
      return this.$store.getters["general/headerOption"](optionId);
    }
  }
};
</script>
<style lang="scss" scoped>
@use "~/assets/scss/helpers" as h with(
  $dir: $dir
);
section.footer {
  padding-bottom: 0;
  .nav-title {
    color: #575757;
    font-weight: bolder;
    position: relative;
    margin-bottom: 35px;
    &::after {
      position: absolute;
      bottom: -20px;
      @include h.appDirAuto($start: 0);
      content: "";
      width: 30px;
      height: 5px;
      border-radius: 10px;
      background-color: h.$secondary;
    }
  }
  ul.footer-nav {
    list-style: none;
    @include h.appDirAuto($padding-start: 0);
    .nav-link {
      @include h.appDirAuto($padding-start: 0);
    }
  }
  .sep {
    border-color: #c8c8c8;
  }
  .copyrights-nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    list-style: none;
    color: #a8a8a8;
    .nav-item {
      position: relative;
      &:last-of-type {
        .nav-link {
          @include h.appDirAuto($padding-end: 0);
        }
      }
      &:not(:last-of-type)::after {
        @include h.appDirAuto($end: 0);
        @include h.center("v");
        width: 2px;
        height: 13px;
        background-color: #a8a8a8;
        content: "";
      }
    }
  }
}
</style>
