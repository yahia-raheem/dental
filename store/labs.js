import axios from "axios";
export const state = () => ({
  labs: []
});

export const getters = {
  labs: state => {
    return state.labs;
  },
  labById: state => labId => {
    return state.labs.find(lab => lab.id == labId);
  }
};

export const mutations = {
  ADD_LAB(state, lab) {
    state.labs.push(lab);
  }
};

export const actions = {
  getLab(vcontext, labId) {
    if (vcontext.getters.labById(labId)) {
      return vcontext.getters.labById(labId);
    }
  },
  async getLabs(vcontext, args) {
    try {
      const { data } = await axios.get(`${process.env.apiUrl}/api/lab`, {params: args});
      return data;
    } catch (error) {
      new Error(error.response.data.message);
    }
  }
};
