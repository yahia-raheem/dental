export const state = () => ({
  parameters: [],
  docSpec: [],
  labSpec: [],
  labLoc: [],
  labAos: [],
  docLoc: []
});

export const getters = {
  parameters: state => {
    return state.parameters;
  },
  docSpec: state => {
    return state.docSpec;
  },
  docLoc: state => {
    return state.docLoc;
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
  },
  SET_DOCLOC(state, docLoc) {
    state.docLoc = docLoc;
  }
};

export const actions = {
  async getParameters(vcontext) {
    try {
      const { data } = await this.$axios.get(
        `${process.env.apiUrl}/api/categories`,
        {
          useCache: true
        }
      );
      const docData = data.doctors;
      const labData = data.labs;
      const locations = data.locations;
      vcontext.commit("SET_DOCSPEC", docData.specialties);
      vcontext.commit("SET_LABSPEC", labData.specialties);
      vcontext.commit("SET_LABLOC", locations);
      vcontext.commit("SET_LABAOS", locations);
      vcontext.commit("SET_DOCLOC", locations);
      const res = await this.$axios.get(
        `${process.env.apiUrl}/api/parameters`,
        {
          useCache: true
        }
      );
      vcontext.commit("SET_PARAMETERS", res.data);
    } catch (error) {
      new Error(error.response.data.message);
    }
  }
};
