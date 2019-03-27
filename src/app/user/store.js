import _   	from 'lodash';

const state = [
	{ Dialog 				: require('~common/components/dialogs/state') },
	{ Address 			: require('~common/components/address/state') },
	{ AddressSelect : require('~common/components/address_select/state') },
	{ Dropdown 		  : require('~common/components/dropdown/state') },
	{ Cropper 		  : require('~common/components/cropper/state') },

	{ Indet 				: require('./components/income_detail/state') },
	{ Profile 			: require('./components/profile/state') },


];

/**
* 页面state请按照下面格式进行添加
*/
export default {

	// 公共部分
	common: {
		Dialog: _.find(state, 'Dialog').Dialog.default,
		Indet : _.find(state, 'Indet').Indet.default,
	},

	// 路由部分
	store: [

		// 添加收货地址列表页
		{
			name 		: 'user.AddAddress',
			modules : {
				Address: _.find(state, 'Address').Address.default,
			}
		},

		// 修改收货地址列表页
		{
			name 		: 'user.EditAddress',
			modules : {
				Address: _.find(state, 'Address').Address.default,
			}
		},

		// 用户资料
		{
			name 		: 'user.Profile',
			modules : {
				Profile: _.find(state, 'Profile').Profile.default,
				Cropper: _.find(state, 'Cropper').Cropper.default,
			}
		},

		// 实名验证
		{
			name 		: 'user.Realname',
			modules : {
				AddressSelect: _.find(state, 'AddressSelect').AddressSelect.default,
			}
		},

		// 添加银行卡
		{
			name 		: 'user.AddCard',
			modules : {
				AddressSelect: _.find(state, 'AddressSelect').AddressSelect.default,
			}
		},

		// 余额提现
		{
			name 		: 'user.Raply',
			modules : {
				Dropdown: _.find(state, 'Dropdown').Dropdown.default,
			}
		},

		// 退换货申请
		{
			name 		: 'user.RefoundApply',
			modules : {
				AddressSelect: _.find(state, 'AddressSelect').AddressSelect.default,
				Cropper: _.find(state, 'Cropper').Cropper.default,
			}
		},

	]
};