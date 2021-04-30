import axios from "axios";
var qs = require("qs");
export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async getLabs(vcontext, args) {
    try {
      const { data } = await axios.get(`${process.env.apiUrl}/api/lab`, {
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
      const { data } = await axios.get(`${process.env.apiUrl}/api/lab/${id}`);
      return data;
    } catch (error) {
      new Error(error.response.data.message);
    }
  },
};
