import _ from 'lodash';

const state = {
  Text   : '正在加载...',
  isShow : false,
};

const mutations = {
	Loading (state, options) {
		state = _.assign(state, options);
  },
  reSetText (state) {
		state.Text = '正在加载...';
  }
};

const actions = {
  Loading: ({ commit }, options) => {
    commit({
      type: 'appFixed',
      appFixed: options.isShow ? true : false,
    });
    commit(options);
  },
};

export default {
  state,
  mutations,
  actions
};