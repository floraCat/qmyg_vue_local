
const state = {
  toggle: false,
	item: '',
};

const mutations = {
  toggle (state, options) {
    state.toggle      = options.toggle;
    state.item        = options.item || state.item;
  },
};

const actions = {
  toggle: ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions,
};