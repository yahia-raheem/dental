import Lab from "~/models/lab";
export const state = () => ({
  labs: [
    new Lab(
      1,
      "Digital Dental Lab",
      4,
      ["Maadi", "Nasr City", "Heliopolis"],
      ["Periodontics", "Orthodontics"]
    ).toJSON(),
    new Lab(
      2,
      "Digital Enamel Lab",
      4.5,
      ["Heliopolis"],
      ["Prosthodontics", "Oral and Maxillofacial"]
    ).toJSON(),
    new Lab(3, "Focus Lab", 3.5, ["Maadi"], ["Periodontics"]).toJSON(),
    new Lab(
      4,
      "Digital Dental Academy",
      5,
      ["Nasr City", "Heliopolis"],
      ["Endodontics"]
    ).toJSON()
  ]
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
  }
};
