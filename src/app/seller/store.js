import _   		from 'lodash';

const state = [

	{ Class 			      : require('~common/components/classify/state') },
	{ AddGoodList 			: require('./components/my_good/components/add_good_list/state') },
	{ Sorting 				  : require('~common/components/sorting/state') },
	{ Filter 				    : require('~common/components/filter/state') },
	{ MaskClose 				: require('~common/components/mask_close/state') },
	{ AddressSelect 		: require('~common/components/address_select/state') },
	{ Cropper 		      : require('~common/components/cropper/state') },

	{ AddGood 		      : require('./components/my_good/pages/add_good/state') },
	{ AgentGood 		    : require('./components/agent_good/state') },
	{ SelectCat 		    : require('./components/agent_good/components/select_cat/state') },
	{ SelectGood 		    : require('./components/agent_good/pages/select_good/state') },
];


/**
* 页面state请按照下面格式进行添加
*/
export default {

	// 公共部分
	common: {},

	// 路由部分
	store: [

		//代理商品 - 超级精选
		{
			name    : 'seller.RecomGood',
			modules : {
				AgentGood : _.find(state, 'AgentGood').AgentGood.default,
			}
		},
		//代理商品 - 超级精选
		{
			name    : 'seller.SelectGood',
			modules : {
				AgentGood : _.find(state, 'AgentGood').AgentGood.default,
				SelectCat : _.find(state, 'SelectCat').SelectCat.default,
				SelectGood : _.find(state, 'SelectGood').SelectGood.default,
			}
		},

		// 我的商品 - 出售中的分类
		{
			name 		: 'seller.InSaleCat',
			modules : {
				Class : _.find(state, 'Class').Class.default,
			}
		},

		// 我的商品 - 增加新产品分类
		{
			name 		: 'seller.AddGoodCat',
			modules : {
				Class : _.find(state, 'Class').Class.default,
			}
		},

		// 我的商品 - 增加新产品
		{
			name 		: 'seller.AddGood',
			modules : {
				AddGood 			: _.find(state, 'AddGood').AddGood.default,
				AddGoodList 	: _.find(state, 'AddGoodList').AddGoodList.default,
				Sorting 			: _.find(state, 'Sorting').Sorting.default,
				Filter 			  : _.find(state, 'Filter').Filter.default,
				MaskClose 		: _.find(state, 'MaskClose').MaskClose.default,
				AddressSelect : _.find(state, 'AddressSelect').AddressSelect.default,
			}
		},

		// 店铺设置
		{
			name    : 'seller.SetShop',
			modules : {
				Cropper: _.find(state, 'Cropper').Cropper.default,
			}
		}

	]
};