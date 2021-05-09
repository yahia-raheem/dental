export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch("general/getHeaderOptions");
      await dispatch("parameters/getParameters");
      dispatch("general/getSocialMedia");
      dispatch("general/getHeaderMenu");
    } catch (error) {
      console.log(error);
    }
  }
};
