var qs = require("qs");
export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async updateUser(vcontext, updateData) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/user/edit`,
      updateData
    );
    return data;
  },
  async changePass(vcontext, userData) {
    const { data } = await this.$axios.post(
      `${process.env.apiUrl}/api/user/edit/password`,
      userData
    );
    return data
  },
  async resetPass(vcontext, userData) {
    await this.$axios.post(
      `${process.env.apiUrl}/api/password/email`,
      userData
    )
  }
};
