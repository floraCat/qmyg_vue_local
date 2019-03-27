import './index.scss';

import _ 			from 'lodash';
import Title  from '~common/components/title';

export default {
	name: 'realnamesuccess',
	data () {
		return {
			formTemp: {}
		};
	},
	mounted () {
    this.getData();
	},
  components: {
    'app-title': Title,
  },
	methods: {
		getData () {
			let self = this;
			let data = {
				params: {
					user_id: _.get(self.$user.get(), 'data.user_id'),
				}
			};
			self.axios
			.get('/user/v100/Profile/getUserCertification', data)
			.then((res) => {
				if ('success' === res.state) {
					if (_.isEmpty(res.data)) {
						self.$toast('您还未进行实名验证');
						self.$router.push({
							name: 'user.Realname'
						});
						return;
					}
					self.formTemp = res.data;
				}
				else {
					self.$toast(res.desc);
				}
			});
		}
	},
};