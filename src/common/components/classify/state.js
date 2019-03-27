
const state = {
  Active: 0,
};

const mutations = {
  itemActive (state, options) {
    state.Active = options.Active;
  }
};

const actions = {
  itemActive: ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions,
};