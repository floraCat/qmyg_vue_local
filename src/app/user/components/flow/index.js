import './index.scss';

import Title        from '~common/components/title';
import Invoice      from './components/invoice';
import DeliveryAddress      from './components/delivery_address';

export default {
	name: 'flow',
	data () {
		return {
			bflag: {
				/*显示发票选框*/
				iflag: false,
				/*显示留言板*/
				imsg: false,
				/*显示地址选择*/
				iaddr : false,
				/*显示易购豆弹窗*/
				isDummy : false,
				/*显示身份验证*/
				flagIdent : true,
			},
			/*发票内容&抬头*/
			invoice: {},
			/*订单数据*/
			orderData : {
				fee : {}
			},
			/*默认地址*/
			onAddress: {},
			/*订单列表*/
			orderLists: [],
			/*运费金额*/
			shipPrice: 0,
			/*运费标记*/
			shipFlag: true,
			/*抵扣金额*/
			ddtPrice: 0,
			/*抵扣标记*/
			ddtFlag: true,
			/*抵扣后总价*/
			payPrice: 0,
			/*身份证号*/
			IDnumber: null,
			/*留言*/
			msgs : []
		};
	},
	computed: {
		api_order_list () {
			return '/order/v100/index/checkoutOrder';
		},
		api_add_order () {
			return '/order/v100/index/addOrder';
		}
	},
	mounted () {
		this.getOrderList();
	},
  components: {
    'app-title'            :      Title,
    'app-delivery-address' : DeliveryAddress,
    'app-invoice'          :   Invoice,
  },
	methods: {
		openInvo () {
			this.bflag.iflag = true;
		},
		addrSelect (index) {
			if ('' === index) {
				this.bflag.iaddr = false;
				return false;
			}
			this.bflag.iaddr = false;
			this.onAddress = this.orderData.user_address_list[index];
		},
		openBean () {
			this.bflag.isDummy = true;
		},
		/*获取发票信息*/
		invodata (val) {
			this.invoice = val;
		},
		/*显示隐藏留言板*/
		openMsg () {
			this.bflag.imsg = !this.bflag.imsg;
		},
		/*获取订单列表*/
    getOrderList () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_order_list,
        params : {
					user_id : self.$user.get().data.user_id,
					cart_value : self.$route.query.cart_value,
					client : 'wechat'
        }
      })
      .then( (res) => {
				if ('success' === res.state) {
					self.orderData = res.data;
					// 默认地址
					let addrs = self.orderData.user_address_list;
					for (let i in addrs) {
						if (addrs[i].is_default) {
							self.onAddress = res.data.user_address_list[i];
						}
					}
					self.orderLists = res.data.order_list;
					// 初始留言
					self.orderLists.forEach(function () {
						self.msgs.push('');
					});
					this.handleShip(res.data.fee.shipping_fee);
					this.getDdt();
				}
      });
    },
    /*运费显示*/
    handleShip (fee) {
			this.shipPrice = fee;
			this.shipFlag = !fee ? false : true;
    },
		/*是否抵扣*/
		getDdt () {
			if (this.ddtFlag) {
				this.ddtPrice = this.orderData.useable_ygcoin;
				this.payPrice = this.orderData.fee.goods_amount - this.orderData.useable_ygcoin;
			}
			else {
				this.ddtPrice = 0;
				this.payPrice = this.orderData.fee.goods_amount;
			}
		},
		changePrice () {
			this.ddtFlag = !this.ddtFlag;
			this.getDdt();
		},
		/*身份验证*/
		idSubmit () {
			if (!this.IDnumber) {
				alert('请输入身份证号');
				return false;
			}
			let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if (false === reg.test(this.IDnumber)) {
				alert('身份证输入不合法');
				return false;
			}
		},
		/*留言字数限制*/
		checkTxtNum (index) {
			let str = this.msgs[index];
			if (50 <= str.length) {
				this.msgs.splice(index, 1, this.msgs[index].substring(0, 50));
			}
		},
		/*留言处理*/
		msgTxt () {
			let self = this;
			let flag = 0;
			for (let i in self.msgs) {
				if (self.msgs[i]) {
					flag = 1;
				}
			}
			if (flag) {
				return JSON.stringify(self.msgs);
			}
			return null;
		},
		/*提交订单*/
		orderSubmit () {
			let self = this;
			let needInv = '不开发票' === self.invoice.name || !self.invoice.name ? 0 : 1;
			let data = {
					user_id : self.$user.get().data.user_id,
					cart_value : self.$route.query.cart_value,
					client : 'wechat',
					address_id : self.onAddress.address_id,
					message : self.msgTxt(),
					need_inv : needInv,
					inv_payee : self.invoice.rise,
					inv_content : self.invoice.name,
					is_use_ygcoin : self.ddtFlag ? 1 : 0
				};
			self.axios({
				method : 'POST',
				url : self.api_add_order,
				data : data
			}).then((res) => {
				if ('success' === res.state) {
					self.$toast('订单提交成功');
					self.$router.push({name: 'user.Pay', params: { id: 1}});
				}
			});
		},
	},
	filters: {
		totalNum (value) {
			let number = 0;
			for (let i = 0; i < value.length; i ++) {
				number += value[i].goods_number;
			}
			return number;
		},
		totalMoney (value) {
			let money = 0;
			for (let i = 0; i < value.length; i ++) {
				money += value[i].goods_number * value[i].goods_price;
			}
			return money;
		},
	},
};