<template>
  <div>
    <img
      :src="svg"
      class="style-svg"
      ref="theImg"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import imgToSvg from "~/mixins/imgToSvg.js";
import { elementObserver } from "~/plugins/js/components/helper-funcs";
import axios from "axios";

export default {
  mixins: [imgToSvg],
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
    if (this.svgobj == null) {
      this.getImage({
        id: this.svgid
      }).then(data => {
        this.svg = data.image;
        // this.transformToSvg(this.$refs.theImg);
        this.svgWorker();
      });
    } else {
      this.addImg({
        alt: this.svgobj.alt,
        id: this.svgobj.ID,
        image: this.svgobj.full_url
      });
      this.svg = this.svgobj.full_url;
      // this.transformToSvg(this.$refs.theImg);
      this.svgWorker();
    }
  },
  methods: {
    ...mapActions({
      getImage: "general/getImage",
      addImg: "general/addImg"
    }),
    svgWorker() {
      elementObserver(this.imgTosvg, { element: this.$refs.theImg });
    },
    imgTosvg(options) {
      const img = options["element"];
      const imgURL = img.getAttribute("src");
      console.log(imgURL);
      const imgID = img.getAttribute("id");
      const width = img.getAttribute("width");
      const height = img.getAttribute("height");
      const imgClasses = img.getAttribute("class");
      axios
        .get(imgURL, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
          }
        });
      // var xhttp = new XMLHttpRequest();
      // xhttp.onreadystatechange = function() {
      //   if (this.readyState == 4 && this.status == 200) {
      //     const resPure = this.responseText.trim();
      //     const parentDiv = document.createElement("div");
      //     parentDiv.innerHTML = resPure;
      //     const svg = parentDiv.querySelector("svg");
      //     if (imgID != null) {
      //       svg.setAttribute("id", imgID);
      //     }
      //     width != null ? svg.setAttribute("width", width) : null;
      //     height != null ? svg.setAttribute("height", height) : null;
      //     svg.removeAttribute("xmlns:a");
      //     svg.setAttribute("class", imgClasses);
      //     img.parentNode.replaceChild(svg, img);
      //   }
      // };
      // xhttp.open("GET", imgURL, true);
      // xhttp.send();
    }
  }
};
</script>
<style lang=""></style>
