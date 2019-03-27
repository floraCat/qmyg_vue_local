import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';
import Gotop      from '~common/components/gotop';
import Scroller from '~common/components/scroller';

export default {
  name: 'order',
  data () {
    return {
      items       : [],
      curIndex    : null,
      cancelType  : null,
      /*for test start*/
      itemsReason : [],
      /*for test end*/
      curReason   : null,
      state       : false,
      isDummy     : false,
      isExplain   : false,
      isCancel    : false,
      keyword     : '',
      status      : '',
      page        : 0,
      total       : 1,
      // per_page    : 1,
      current_page: 1,
      last_page   : 1,
      swiperObj   : {}
    };
  },
  computed: {
    api_reason () {
      return '/user/v100/Order/getCancelCause';
    },
    api_handle_del () {
      return '';
    },
    api_order_cancel () {
      return '/user/v100/Order/cancelOrder';
    },
    api_apply_cancel () {
      return '/user/v100/Order/applyCancelOrder';
    },
    api_order_remind () {
      return '/user/v100/Order/shippingRemind';
    },
    api_order_get () {
      return '/user/v100/Order/affirmReceived';
    }
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
    if (this.$route.query.status) {
      this.status = this.$route.query.status * 1;
      this.handleStatus(this.status);
    }
    else {
      this.getItems();
    }
    this.getReason();
  },
  components: {
    'app-title': Title,
    'app-gotop' : Gotop,
    Scroller
  },
  methods: {
    getItems () {
      let self = this;
      self.page ++;
      // self.loading = true;
      let data = {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
          page: this.page,
        }
      };

      if (_.isNumber(self.status)) {
        data.params.status = self.status;
      }

      if (!_.isEmpty(self.keyword)) {
        data.params.keyword = self.keyword;
      }

      self.axios.get('/user/v100/Order/getOrderList', data)
      .then((res) => {
        // self.loading = false;
        if ('success' === res.state) {
          let data = res.data;
          if (1 !== self.page) {
            for (let i in data.data) {
              self.items.data.push(data.data[i]);
            }
          }
          else {
            self.items = data;
          }

          _.filter(self.items.data, (item) => {
            let money = 0;
            /*for test START*/
            if (!item.goods_list) {
              item.goods_list = [];
            }
            /*for test END*/
            if (0 < item.goods_list.length) {
              for (let i = 0; i < item.goods_list.length; i ++) {
                money += item.goods_list[i].goods_price * 1 * item.goods_list[i].goods_number * 1;
              }
            }

            item.total = money;
          });

          self.total        = res.data.total * 1;
          // self.per_page     = res.data.per_page * 1;
          self.current_page = res.data.current_page * 1;
          self.last_page    = res.data.last_page * 1;

        }

      });
    },

    refresh (done) {
      let self = this;
      self.page = 0;
      // self.loading = false;
      self.getItems();
      done();
    },

    infinite (done) {
      let self = this;
      // if (false === self.loading) {
        if (self.current_page >= self.last_page) {
          done(true);
          return;
        }
        self.getItems();
        done();
      // }
    },

    // 搜索
    handleSearch () {
      if (_.isEmpty(this.keyword)) {
        this.$toast('请输入商品名称/商品编号/订单号');
      }
      else {
        this.page = 0;
        this.getItems();
      }
    },

    //切换类型
    handleStatus (type) {
      this.page = 0;
      this.current_page = 1;
      this.last_page = 1;
      this.items = [];
      this.status = type;
      this.keyword = '';
      this.getItems();
    },

    //订单可选取消原因
    getReason () {
      let self = this;
      self.axios({
          method : 'GET',
          url : self.api_reason,
          data : {}
        }).then((res) => {
          if ('success' === res.state) {
            self.itemsReason = res.data;
          }
        });
    },

    /*删除订单*/
    orderDel (index) {
      let self = this;
      this.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        customClass : 'dialog_simple',
        title : '',
        msg   : '您是否确认删除此订单？',
        lists : [
          {
            msg: '取消',
          },
          {
            msg: '确认',
            func () {
              // self.axios({
              //   method: 'POST',
              //   url : self.api_handle_del,
              //   data : {
              //     order_id : self.items.data[index].order_id
              //   }
              // }).then((res) => {
              //   if ('success' === res.state) {
                  self.$router.push({ name: 'user.Prompt', query: { handle: 'order_del', id: self.items.data[index].order_id}});
              //   }
              // });
            }
          },
        ]
      });
    },

    /*取消订单*/
    orderCancel (index, id, act) {
      let self = this;
      this.curReason = index;
      let api = 'apply' === act ? self.api_apply_cancel : self.api_order_cancel;
      setTimeout(function () {
        self.axios({
          method : 'POST',
          url : api,
          data : {
            user_id  : self.$user.get().data.user_id,
            order_id : self.items.data[self.curIndex].order_id,
            reason   : id
          }
        }).then((res) => {
          if ('success' === res.state) {
            self.$router.push({ name: 'user.Prompt', query: { handle: 'order_cancel', id: self.items.data[index].order_id}});
          }
          else {
            self.isCancel = false;
          }
        });
      }, 500);
    },

    /*提醒发货*/
    remindSend (index) {
      let self = this;
      self.axios({
        method : 'POST',
        url : self.api_order_remind,
        data : {
          user_id  : self.$user.get().data.user_id,
          order_id : self.items.data[index].order_id
        }
      }).then((res) => {
          if ('success' === res.state) {
          /*--for test start--*/
          let first = true;
          /*--for test end--*/
          if (first) {
            self.$toast('提醒成功');
          }
          else {
            self.$toast('今天您已经提醒过了');
          }
          }
      });
    },

    /*确认收货*/
    confirmGet (index) {
      let self = this;
      this.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        customClass : 'dialog_simple',
        title : '',
        msg   : '你确认已经收到货物了吗？',
        lists : [
          {
            msg: '取消',
          },
          {
            msg: '确认',
            func () {
              self.axios({
                method : 'POST',
                url : self.api_order_get,
                data : {
                  user_id  : self.$user.get().data.user_id,
                  order_id : self.items.data[index].order_id
                }
              }).then((res) => {
                if ('success' === res.state) {
                  self.$toast('确认收货成功');
                  self.handleStatus('');
                }
              });
            }
          },
        ]
      });
    }
  }
};