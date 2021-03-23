import axios from "axios";
export const state = () => ({
  headerOptions: {},
  socialMedia: [],
  images: [],
  headerMenu: [],
  footerMenus: {},
  metabox: []
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
  headerMenu: state => {
    return state.headerMenu;
  },
  footerMenus: state => {
    return state.footerMenus;
  },
  getMetabox: state => key => {
    return state.metabox.find(meta => meta.key == key);
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
    var index = state.images.findIndex(x => x.id == image.id);
    if (index === -1) {
      state.images.push(image);
    }
  },
  SET_HEADERMENU(state, menu) {
    state.headerMenu = menu;
  },
  SET_FOOTERMENUS(state, menus) {
    state.footerMenus = menus;
  },
  ADD_METABOX(state, meta) {
    state.metabox.push(meta);
  }
};

export const actions = {
  async getHeaderMenu(vcontext) {
    try {
      const { data } = await axios.get(
        `${process.env.baseUrl}/wp-json/wp/v2/menus`
      );
      vcontext.commit("SET_HEADERMENU", data["header-menu"]);
    } catch (e) {
      new Error(error.response.data.message);
    }
  },
  async getFooterMenus(vcontext) {
    try {
      if (Object.keys(vcontext.getters.footerMenus).length !== 0) {
        return vcontext.getters.footerMenus;
      } else {
        const { data } = await axios.get(
          `${process.env.baseUrl}/wp-json/wp/v2/widgets`
        );
        vcontext.commit("SET_FOOTERMENUS", data);
        return data;
      }
    } catch (e) {
      new Error(error.response.data.message);
    }
  },
  async getMetaField(vcontext, options) {
    try {
      if (vcontext.getters.getMetabox(options.key)) {
        return vcontext.getters.getMetabox(options.key);
      } else {
        const { data } = await axios.get(
          `${process.env.baseUrl}/wp-json/generaldata/v1/custom_fields/get_item`,
          {
            params: {
              ...options
            }
          }
        );
        vcontext.commit("ADD_METABOX", data);
        return data;
      }
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
  async getHeaderOptions(vcontext) {
    try {
      const { data } = await axios.get(
        `${process.env.baseUrl}/wp-json/generaldata/v1/settings_page/header_data`
      );
      vcontext.commit("SET_HEADER_OPTIONS", data);
    } catch (error) {
      new Error(error.response.data.message);
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
          if (element["link"] && element["imgid"]) {
            vcontext.commit("ADD_SOCIAL_LINK", {
              link: element["link"],
              image: element["imgid"]
            });
          }
        }
      }
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
  async getImage(vcontext, options) {
    try {
      if (typeof vcontext.getters.image(options.id) != "undefined") {
        return vcontext.getters.image(options.id);
      } else {
        const { data } = await axios.get(
          `${process.env.baseUrl}/wp-json/generaldata/v1/getimage/${options.id}`,
          {
            params: {
              size: options.size ? options.size : false
            }
          }
        );
        vcontext.commit("ADD_IMAGE", data);
        return data;
      }
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
  addImg(vcontext, options) {
    if (!vcontext.getters.image(options.id)) {
      vcontext.commit("ADD_IMAGE", options);
    }
  }
};
