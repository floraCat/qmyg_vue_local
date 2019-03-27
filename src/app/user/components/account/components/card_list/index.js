import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';
import Waiting  from '~common/components/waiting';

export default {
	name: 'user_check_count',
  data () {
    return {
      items      : [],
      msg        : 'this is user_check_count',
      count      : [],
      showNotice : false,
      showPage   : false,
      waite      : true
    };
  },
  computed: {
    api () {
      return `${this.API_DOMAIN}/user_check.json`;
    },
    checkCount () {
      return this.$store.get.state.Check.checkCount;
    }
  },
  mounted () {
    this.ajax();
  },
  methods: {
    //初始化数据
    ajax () {
      let self = this;
      self.axios({
        method: 'get',
        url: '/user/v100/Account/getBankCard',
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
        }
      })
      .then((res) => {
        self.showPage = true;
        self.waite = false;
        if ('success' === res.state) {
          self.items = res.data;
        }
        else {
          self.$toast(res.desc);
        }
      });
    },

    //添加银行卡或支付宝
    addBank (i) {
      this.$router.push({
        name: 'user.AddCard',
        query: { type: i }
      });
    },
    handleDialog (item) {
      let self = this;
      if (item && _.isNumber(item.id)) {
        self.$store.get.dispatch({
          type  : 'handleChangeDialog',
          active: true,
          title : '温馨提示',
          msg   : `是否删除${item.bank_name}账户`,
          lists : [
            {
              msg: '取消',
            },
            {
              msg: '确认',
              func () {
                self.axios({
                  method: 'post',
                  url: '/user/v100/Account/deleteBankCard?id=4455',
                  params: {
                    id: item.id * 1
                  }
                })
                .then((res) => {
                  if ('success' === res.state) {
                    self.items = _.filter(self.items, (o) => {
                      return o.id !== item.id;
                    });
                  }
                  self.$toast(res.desc);
                });
              }
            },
          ]
        });
      }
      else {
        self.$toast('请传入正确的参数');
      }

    }
  },
  components: {
    'app-title'  : Title,
    'app-wait'   : Waiting,
  }
};