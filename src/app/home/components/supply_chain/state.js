export default {
	state: {
		msg: '2345678',
	},
	actions: {
		addCart ({
			rootState
		}) {
			rootState.Footer.cart_nums ++;
		}
	},
};