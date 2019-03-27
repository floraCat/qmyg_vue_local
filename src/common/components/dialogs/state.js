
const state = {
	/*自定义类名*/
	customClass : '',
  title 		  : '',
  msg 			  : '',
  active 		  : false,
  lists 		  : [],
};

const mutations = {
	customClass (state, options) {
		state.customClass = options.customClass;
	},

	handleChangeDialog (state, options) {
		state = Object.assign(state, options);
	},

	resetDialog (state) {
		state.active 		= false;
		state.title 		= '';
		state.msg 			= '';
		state.lists 		= [];
	},
};

const actions = {
	handleChangeDialog: ({ commit }, options) => {
		commit({
			type: 'appFixed',
			appFixed: true,
		});
		commit('resetDialog');
		commit(options);
	},
	resetDialog: ({ commit }) => {
		commit({
			type: 'appFixed',
			appFixed: false,
		});
		commit('resetDialog');
	},
};
export default {
  state,
  mutations,
  actions,
};