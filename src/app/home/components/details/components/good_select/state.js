export default {
	state: {
		/*当前商品添加数量*/
		numGood : 1,
		/*商品规格数组*/
		curAttrsId : [],
		/*已选商品规格文本*/
		curAttrsTxt : '',
		/*当前已选商品价格*/
		curPrice : ''
	},
	mutations: {
		numGood (state, options) {
			state.numGood = options.numGood;
		},
		curAttrsId (state, options) {
			state.curAttrsId = options.curAttrsId;
		},
		curAttrsTxt (state, options) {
			state.curAttrsTxt = options.curAttrsTxt;
		},
		curPrice (state, options) {
			state.curPrice = options.curPrice;
		},
	},
	actions: {}
};