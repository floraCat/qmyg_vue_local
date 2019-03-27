export default {
	state: {
		/*弹窗-代理操作*/
    openHandle: false,
	},
	mutations: {
		openHandle (state, options) {
			state.openHandle = options.openHandle;
		},
	},
	actions: {
		/*针对组件mask_close*/
		closeMaskRelated ({commit}) {
			commit({
				type: 'openFilter',
				openFilter : false
			});
			commit({ type: 'openAddr', openAddr: false, stateKey: 'AddressSelect'});
			commit({ type: 'showMask', showMask: false, stateKey: 'showMask'});
		}
	}
};