
export default {
	state: {
		/*默认所属城市*/
		curAddr     : {},
		/*商品数据*/
    goodData : {},
    /*是否缺货*/
    outOfStock : false,
		/*覆盖层*/
		detailMask  : false,
		/*购物车商品总数*/
    cartSum     : 0,
    /*购物车商品数量是否显示*/
    showAddCart : false,
    /*是否隐藏正文加载图标*/
    hideLoading : false,
	},
	mutations: {
		goodData (state, options) {
			state.goodData = options.goodData;
		},
		outOfStock (state, options) {
			state.outOfStock = options.outOfStock;
		},
		detailMask (state, options) {
			state.detailMask = options.detailMask;
		},
		cartSum (state, options) {
			state.cartSum = options.cartSum || 0;
		},
		hideLoading (state, options) {
			state.hideLoading = options.hideLoading;
		},
		showAddCart (state, options) {
			state.showAddCart = options.showAddCart;
		},

		closeBeanRelated (state) {
			state.detailMask = false;
		},
		closeGoodSelectRelated (state) {
			state.detailMask = false;
		},
		closeSidebarRelated (state) {
			state.detailMask = false;
		},
		closeServiceDescRelated (state) {
			state.detailMask = false;
		},
		closeShareRelated (state) {
			state.detailMask = false;
		},
	},
	actions: {
		/*针对组件mask_close*/
		_maskClose ({commit}) {
			commit({ type: 'openAddr', openAddr: false, stateKey: 'AddressSelect'});
			commit({ type: 'showMask', showMask: false, stateKey: 'showMask'});
		},
		/*针对组件address_select*/
		_addrClose ({commit}) {
			commit({ type: 'openAddr', openAddr: false, stateKey: 'AddressSelect'});
			commit({ type: 'showMask', showMask: false, stateKey: 'showMask'});
		},
	}
};