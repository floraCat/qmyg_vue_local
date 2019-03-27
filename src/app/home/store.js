import _   		from 'lodash';

const state = [
	{ App 						  : require('../state') },
	{ Dialog 						: require('~common/components/dialogs/state') },
	{ Loading 					: require('~common/components/loading/state') },
	{ Header 						: require('~common/components/header/state') },
	{ Footer 						: require('~common/components/footer/state') },
	{ Imglist 					: require('~common/components/img_list/state') },
	{ Sorting 				  : require('~common/components/sorting/state') },
	{ Filter 				    : require('~common/components/filter/state') },
	{ MaskClose 				: require('~common/components/mask_close/state') },
	{ Address 					: require('~common/components/address/state') },
	{ AddressSelect 		: require('~common/components/address_select/state') },
	{ LayoutTopic 			: require('~common/components/layout_topic/state') },
	{ LocationSelecter 	: require('~common/components/header/components/location_selecter/state') },
	{ Class 						: require('~common/components/classify/state') },
	{ Dropdown 					: require('~common/components/dropdown/state') },
	{ Scroller 					: require('~common/components/scroller/state') },


	{ List 							: require('./components/list/state') },

	{ Info      				: require('./components/details/pages/info/state') },
	// { Share  						: require('./components/details/components/share/state') },
	// { Bean  						: require('./components/details/components/bean/state') },
	// { BeanDesc  				: require('./components/details/components/bean_desc/state') },
	// { ServiceDesc  			: require('./components/details/components/service_desc/state') },
	{ GoodSelect  			: require('./components/details/components/good_select/state') },
	// { Sidebar  					: require('./components/details/components/sidebar/state') },
	{ QRcode  					: require('./components/details/components/QRcode/state') },

	{ Content 					: require('./components/details/pages/content/state') },
	{ Comment 					: require('./components/details/pages/comment/state') },

];


/**
* 页面state请按照下面格式进行添加
*/
export default {

	// 公共部分
	common: {
		App 		: _.find(state, 'App').App.default,
		Dialog  : _.find(state, 'Dialog').Dialog.default,
		Loading : _.find(state, 'Loading').Loading.default,
	},

	//路由部分
	store: [

		// 列表页
		{
			name 		: 'home.List',
			modules : {
				List 		 			: _.find(state, 'List').List.default,
				Imglist 			: _.find(state, 'Imglist').Imglist.default,
				Sorting 			: _.find(state, 'Sorting').Sorting.default,
				Filter 			  : _.find(state, 'Filter').Filter.default,
				MaskClose 		: _.find(state, 'MaskClose').MaskClose.default,
				AddressSelect : _.find(state, 'AddressSelect').AddressSelect.default,
				Footer 				: _.find(state, 'Footer').Footer.default,
			}
		},

		// 详情页
		{
			name 		: 'home.Info',
			modules : {
				Info 					: _.find(state, 'Info').Info.default,
				MaskClose 		: _.find(state, 'MaskClose').MaskClose.default,
				// Share 				: _.find(state, 'Share').Share.default,
				// Bean 					: _.find(state, 'Bean').Bean.default,
				// BeanDesc 			: _.find(state, 'BeanDesc').BeanDesc.default,
				// ServiceDesc 	: _.find(state, 'ServiceDesc').ServiceDesc.default,
				AddressSelect : _.find(state, 'AddressSelect').AddressSelect.default,
				GoodSelect 		: _.find(state, 'GoodSelect').GoodSelect.default,
				// Sidebar 			: _.find(state, 'Sidebar').Sidebar.default,
				QRcode 				: _.find(state, 'QRcode').QRcode.default,
			}
		},

		// 内容页
		{
			name 		: 'home.Content',
			modules : {
				Content 			: _.find(state, 'Content').Content.default,
				AddressSelect : _.find(state, 'AddressSelect').AddressSelect.default,
			}
		},

		// 评论页
		{
			name 		: 'home.Comment',
			modules : {
				Comment 			: _.find(state, 'Comment').Comment.default,
				AddressSelect : _.find(state, 'AddressSelect').AddressSelect.default,
			}
		},


		// 分类页
		{
			name 		: 'home.Class',
			modules : {
				Class : _.find(state, 'Class').Class.default,
				Header: _.find(state, 'Header').Header.default,
				Footer: _.find(state, 'Footer').Footer.default,
			}
		},

		// 首页
		{
			name 		: 'home.Home',
			modules : {
				Header 					: _.find(state, 'Header').Header.default,
				Footer 					: _.find(state, 'Footer').Footer.default,
				LocationSelecter: _.find(state, 'LocationSelecter').LocationSelecter.default,
				LayoutTopic 		: _.find(state, 'LayoutTopic').LayoutTopic.default,
				Imglist 				: _.find(state, 'Imglist').Imglist.default,
				Scroller 				: _.find(state, 'Scroller').Scroller.default,
			}
		},

		// 搜索页
		{
			name 		: 'home.Search',
			modules : {
				Dropdown: _.find(state, 'Dropdown').Dropdown.default,
			}
		},
	]
};