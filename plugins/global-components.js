import Vue from "vue";
import GetSvg from "@/components/common/GetSvg";
import GetImg from "@/components/common/GetImg";
import GetImgByLink from "@/components/common/GetImgByLink";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

Vue.component("GetSvg", GetSvg);
Vue.component("GetImg", GetImg);
Vue.component("GetImgByLink", GetImgByLink);
