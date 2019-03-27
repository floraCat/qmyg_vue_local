export default {
	state: {
		sortStyle   : null,
		orderBy     : 'desc',
	},
	mutations: {
		sortStyle (state, options) {
			state.sortStyle = options.sortStyle;
		},
		orderBy (state, options) {
			state.orderBy = options.orderBy;
		},
	},
	actions: {}
};