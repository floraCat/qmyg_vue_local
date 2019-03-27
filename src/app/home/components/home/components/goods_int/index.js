import './index.scss';

export default {
  name: 'goods_int',
  data () {
    return {
      msg: 'this is goods_int',
      items1: [],
      items2: []
    };
  },
  computed: {
    api () {
      return `${window.API_DOMAIN}/api/show/v100/Index/getRecommendShow.json`;
    }
  },
  mounted () {
    this.ajax();
  },
  methods: {
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url:self.api,
        data:{}
      })
      .then((res) => {
        if ('success' === res.state) {
          //console.log(res);
          for (let i = 0; 4 > i; i ++) {
            self.items1.push(res.data[i]);
          }
          for (let j = 4; 8 > j; j ++) {
            self.items2.push(res.data[j]);
          }
        }
      });
    }
  }
};