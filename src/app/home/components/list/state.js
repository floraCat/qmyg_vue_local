export default {
	state: {},
	mutations: {},
	actions: {
		/*针对组件mask_close*/
		closeMaskRelated ({commit}) {
			commit({ type: 'openFilter',	openFilter : false, stateKey: 'Filter'});
			commit({ type: 'openAddr', openAddr: false, stateKey: 'AddressSelect'});
		}
	}
};