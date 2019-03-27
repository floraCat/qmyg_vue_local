import './index.scss';

import Title          from '~common/components/title';

export default {
  name: 'seller',
  data () {
    return {
      brokerage:{},
      counts: {
        visit : 0,
        order : 0,
        sale  : 0
      }
    };
  },
  computed: {
    api_brokerage_total () {
      return '/user/v100/Seller/getTotalBrokerage';
    },
    api_count_visit () {
      return '/user/v100/Seller/getStoreViewCount';
    },
    api_count_order () {
      return '/user/v100/Seller/getStoreOrderCount';
    },
    api_count_sale () {
      return '/user/v100/Seller/getStoreOrderMoney';
    },
  },
  components: {
    'app-title': Title,
  },
  mounted () {
    this.getBrokerage();
    this.getCount();
  },
  methods: {
    /*请求收益数据*/
    getBrokerage () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_brokerage_total,
        params:{
          store_id: self.$user.get().data.store_info.id
        }
      }).then((res) => {
        if ('success' === res.state) {
          this.brokerage = res.data;
        }
      });
    },
    /*请求访客量&订单量&销售量*/
    getCount () {
      let self = this;
      let storeId = this.$user.get().data.user_id;
      self.axios({ method: 'GET', url: self.api_count_visit, params:{ store_id: storeId, days:0}})
      .then((res) => {
        if ('success' === res.state) {
          this.counts.visit = res.data.view_count || 0;
        }
      });
      self.axios({ method: 'GET', url: self.api_count_order, params:{ store_id: storeId, days:0}})
      .then((res) => {
        if ('success' === res.state) {
          this.counts.order = res.data.view_count || 0;
        }
      });
      self.axios({ method: 'GET', url: self.api_count_sale, params:{ store_id: storeId, days:0}})
      .then((res) => {
        if ('success' === res.state) {
          this.counts.sale = res.data.view_count || 0;
        }
      });
    },
    /*点击添加商品*/
    checkAddGood () {
      this.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        customClass : 'dialog_seller',
        title : '',
        msg   : '请前往自由合伙人独立后台登录中心添加自营商品',
        lists : [
          {
            msg: '取消',
          },
          {
            msg: '登录后台',
            func () {
              window.location.href = 'http://partner.eggou.com/index.php?g=user&m=login&a=index';
            }
          },
        ]
      });
    },
  }
};