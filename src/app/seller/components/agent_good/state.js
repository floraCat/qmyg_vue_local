
const state = {
	/*标题*/
	agentTitle: '超级精选',
	/*当前的一级分类*/
	curCat: -1,
};

const mutations = {
	agentTitle (state, options) {
		state.agentTitle = options.agentTitle;
	},
	curCat (state, options) {
		state.curCat = options.curCat;
	},
};

const actions = {
};

export default {
  state,
  mutations,
  actions
};