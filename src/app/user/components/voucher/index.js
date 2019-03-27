import './index.scss';

import _          from 'lodash';
import Title      from '~common/components/title';
import Gotop      from '~common/components/gotop';
import Scroller   from '~common/components/scroller';

export default {
	name: 'voucher',
  data () {
    return {
      items: [],
      state: false,
      page : 0,
      total: 1,
      per_page: 1,
      current_page: 1,
      last_page: 1,
      /*swiper对象*/
      swiperObj : {}
    };
  },
  computed: {
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
    this.getItems();
  },
  components: {
    'app-title': Title,
    'app-gotop': Gotop,
    Scroller
  },
	methods: {
    getItems () {
      let self = this;
      self.page ++;

      let data = {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
          type: 'pay_order',
          page: self.page
        }
      };

      self.axios.get('/user/v100/Message/getMsgList', data)
      .then((res) => {
        if ('success' === res.state) {
          let data = res.data;
          if (1 !== self.current_page) {
            for (let i in data) {
              self.items.push(data[i]);
            }
          }
          else {
            self.items = data.data;
          }

          _.filter(self.items, (item) => {
            item.pay_time = new Date(parseInt(item.pay_time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          });

          self.total        = res.data.total * 1;
          self.per_page     = res.data.per_page * 1;
          self.current_page = res.data.current_page * 1;
          self.last_page    = res.data.last_page * 1;
        }

      });
    },
    refresh (done) {
      let self  = this;
      self.page = 0;
      self.state = true;
      self.getItems();
      done();
    },

    infinite (done) {
      let self = this;
      if (self.total <= self.items.length) {
        done(true);
        return;
      }

      self.state = false;
      self.getItems();
      done();
    }
	}
};