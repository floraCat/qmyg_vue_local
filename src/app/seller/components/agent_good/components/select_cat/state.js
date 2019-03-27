
const state = {
	/*是否显示弹窗_选择分类*/
	show_selectCat: false,
	/*已选商品分类obj*/
	selectedCat: {
		cat_id: 0,
		cat_name: '未设置'
	}
};

const mutations = {
	show_selectCat (state, options) {
		state.show_selectCat = options.show_selectCat;
	},
	selectedCat (state, options) {
		state.selectedCat = options.selectedCat;
	},
};

const actions = {
};

export default {
  state,
  mutations,
  actions
};