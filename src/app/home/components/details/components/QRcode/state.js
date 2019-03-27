export default {
	state: {
		creatQRcode : false,
	},
	mutations: {
		creatQRcode (state, options) {
			state.creatQRcode = options.creatQRcode;
		},
	},
	actions: {}
};