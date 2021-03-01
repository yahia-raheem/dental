export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    dispatch("general/getHeaderOptions");
    dispatch("general/getSocialMedia");
    dispatch("general/getHeaderMenu");
  }
};
