var qs = require("qs");
export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  // async getDoctors(vcontext, args) {
  //   try {
  //     const { data } = await this.$axios.get(`${process.env.apiUrl}/api/lab`, {
  //       params: args,
  //       paramsSerializer: params => {
  //         return qs.stringify(params);
  //       }
  //     });
  //     return data;
  //   } catch (error) {
  //     new Error(error.response.data.message);
  //   }
  // },
  async getDocById(vcontext, id) {
    try {
      const { data } = await this.$axios.get(
        `${process.env.apiUrl}/api/doctor/${id}`
      );
      return data;
    } catch (error) {
      new Error(error.response.data.errors);
    }
  },
  async updateDoc(vcontext, data) {
    const res = await this.$axios.post(
      `${process.env.apiUrl}/api/doctor/${data.docId}/edit`,
      data.data
    );
    return res;
  },
  // async uploadPortImage(vcontext, reqData) {
  //   const { data } = await this.$axios.post(`${process.env.apiUrl}/api/lab/${reqData.labId}/edit/portfolio/upload`, reqData.data);
  //   return data
  // },
  // async portfolioAction(vcontext, reqData) {
  //   const { data } = await this.$axios.post(`${process.env.apiUrl}/api/lab/${reqData.labId}/edit/portfolio`, reqData.data);
  //   return data
  // }
};
