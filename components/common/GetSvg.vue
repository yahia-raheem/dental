<template>
  <div>
    <img
      src=""
      class="style-svg"
      ref="theImg"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { elementObserver } from "~/plugins/js/components/helper-funcs";

export default {
  data() {
    return {
      svg: ""
    };
  },
  props: {
    svgid: {
      reauired: false
    },
    svgobj: {
      required: false,
      default: null
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  mounted() {
    if (this.svgobj != null) {
      this.svgid = this.svgobj.full_url;
    }
    this.transformToSvg();
  },
  methods: {
    ...mapActions({
      getSvg: "general/getSvg"
    }),
    transformToSvg() {
      elementObserver(this.imgTosvg, { element: this.$refs.theImg });
    },
    imgTosvg(options) {
      var img = options['element'];
      const imgID = img.getAttribute("id");
      const width = img.getAttribute("width");
      const height = img.getAttribute("height");
      const imgClasses = img.getAttribute("class");
      this.getSvg(this.svgid).then(data => {
        const resPure = data.svg;
        const parentDiv = document.createElement("div");
        parentDiv.innerHTML = resPure;
        const svg = parentDiv.querySelector("svg");
        if (imgID != null) {
          svg.setAttribute("id", imgID);
        }
        width != null ? svg.setAttribute("width", width) : null;
        height != null ? svg.setAttribute("height", height) : null;
        svg.removeAttribute("xmlns:a");
        svg.setAttribute("class", imgClasses);
        if (img.parentNode) {
          img.parentNode.replaceChild(svg, img);
        }
      });
    }
  }
};
</script>
<style lang=""></style>
