
import './index.scss';

import _ 						from 'lodash';
import LocalStorage from '~common/services/localStorage.cookie';

export default {
  name: 'phoneCode',
  props: ['title', 'phone'],
	data () {
		return {
			name: this.title,
			active: false,
		};
	},
	computed: {},
  mounted () {
		if (!_.isEmpty(this.getTimeCount())) {
			this.timer();
		}
		else {
			this.active = false;
		}
  },
  methods: {
		getTimeCount () {
			let time = LocalStorage.get('timeCount');
			return time;
		},
		timer () {
			let self 	= this;
			let t 		= setInterval(function () {
				if (_.isEmpty(self.getTimeCount())) {
					self.name 	= self.title;
					self.active = false;
					clearInterval(t);
					return;
				}

				let expired = parseInt(new Date().getTime() / 1000);
				let num 		= self.getTimeCount().expired - expired;

				if (0 >= num) {
					self.name 	= self.title;
					self.active = false;
					clearInterval(t);
					return;
				}

				self.active = true;
				self.name = `(${num}s)重新获取`;

			}, 1000);
		},
    getPhoneCode () {
			let self = this;
			if (self.phone) {
				if (true === self.$rules.phone(self.phone)) {
					self.axios.post('/index/v100/Index/sendVerifyCode', {
						mobile: self.phone,
					})
					.then((res) => {
						self.$toast(res.desc);
						if ('success' === res.state) {
							LocalStorage.set('timeCount', 60, 60);
							self.$toast('验证码已发送');
							self.timer();
						}
					});
				}
				else {
					self.$toast('请输入正确的手机号码');
				}
			}
			else {
				self.$toast('请填写手机号码');
			}
		},
  }
};