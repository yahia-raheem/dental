import axios from "axios";
import Page from "~/models/page";
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
  currentPage: state => {
    return state.currPage;
  }
};

export const mutations = {
  ADD_PAGE(state, page) {
    state.pages.push(page);
  },
  SET_CURRENT(state, page) {
    state.currPage = page;
  }
};

export const actions = {
  async getPage(vcontext, pageId) {
    try {
      if (vcontext.getters.pageById(pageId)) {
        return vcontext.getters.pageById(pageId);
      } else {
        const { data } = await axios.get(
          `${process.env.baseUrl}/wp-json/wp/v2/pages/${pageId}`
        );
        const page = Page.fromwpRes(data);
        const pageData = page.toJSON();
        vcontext.commit("ADD_PAGE", pageData);
        return pageData;
      }
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
  async setCurrentPage(vcontext, pageId) {
    const page = await vcontext.dispatch("getPage", pageId);
    vcontext.commit("SET_CURRENT", page);
    return page;
  }
};
