import './index.scss';

import _ from 'lodash';

export default {
	data () {
		return {
			nickname: _.get(this.$user.get(), 'data.nick_name') || '',
		};
	},
	props: ['nickFlag'],
	computed: {
  },
	methods: {
		switchNick () {
			this.nickFlag.nf = false;
		},

		submit () {
			let self = this;

			let item = self.$refs.form;
			let res  = self.$validator(item);
			if (0 !== res.code) {
				self.$toast(res.data.msg);
				return;
			}

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return false;
      }
      self.loading = true;

			let uid = _.get(self.$user.get(), 'data.user_id');

			let data = _.assign({}, _.get(self.$user.get(), 'data'), { nick_name: self.nickname });

			self.axios
			.post('/user/v100/Profile/modifyUserInfo', {
				user_id: uid,
				nick_name: self.nickname,
			})
			.then((res) => {
				if ('success' === res.state) {
					self.$user.set(data);
					self.$store.get.dispatch({
						type: 'userInfo',
						user: data
					});
					self.nickFlag.nf = false;
				}

				self.$toast(res.desc);
				self.loading = false;
			});
		}
	},

};