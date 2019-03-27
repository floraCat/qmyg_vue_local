import './index.scss';

import Title from '~common/components/title';


export default {
	name: 'order_detail',
  data () {
    return {
      items: [],
      state: false,
    };
  },
  computed: {
    api_detail () {
      return '/user/v100/Order/returnOrder';
    }
  },
  mounted () {
    this.getItems();
  },
  components: {
    'app-title': Title,
  },
	methods: {
    getItems () {
      let self = this;
      self.axios({
        method: 'get',
        url: self.api_detail,
        params: {
          order_id: self.$route.params.id * 1
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items = res.data;
        }
      });
    }
	}
};