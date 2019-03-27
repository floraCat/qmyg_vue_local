import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';

export default {
	name: 'parent_list',
  data () {
    return {
      isPay  : false,
      isFail : false,
      money  : 0,
      orderId: '',
      is_read: 2,
      items  : [],
      surplus: 0,
      ygcoin : 0,
      selectPay: {},
    };
  },
  computed: {

  },
  mounted () {
    this.getData();
    this.getUserAccount();
  },
  components: {
    'app-title' : Title,
  },
  methods: {
    getData () {
      let self = this;
      self.axios.get('/user/v100/Account/getPayFromParentList', {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
          is_read: self.is_read,
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items = res.data;
        }
        else {
          self.$toast(res.desc);
        }
      });
    },

    // 获取用户账号余额
    getUserAccount () {
      let self = this;
      self.axios.get('/user/v100/Account/getUserAccount', {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          self.surplus = res.data.surplus * 1;
          self.ygcoin  = res.data.ygcoin * 1;
        }
        else {
          self.$toast(res.desc);
        }
      });
    },

    handleClose () {
      this.isPay  = false;
      this.isFail = false;
    },

    handlePay (orderId) {
      let self = this;

      if (orderId) {
        self.orderId = orderId;
      }

      self.selectPay = _.filter(self.items, { pid: orderId }).pop() || {};
      if (self.ygcoin < self.selectPay.pay_money * 1) {
        self.isFail = true;
      }
      else {
        self.isPay = true;
      }

    },
    submit () {

    }
  }
};