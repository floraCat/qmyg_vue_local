import './index.scss';

import Title        from '~common/components/title';

export default {
	name: 'pay',
	data () {
		return {
			payMode: [],
		};
	},
	mounted () {
		this.getPayMode();
	},
  components: {
    'app-title':      Title,
  },
	methods: {
		/*获取付款方式列表*/
    getPayMode () {
      let url  = `${this.API_DOMAIN}/pay_mode.json?${this.itemIndex}`;
      let self = this;
      self.axios({
        method: 'GET',
        url: url,
      })
      .then( (res) => {
        self.payMode = res;
      });
    },
	},
	computed: {},
	filters: {},
};