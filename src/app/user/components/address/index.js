import './index.scss';

import _            from 'lodash';
import Title        from '~common/components/title';

export default {
	name: 'address',
	data () {
		return {
			addressList: []
		};
	},
	mounted () {
		this.getUserAddressList();
	},
  components: {
    'app-title': Title,
  },
	methods: {

		// 获取收货地址列表
		getUserAddressList () {
			let self = this;
			self.axios.get('/user/v100/Profile/getUserAddress', {
				params: {
					user_id: _.get(self.$user.get(), 'data.user_id')
				}
			})
			.then((res) => {
				if ('success' === res.state) {
					self.addressList = res.data;
				}
				else {
					self.$toast(res.desc);
				}
			});
		},

		// 设置默认地址
		handelDefault (id) {
			let self = this;

      let data = {
        user_id   	: _.get(self.$user.get(), 'data.user_id'),
        address_id  : id,
      };

			self.axios.post('/user/v100/Profile/modifyDefaultAddress', data)
			.then((res) => {
				self.$toast(res.desc);
				if ('success' === res.state) {
					self.getUserAddressList();
				}
			});
		},

		// 删除收货地址
		handelDelete (id) {
			let self = this;
			self.$store.get.dispatch({
				type 	: 'handleChangeDialog',
				active: true,
				title : '温馨提示',
				msg   : '确定要删除？',
				lists : [
					{
						msg: '取消',
					},
					{
						msg: '确定',
						func () {
							let data = {
								user_id: _.get(self.$user.get(), 'data.user_id'),
								address_id: id,
							};
							self.axios.post('/user/v100/Profile/deleteUserAddress', data)
								.then((res) => {
									self.$toast(res.desc);
									self.getUserAddressList();
								});
							}
					},
				]
			});

		}
	},
};