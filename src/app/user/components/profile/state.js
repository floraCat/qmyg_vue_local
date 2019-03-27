
const state = {
  user: {}
};

const mutations = {

  // 当前
  userInfo (state, options) {
    state.user = options.user;
  },
};

const actions = {
  userInfo: ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions
};