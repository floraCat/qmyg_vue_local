
const state = {
  locationSelecterIsOpen: false,
  current: '',
};

const mutations = {
  locationSelecterOpen (state) {
    state.locationSelecterIsOpen = true;
  },

  locationSelecterClose (state) {
    state.locationSelecterIsOpen = false;
  },

};

const actions = {
  locationSelecterOpen: ({ commit }) => commit('locationSelecterOpen'),
  locationSelecterClose: ({ commit }) => commit('locationSelecterClose'),
};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
};