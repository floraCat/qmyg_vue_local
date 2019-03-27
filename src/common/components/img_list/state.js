import axios  from 'axios';

export default {
	name: 'Imglist',
	state: {
		/*接口*/
		api_list  : '',
		/*列表分类*/
		catId     : 0,
		/*列表数组*/
		items     : [],
		/*当前分页*/
    curPage   : 0,
    /*总页数*/
    pageCount : 0,
    /*上拉刷新 or 下拉加载*/
    action    : 'refresh',
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
		/*搜索关键字*/
		keyword     : null,
	},
	mutations: {
		api_list (state, options) {
			state.api_list = options.api_list;
		},
		catId (state, options) {
			state.catId = options.catId;
		},
		getImglist (state, options) {
			state.curPage         = options.curPage || 1;
			state.sortStyle       = options.sortStyle || state.sortStyle;
			state.orderBy 	      = options.orderBy || state.orderBy;
			state.filterSelf      = options.filterSelf ? 1 : 0 === options.filterSelf ? null : state.filterSelf;
			state.filterProv      = options.filterProv || state.filterProv;
			state.filterCity      = options.filterCity || state.filterCity;
			state.filterTown      = options.filterTown || state.filterTown;
			state.filterHasGoods  = options.filterHasGoods ? 1 : 0 === options.filterHasGoods ? null : state.filterHasGoods;
			state.filterPromotion = options.filterPromotion ? 1 : 0 === options.filterPromotion ? null : state.filterPromotion;
			state.filterPriceMin  = options.filterPriceMin || state.filterPriceMin;
			state.filterPriceMax  = options.filterPriceMax || state.filterPriceMax;
			state.filterBrand     = options.filterBrand || state.filterBrand;
			state.keyword         = options.keyword || state.keyword;
			state.action          = options.action || state.action;
		}
	},
	actions: {
		getImglist ({state, commit}, options) {
			commit(options);
			let submitData = {
				page           : state.curPage,
				categoryId     : state.catId,
        sort           : state.sortStyle,
        order          : state.orderBy,
        isSelf         : state.filterSelf,
				province       : state.filterProv,
				city           : state.filterCity,
				district       : state.filterTown,
				hasGoods       : state.filterHasGoods,
				promotion      : state.filterPromotion,
				price_min      : state.filterPriceMin,
				price_max      : state.filterPriceMax,
				brandId        : state.filterBrand,
				keyword        : state.keyword
			};
			// console.log('getImglist请求的参数：');
			// console.log(submitData);
      axios({
        method: 'GET',
        url:state.api_list,
        params:submitData
      })
      .then((res) => {
				// console.log('imglist');
				// console.log(res);
				if ('success' === res.state) {
					if ('refresh' === state.action) {
						state.items = res.data.data;
					}
					if ('infinite' === state.action) {
						state.items = state.items.concat(res.data.data);
					}
					state.pageCount = res.data.last_page;
				}
      });
		}
	}
};