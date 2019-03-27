import './index.scss';

export default {
  name: 'main-content',
  data () {
    return {
      goodContent:''
    };
  },
  computed: {
    api_content () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getGoodsDesc.json`;
    },
  },
  mounted () {
    this.getGoodContent();
  },
  methods: {
    /*请求商品正文*/
    getGoodContent () {
      let self = this;
      self.axios({
        method : 'GET',
        url    : self.api_content,
        params : {
          goods_id : self.$route.params.id
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.goodContent = res.data;
        }
      });
    }
  }
};