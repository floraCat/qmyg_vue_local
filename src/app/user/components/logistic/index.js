import './index.scss';

import Title    from '~common/components/title';

export default {
	name: 'logistic',
  data () {
    return {
      items: [],
    };
  },
	mounted () {
    this.getItems();
	},
	computed: {
    api_logistic () {
      return '';
    }
  },
  components: {
    'app-title': Title,
  },
	methods: {
    getItems () {
      let self = this;
      self.axios({
        method: 'GET',
        url : self.api_logistic,
        params: {}
      }).then(() => {
      });
    },
	}
};