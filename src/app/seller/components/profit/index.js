import './index.scss';

import Title   from '~common/components/title';

export default {
  name: 'profit',
  data () {
    return {
      brokerage:0,
      brokerageWait:0
    };
  },
  computed: {
    api_brokerage_total () {
      return '/user/v100/Seller/getTotalBrokerage';
    },
    api_brokerage_wait () {
      return '/user/v100/Seller/getWaitBrokerage';
    },
  },
  components: {
    'app-title': Title,
  },
  mounted () {
    this.getBrokerage();
  },
  methods: {
    /*请求收益数据*/
    getBrokerage () {
      let self = this;
      let storeId = self.$user.get().data.store_info.id;
      self.axios({ method: 'GET', url: self.api_brokerage_total, params:{ store_id: storeId}})
      .then((res) => {
        if ('success' === res.state) {
          this.brokerage = res.data.brokerage;
        }
      });
      self.axios({ method: 'GET', url: self.api_brokerage_wait, params:{ store_id: storeId}})
      .then((res) => {
        if ('success' === res.state) {
          this.brokerageWait = res.data.brokerage;
        }
      });
    },
  }
};