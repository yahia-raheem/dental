var qs = require("qs");
export const state = () => ({
  currDoc: {}
});

export const getters = {
  currDoc: state => {
    return state.currDoc;
  }
};

export const mutations = {
  SET_CURRDOC(state, doc) {
    state.currDoc = doc;
  }
};

export const actions = {
  async getDoctors(vcontext, args) {
    try {
      const { data } = await this.$axios.get(`${process.env.apiUrl}/api/doctor`, {
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
  async getDocById(vcontext, id) {
    const currDoc = vcontext.getters.currDoc;
    if (currDoc && currDoc.id == id) {
      return vcontext.getters.currDoc;
    } else {
      try {
        const { data } = await this.$axios.get(
          `${process.env.apiUrl}/api/doctor/${id}`
        );
        vcontext.commit("SET_CURRDOC", data);
        return data;
      } catch (error) {
        new Error(error.response.data.errors);
      }
    }
  },
  async updateDoc(vcontext, data) {
    const res = await this.$axios.post(
      `${process.env.apiUrl}/api/doctor/${data.docId}/edit`,
      data.data
    );
    vcontext.commit("SET_CURRDOC", res.data.profile);
    return res;
  },
  async uploadPortImage(vcontext, reqData) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/doctor/${reqData.docId}/edit/portfolio/upload`,
      reqData.data
    );
    return data;
  },
  async portfolioAction(vcontext, reqData) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/doctor/${reqData.docId}/edit/portfolio`,
      reqData.data
    );
    const doctor = JSON.parse(JSON.stringify(vcontext.getters.currDoc));
    if (reqData.data.action != "select") {
      doctor.portfolio = data.portfolio;
    }
    vcontext.commit("SET_CURRDOC", doctor);
    return data;
  }
};
