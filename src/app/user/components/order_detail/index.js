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
    api () {
      return `${this.API_DOMAIN}/msg_box_act.json`;
    }
  },
  mounted () {
    // this.getItems();
  },
  components: {
    'app-title': Title,
  },
	methods: {

    getItems () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api,
      })
      .then((res) => {
        if (0 === res.code) {
          if (true === self.state) {
            self.items = res.data;
          }
          else {
            for (let i in res.data) {
              self.items.push(res.data[i]);
            }
          }
        }
      });
    },

	}
};