import axios from "axios";
export const state = () => ({
  pages: [],
  currPage: null
});

export const getters = {
  pages: state => {
    return state.pages;
  },
  pageById: state => pageId => {
    return state.pages.find(page => page.id == pageId);
  },
  pageIsFetched: state => pageId => {
    return state.pages.some(p => p.id == pageId);
  },
  currentPage: state => {
    return state.currPage
  }
};

export const mutations = {
  ADD_PAGE(state, page) {
    state.pages.push(page);
  },
  SET_CURRENT(state, page) {
    state.currPage = page
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
  },
  async setCurrentPage(vcontext, pageId) {
    const page = await vcontext.dispatch('getPage', pageId)
    vcontext.commit('SET_CURRENT', page)
    return page
  }
};
