import axios from "axios";
export const state = () => ({
  parameters: [],
  docSpec: [],
  labSpec: [],
  labLoc: [],
  labAos: []
});

export const getters = {
  parameters: state => {
    return state.parameters;
  },
  docSpec: state => {
    return state.docSpec;
  },
  labSpec: state => {
    return state.labSpec;
  },
  labLoc: state => {
    return state.labLoc;
  },
  labAos: state => {
    return state.labAos;
  }
};

export const mutations = {
  SET_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },
  SET_DOCSPEC(state, docSpec) {
    state.docSpec = docSpec;
  },
  SET_LABSPEC(state, labSpec) {
    state.labSpec = labSpec;
  },
  SET_LABLOC(state, labLoc) {
    state.labLoc = labLoc;
  },
  SET_LABAOS(state, labAos) {
    state.labAos = labAos;
  }
};

export const actions = {
  async getParameters(vcontext) {
    var data;
    try {
      const { data } = await axios.get(`${process.env.apiUrl}/api/categories`);
      const docData = data.doctors;
      const labData = data.labs;
      vcontext.commit("SET_DOCSPEC", docData.specialties);
      vcontext.commit("SET_LABSPEC", labData.specialties);
      vcontext.commit("SET_LABLOC", labData.locations);
      vcontext.commit("SET_LABAOS", labData.areas);
      const res = await axios.get(`${process.env.apiUrl}/api/parameters`);
      vcontext.commit("SET_PARAMETERS", res.data);
    } catch (error) {
      new Error(error.response.data.message);
    }
  }
};
