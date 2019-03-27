
const state = {
	/*商铺信息*/
  shopInfo: {},
};

const mutations = {
	shopInfo (state, options) {
		state.shopInfo = options.shopInfo;
	}
};

const actions = {
};

export default {
  state,
  mutations,
  actions
};