
const state = {
	images: {}
};

const mutations = {
  getImgUrl (state, options) {
    state.images = options.images;
  }
};

const actions = {
	getImgUrl: ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions,
};