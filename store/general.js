import axios from "axios";
export const state = () => ({
  headerOptions: {},
  socialMedia: [],
  images: []
});

export const getters = {
  headerOptions: state => {
    return state.headerOptions;
  },
  headerOption: state => optionId => {
    return state.headerOptions[optionId];
  },
  socialMedia: state => {
    return state.socialMedia;
  },
  image: state => imageId => {
    return state.images.find(img => img.id == imageId);
  },
  isImageFetched: state => imageId => {
    return state.images.some(e => e.id === imageId);
  }
};

export const mutations = {
  SET_HEADER_OPTIONS(state, options) {
    state.headerOptions = options;
  },
  SET_SOCIAL_MEDIA(state, social) {
    state.socialMedia = social;
  },
  ADD_SOCIAL_LINK(state, single) {
    state.socialMedia.push(single);
  },
  ADD_IMAGE(state, image) {
    state.images.push(image);
  }
};

export const actions = {
  async getHeaderOptions(vcontext) {
    try {
      const { data } = await axios.get(
        `${process.env.baseUrl}/wp-json/generaldata/v1/settings_page/header_data`
      );
      vcontext.commit("SET_HEADER_OPTIONS", data);
    } catch (error) {
      console.log(error);
    }
  },
  async getSocialMedia(vcontext) {
    try {
      const { data } = await axios.get(
        `${process.env.baseUrl}/wp-json/generaldata/v1/social`
      );
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if (element["link"]) {
            const imgoptions = {
              id: element["imgid"],
              icon: false,
              classes: "style-svg"
            };
            const image = await vcontext.dispatch("getImage", imgoptions);
            const modified = {};
            modified["link"] = element["link"];
            vcontext.commit("ADD_SOCIAL_LINK", {
              ...modified,
              image: image.image
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getImage(vcontext, options) {
    try {
      if (vcontext.getters.isImageFetched(options.id)) {
        console.log(`got the ${options.id} image from the store`);
        return vcontext.getters.image(options.id);
      } else {
        console.log(`had to fetch the ${options.id} image`);
        const { data } = await axios.get(
          `${process.env.baseUrl}/wp-json/generaldata/v1/getimage/${options.id}`,
          {
            params: {
              size: options.size ? options.size : false,
              icon: options.icon ? options.icon : false,
              classes: options.classes ? options.classes : false
            }
          }
        );
        vcontext.commit("ADD_IMAGE", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
};
