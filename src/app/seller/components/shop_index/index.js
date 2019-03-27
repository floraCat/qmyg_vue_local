import './index.scss';

import Act          from '../../../home/components/home/components/act';

export default {
  name: 'shop_index',
  data () {
    return {
      items : [
        { ttl : '11111111111111111'},
        { ttl : '11111111111111111'},
        { ttl : '11111111111111111'},
        { ttl : '11111111111111111'}
      ]
    };
  },
  computed: {
    api_items () {
      return '';
    }
  },
  components : {
    'app-act'         : Act,
  },
  mounted () {
    this.getItems();
  },
  methods: {
    getItems () {},
    loadMore () {
      let data = [
        { ttl : '22222222222'},
        { ttl : '22222222222'},
        { ttl : '22222222222'},
        { ttl : '22222222222'}
      ];
      for (let i in data) {
        this.items.push(data[i]);
      }
    }
  }
};