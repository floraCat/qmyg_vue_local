import './index.scss';

import _ from 'lodash';

export default {
	name: 'tips',
  data () {
    return {
			formTemp: []
    };
  },
  props: ['referer'],
	computed: {
		shopStatus () {
			return _.get(this.$user.get(), 'data.shop_status');
		}
  },
	mounted () {
		this.getTipsData();
	},
	methods: {

		getTipsData () {
      let self = this;
      self.axios.get(`${this.API_DOMAIN}/home_tips.json`)
      .then((res) => {
				let share 	= _.get(res, 'data.share');
				let daipay 	= _.get(res, 'data.daipay');

				if (0 < share.length) {
					for (let i in share) {
						self.formTemp.push(share[i]);
					}
				}

				if (0 < daipay.length) {
					for (let i in daipay) {
						self.formTemp.push(daipay[i]);
					}
				}

      });
		}
	}
};