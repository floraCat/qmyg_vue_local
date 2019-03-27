
const state = {
	isShow  : false,
	cityList: [],
  prov: '',
  city: '',
  area: '',
  street: '',
};

const mutations = {
  isShowActive (state, options) {
		state.isShow = options.isShow;
  },
  cityList (state, options) {
		state.cityList = options.cityList;
  },

  switchParent (state, options) {
    switch (options.index) {
      case 1:
        state.prov = options.item;
        state.city = '';
        state.area = '';
        state.street = '';
        break;

      case 2:
        state.city = options.item;
        state.area = '';
        state.street = '';
        break;

      case 3:
        state.area = options.item;
        state.street = '';
        break;

      default:
        state.street = options.item;
    }
  }
};

const actions = {
	isShowActive: ({ commit }, options) => commit(options),
	cityList: ({ commit }, options) => commit(options),
	switchParent: ({ commit }, options) => commit(options),
};

export default {
  state,
  mutations,
  actions,
};