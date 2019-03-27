import './index.scss';

export default {
  name: 'sorting',
  data () {
    return {
      /*当前排序方式*/
      curSort :'goods_id',
      /*综合倒序*/
      goods_id_up : false,
      /*价格倒序*/
      shop_price_up : false,
    };
  },
  computed: {},
  props: ['actionName'],
  methods: {
    /*切换排序方式*/
    sortSwitch (ev) {
      let self = this;
      let before = this.curSort;
      let cur = ev.currentTarget.dataset.sort;
      let orderBy = 'desc';
      if (before === cur) {
        if ('goods_id' === cur) {
          this.goods_id_up = !this.goods_id_up;
          orderBy = this.goods_id_up ? 'asc' : 'desc';
        }
        else if ('shop_price' === cur) {
          this.shop_price_up = !this.shop_price_up;
          orderBy = this.shop_price_up ? 'asc' : 'desc';
        }
        else {
          return false;
        }
      }
      else {
        this.goods_id_up = false;
        this.shop_price_up = false;
        this.curSort = cur;
      }
      this.$store.get.commit({
        stateKey: 'Loading',
        type: 'Loading',
        Text: '请求中...',
        isShow: true
      });
      this.$store.get.dispatch({
        type: self.actionName || 'getImglist',
        sortStyle: cur,
        orderBy:orderBy,
        more:false,
        curPage:1
      });
    },
  },
};