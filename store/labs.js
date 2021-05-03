var qs = require("qs");
export const state = () => ({});

export const getters = {};

export const mutations = {};

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
    try {
      const { data } = await this.$axios.get(
        `${process.env.apiUrl}/api/lab/${id}`
      );
      return data;
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
  async updateLab(vcontext, data) {
    const res = await this.$axios.post(
      `${process.env.apiUrl}/api/lab/${data.labId}/edit`,
      data.data
    );
    return res;
  },
  async sendRequest(vcontext, request) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/mail/lab-request`,
      request
    );
    return data;
  }
};
