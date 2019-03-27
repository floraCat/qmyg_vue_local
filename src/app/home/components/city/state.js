
/**
* current当前位置
* location定位位置
* lastCity最近访问
*/
const state = {
  current : '',
  location: '',
  hotList : [],
  lastCity: [],
  searchState: false,
};

const mutations = {

  // 当前
  current (state, options) {
    state.current = options.current;
  },

  // 定位
  location (state, options) {
    state.location = options.location;
  },

  // 火热
  hotList (state, options) {
    state.hotList = options.hotList;
  },

  // 搜索
  searchState (state, options) {
    state.searchState = options.searchState;
  },
};

const actions = {
  current     : ({ commit }, options) => commit(options),
  location    : ({ commit }, options) => commit(options),
  hotList     : ({ commit }, options) => commit(options),
  searchState : ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions
};