import './index.scss';

import _ from 'lodash';

export default {
	data () {
		return {
			selectSex: _.get(this.$user.get(), 'data.role') || 1
		};
	},
	props: ['sexFlag'],
	methods: {
		switchSex () {
			this.sexFlag.sf = false;
		},

		handleSubmit () {
			let self = this;

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return false;
      }
      self.loading = true;

			let uid = _.get(self.$user.get(), 'data.user_id');

			let data = _.assign({}, _.get(self.$user.get(), 'data'), { role: self.selectSex });

			self.axios
			.post('/user/v100/Profile/modifyUserInfo', {
				user_id: uid,
				sex: self.selectSex,
			})
			.then((res) => {

				if ('success' === res.state) {
					self.$user.set(data);
					self.$store.get.dispatch({
						type: 'userInfo',
						user: data
					});
					self.sexFlag.sf = false;
				}

				self.$toast(res.desc);
				self.loading = false;
			});
		}
	},
	computed: {},
};