export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("general/getHeaderOptions");
    dispatch("general/getSocialMedia");
    dispatch("general/getHeaderMenu");
    dispatch("parameters/getParameters");
  }
};
