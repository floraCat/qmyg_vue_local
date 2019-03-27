import './index.scss';

// import LocalStorage from '~common/services/localStorage.cookie';

export default {
  data () {
    return {
			tabOn : null,
			cart_nums  : 0,
			incom_nums : 0
    };
  },
  props: ['active'],
  computed: {
		api_cartNum () {
			return `${window.API_DOMAIN}/api/order/v100/cart/cartNumber.json`;
		},
		api_incom () {
			return `${window.API_DOMAIN}/api/user/v100/Profile/getUserTotal.json`;
		}
  },
  mounted () {
		if (this.active) {
			this.tabOn = this.active * 1;
		}
	// localStorage.clear();
		this.getCartNum();
		this.getIncom();
	},
	methods: {
		/*购物车商品数量*/
		getCartNum () {
			// if (LocalStorage.get('goodNumInCart').data) {
			// 	let goodNumInCart = LocalStorage.get('goodNumInCart').data;
			// 	this.cart_nums = 99 >= goodNumInCart ? goodNumInCart : 99;
			// }
			// else {
				let self = this;
				self.axios({
					method : 'GET',
					url    : self.api_cartNum,
					params : {
						user_id : self.$user.get().data ? self.$user.get().data.user_id : ''
					}
				}).then((res) => {
					if ('success' === res.state) {
						self.cart_nums = res.data.cart_number;
					}
				});
			// }
		},
		/*收益数量*/
		getIncom () {
			let self = this;
			self.axios({
				method : 'GET',
				url    : self.api_incom,
				params : {
					user_id : self.$user.get().data ? self.$user.get().data.user_id : 0
				}
			}).then((res) => {
				this.incom_nums = 99 >= res.data.income ? res.data.income : 99;
			});
		},
	}
};