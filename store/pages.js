import Page from "~/models/page";
export const state = () => ({
  pages: [],
  currPage: null,
  pageTitle: "Dental Cloud"
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
  },
  currPageTitle: state => {
    return state.pageTitle;
  }
};

export const mutations = {
  ADD_PAGE(state, page) {
    state.pages.push(page);
  },
  SET_CURRENT(state, page) {
    state.currPage = page;
  },
  SET_TITLE(state, title) {
    state.pageTitle = title;
  }
};

export const actions = {
  async getPage(vcontext, pageId) {
    try {
      if (vcontext.getters.pageById(pageId)) {
        return vcontext.getters.pageById(pageId);
      } else {
        const { data } = await this.$axios.get(
          `${process.env.baseUrl}/wp-json/wp/v2/pages/${pageId}`,
          {
            useCache: true
          }
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
    vcontext.commit("SET_TITLE", page.title);
    return page;
  },
  setTitle(vcontext, title) {
    vcontext.commit("SET_TITLE", title);
  }
};
