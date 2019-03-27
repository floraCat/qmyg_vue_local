export default {
  name: 'AddressSelect',
	state: {
		/*是否显示地址选择弹窗*/
    openAddr : false,
    /*确定后的地址*/
		filterAddr : {},
	},
	mutations: {
		openAddr (state, options) {
			state.openAddr = options.openAddr;
		},
		filterAddr (state, options) {
			state.filterAddr = options.filterAddr;
		},
	},
};