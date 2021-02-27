<template>
  <section class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="img-container mb-3">
            <get-img
              :imgid="siteLogo"
              :classes="'site-logo'"
              responsive="xxl:130px"
            />
          </div>
          <p class="desc">{{ footerDesc }}</p>
        </div>
        <div class="col-3" v-for="(item, index) in footerWArea" :key="index">
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
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      footerWArea: [],
      copyrightsWArea: [],
      footerDesc: "",
      siteLogo: this.getOption("site_logo")
    };
  },
  async fetch() {
    const menus = await this.footerMenus();
    this.footerWArea = menus.footer_widget_area;
    this.copyrightsWArea = menus.copyrights_widget_area;
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
<style lang=""></style>
