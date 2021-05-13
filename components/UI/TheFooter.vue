<template>
  <section class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
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
          class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex flex-column justify-content-start align-items-start align-items-lg-center"
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
        <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <div class="nav-area">
            <h5 class="nav-title">Contact Us</h5>
            <ul class="footer-nav footer-social">
              <li
                class="nav-link"
                v-for="(item, key) in socialMedia"
                :key="key"
              >
                <a :href="item.link">
                  <get-svg-2 :svg="item.image" width="15" height="15" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
          <hr class="sep mt-4" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 col-12">
          <p class="copyrights">{{ copyrightsDesc }}</p>
        </div>
        <div class="col-sm-6 col-12">
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
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      socialMedia: "general/socialMedia"
    })
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
    &.footer-social {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li::v-deep {
        @include h.circle(30px);
        background-color: #5d5d5d;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 0;
        @include h.appDirAuto($margin-end: 10px);
        svg path {
          fill: white;
        }
      }
    }
  }
  .sep {
    border-color: #c8c8c8;
  }
  .copyrights-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    list-style: none;
    color: #a8a8a8;
    @include h.media(">576px") {
      justify-content: flex-end;
    }
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
  p.copyrights {
    text-align: center;
    @include h.media(">576px") {
      @include h.appDirAuto($text-align: start);
    }
  }
}
</style>
