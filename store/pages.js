import axios from "axios";
export const state = () => ({
  pages: []
});

export const getters = {
  pages: state => {
    return state.pages;
  },
  pageById: state => pageId => {
    return state.pages.filters(page => page.id == pageId);
  },
  pageIsFetched: state => pageId => {
    return state.pages.some(p => p.id == pageId);
  }
};

export const mutations = {
  ADD_PAGE(state, page) {
    state.pages.push(page);
  }
};

export const actions = {
  async getPage(vcontext, pageId) {
    if (vcontext.getters.pageIsFetched(pageId)) {
      return vcontext.getters.pageById(pageId);
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.baseUrl}/wp-json/wp/v2/pages/${pageId}`
        );
        vcontext.commit("ADD_PAGE", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
