var qs = require("qs");
export const state = () => ({
  currLab: {}
});

export const getters = {
  currLab: state => {
    return state.currLab;
  }
};

export const mutations = {
  SET_CURRLAB(state, lab) {
    state.currLab = lab;
  }
};

export const actions = {
  async getLabs(vcontext, args) {
    try {
      const { data } = await this.$axios.get(`${process.env.apiUrl}/api/lab`, {
        params: args,
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      });
      return data;
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
  async getLabById(vcontext, id) {
    const currLab = vcontext.getters.currLab;
    if (currLab && currLab.id == id) {
      return vcontext.getters.currLab;
    } else {
      try {
        const { data } = await this.$axios.get(
          `${process.env.apiUrl}/api/lab/${id}`
        );
        vcontext.commit("SET_CURRLAB", data);
        return data;
      } catch (error) {
        new Error(error.response.data.message);
      }
    }
  },
  async updateLab(vcontext, data) {
    const res = await this.$axios.post(
      `${process.env.apiUrl}/api/lab/${data.labId}/edit`,
      data.data
    );
    vcontext.commit("SET_CURRLAB", res.data.profile);
    return res;
  },
  async sendRequest(vcontext, request) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/mail/lab-request`,
      request
    );
    return data;
  },
  async uploadPortImage(vcontext, reqData) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/lab/${reqData.labId}/edit/portfolio/upload`,
      reqData.data
    );
    return data;
  },
  async portfolioAction(vcontext, reqData) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/lab/${reqData.labId}/edit/portfolio`,
      reqData.data
    );
    const lab = JSON.parse(JSON.stringify(vcontext.getters.currLab));
    if (reqData.data.action != "select") {
      lab.portfolio = data.portfolio;
    }
    vcontext.commit("SET_CURRLAB", lab);
    return data;
  }
};
