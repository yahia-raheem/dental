import {
  elementObserver,
  imgTosvg
} from "../plugins/js/components/helper-funcs";
// import imgToSvg from '~/mixins/imgToSvg.js'
// export default {
//   mixins: [imgToSvg],
// }

export default {
  methods: {
    transformToSvg(img) {
      elementObserver(imgTosvg, { element: img });
    }
  }
};
