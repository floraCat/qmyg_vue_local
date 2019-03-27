import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';
import Waiting  from '~common/components/waiting';
import Dropdown from '~common/components/dropdown';

export default {
	name: 'user_withdrawals',
  data () {
    return {
      items    : [],
      waite    : true,
      menus    : [],
      selectText: {},
      account  : {},
      money    : 0,
      raplyMoney: 0,
      rateMoney: 0,
      loading  : false,
    };
  },
  computed: {
    title () {
      return 0 === this.$route.query.type * 1 ? '易购豆提现' : '余额提现';
    }
  },
  mounted () {
    this.getBankList();
    this.getUserAccount();
  },
  watch: {
    raplyMoney () {
      if (true !== this.$rules.money(this.raplyMoney * 1)) {
        this.$toast('请填写正确的金额');
        return;
      }
      this.rateMoney = this.raplyMoney * 1 * 0.05;
    }
  },
  methods: {

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
          self.money = 0 === this.$route.query.type * 1 ? res.data.ygcoin * 1 : res.data.surplus * 1;
        }
      });
    },

    // 获取提现账号
    getBankList () {
      let self = this;
      self.axios.get('/user/v100/Account/getBankCard', {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
        }
      })
      .then((res) => {
        self.waite = false;
        if ('success' === res.state) {
          for (let i in res.data) {
            self.menus.push({
              id  : res.data[i].id,
              name: res.data[i].bank_name,
            });

          }
          if (0 < self.menus.length) {
            self.$store.get.dispatch({
              type: 'toggle',
              item: self.menus[0]
            });
          }
        }
      });
    },

    // 全部提现
    addAllMoney () {
      this.raplyMoney = this.money * 1;
    },

    submit () {
      let self = this;

      if (0 >= self.money * 1) {
        self.$toast('您的账号余额不足');
        return;
      }
      // else if (100 > self.raplyMoney * 1) {
      //   self.$toast('提现金额最少100元起');
      //   return;
      // }
      else if (true !== this.$rules.money(this.raplyMoney * 1)) {
        self.$toast('请填写正确的金额');
        return;
      }

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return;
      }

      self.loading = true;

      self.axios.post('/user/v100//Account/applyWithdraw', {
        user_id: _.get(self.$user.get(), 'data.user_id'),
        amount : self.raplyMoney * 1,
        bank_id: _.get(self.$store.get.state, 'Dropdown.item.id')
      })
      .then((res) => {
        self.$toast(res.desc);
        self.$router.push({
          name: 'user.ApplyRecord'
        });
      });
    },

  },
  components: {
    'app-title' : Title,
    'app-wait'  : Waiting,
    Dropdown
  }
};