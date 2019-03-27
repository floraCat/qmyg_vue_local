import './index.scss';

import _     from 'lodash';
import Title from '~common/components/title';

export default {
	name: 'msglists',
  data () {
    return {
      express       : 0,
      topic         : 0,
      announce      : 0,
      custom_service: 0,
      income        : 0,
      pay_order     : 0,
    };
  },
	mounted () {
    this.getMessage();
	},
	computed: {},
  components: {
    'app-title': Title,
  },
	methods: {

    // 获取消息列表
    getMessage () {
      let self = this;

      self.axios.get('/user/v100/Message/getTypeList', {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id')
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          self.express        = _.get(_.filter(res.data, { identify: 'express' }).pop(), 'msg_count') || 0;
          self.topic          = _.get(_.filter(res.data, { identify: 'topic' }).pop(), 'msg_count') || 0;
          self.announce       = _.get(_.filter(res.data, { identify: 'announce' }).pop(), 'msg_count') || 0;
          self.custom_service = _.get(_.filter(res.data, { identify: 'custom_service' }).pop(), 'msg_count') || 0;
          self.income         = _.get(_.filter(res.data, { identify: 'income' }).pop(), 'msg_count') || 0;
          self.pay_order      = _.get(_.filter(res.data, { identify: 'pay_order' }).pop(), 'msg_count') || 0;
        }
      });
    },
    refresh (done) {
      let self = this;
      setTimeout(function () {
        self.getMessage();
        done();
      }, 1500);
    },
	}
};