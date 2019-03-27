export default {
	state: {
		openFilter  : false,
	},
	mutations: {
		openFilter (state, options) {
			state.openFilter = options.openFilter;
		},
	},
	actions: {}
};