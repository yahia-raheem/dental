import Vue from "vue";
import GetSvg from "@/components/common/GetSvg";
import GetSvg2 from "@/components/common/GetSvg2";
import GetImg from "@/components/common/GetImg";
import GetImgByLink from "@/components/common/GetImgByLink";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

Vue.component("GetSvg", GetSvg);
Vue.component("GetSvg2", GetSvg2);
Vue.component("GetImg", GetImg);
Vue.component("GetImgByLink", GetImgByLink);
