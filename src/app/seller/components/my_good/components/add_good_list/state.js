import axios  from 'axios';

export default {
	name: 'AddGoodList',
	state: {
		/*接口*/
		api_list  : '',
		/*列表分类*/
		catId     : 0,
		/*列表数组*/
		items     : [],
		/*当前分页*/
    curPage : 0,
    /*总页数*/
    pageCount : 0,
    /*操作*/
    action : 'refresh',
		/*列表页排序*/
		sortStyle : null,
		orderBy   : null,
		/*列表页筛选*/
		filterSelf     : null,
		filterProv     : null,
		filterCity     : null,
		filterTown     : null,
		filterHasGoods : null,
		filterPromotion: null,
		filterPriceMin : null,
		filterPriceMax : null,
		filterBrand    : null,
		/*搜索*/
		keyword : null,
		/*当前选中*/
		curSelects: [],
		/*要代理商品数组*/
		agentArr : [],
		/*是否全选*/
		allSelected : false,
		/*已选个数*/
		numSelected : 0
	},
	mutations: {
		api_list (state, options) {
			state.api_list = options.api_list;
		},
		catId (state, options) {
			state.catId = options.catId;
		},
		pageCount (state, options) {
			state.pageCount = options.pageCount;
		},
		getAddGoodList (state, options) {
			state.curPage         = options.curPage || 1;
			state.sortStyle       = options.sortStyle || state.sortStyle;
			state.orderBy 	      = options.orderBy || state.orderBy;
			state.filterSelf      = options.filterSelf || state.filterSelf;
			state.filterProv      = options.filterProv || state.filterProv;
			state.filterCity      = options.filterCity || state.filterCity;
			state.filterTown      = options.filterTown || state.filterTown;
			state.filterHasGoods  = options.filterHasGoods || state.filterHasGoods;
			state.filterPromotion = options.filterPromotion || state.filterPromotion;
			state.filterPriceMin  = options.filterPriceMin || state.filterPriceMin;
			state.filterPriceMax  = options.filterPriceMax || state.filterPriceMax;
			state.filterBrand     = options.filterBrand || state.filterBrand;
			state.keyword         = options.keyword || state.keyword;
			state.action          = options.action || state.action;
		},
		agentArr (state, options) {
			state.agentArr = options.agentArr;
		},
		curSelects (state, options) {
			state.curSelects = options.curSelects;
		},
		allSelected (state, options) {
			state.allSelected = options.allSelected;
		},
		numSelected (state, options) {
			state.numSelected = options.numSelected;
		},
	},
	actions: {
		getAddGoodList ({state, commit }, options) {
			commit(options);
			let submitData = {
				page           : state.curPage,
				categoryId     : state.catId,
        sort           : state.sortStyle,
        order          : state.orderBy,
        isSelf         : state.filterSelf,
				// prov     : state.filterProv,
				// city     : state.filterCity,
				// town     : state.filterTown,
				hasGoods       : state.filterHasGoods,
				promotion      : state.filterPromotion,
				price_min      : state.filterPriceMin,
				price_max      : state.filterPriceMax,
				brandId        : state.filterBrand,
				keyword        : state.keyword
			};
			// console.log('getAddGoodList请求的参数：');
			// console.log(submitData);
      axios({
        method: 'GET',
        url:state.api_list,
        params:submitData
      })
      .then((res) => {
				// console.log('addGoodList');
				// console.log(res);
        if ('success' === res.state) {
					if ('refresh' === state.action) {
						state.items = res.data.data;
						for (let i in res.data.data) {
							state.curSelects[i] = false;
						}
					}
					if ('infinite' === state.action) {
						state.items = state.items.concat(res.data.data);
						state.curSelects.length = state.items.length;
					}
					state.pageCount = res.data.last_page;
					state.allSelected = false;
        }
      });
		},
		/*全选*/
		selectAll ({state, commit}) {
			// commit(options);
			if (state.allSelected) {
				let arr = [];
				for (let i = 0; i < state.items.length; i ++) {
					let obj = {};
					obj.goods_id = state.items[i].goods_id;
					arr.push(obj);
				}
				commit({
					type: 'agentArr',
					agentArr: arr
				});
				commit({
					type: 'numSelected',
					numSelected: arr.length
				});
				for (let i = 0; i < state.items.length; i ++) {
					state.curSelects.splice(i, 1, true);
				}
			}
			else {
				commit({
					type: 'agentArr',
					agentArr: []
				});
				commit({
					type: 'numSelected',
					numSelected: 0
				});
				for (let i = 0; i < state.items.length; i ++) {
					state.curSelects.splice(i, 1, false);
				}
			}
		}
	}
};