
const state = {
  showMask 	: false,
};

const mutations = {
	showMask (state, options) {
		state.showMask = options.showMask;
	},
};

const actions = {};

export default {
  state,
  mutations,
  actions,
};