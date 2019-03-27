
export default {
	state: {
		/*.app弹出窗时fixed定位*/
		appFixed: false,
		userInfo: {},
	},
	mutations: {
		appFixed (state, options) {
			document.body.scrollTop = 0;
			setTimeout(function () {
				state.appFixed = options.appFixed;
			}, 0);
		},
		userInfo (state, options) {
			state.userInfo = options.userInfo;
		}
	},
	actions: {
		userInfo: ({ commit }, options) => commit(options),
	}
};