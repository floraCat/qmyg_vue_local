import './index.scss';

import _     from 'lodash';
import Title from '~common/components/title';
import Gotop from '~common/components/gotop';
import Scroller from '~common/components/scroller';

export default {
	name: 'voucher',
  data () {
    return {
      state: 'after',
      items: [],
      isLoading: false,
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
    api_refound () {
      return '/user/v100/Order/returnGoods';
    },
    api_cancel () {
      return '';
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.state = 'before';
    }
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

      if (true === self.isLoading) {
        self.$toast('正在为您提交');
        return false;
      }

      self.axios({
        method: 'get',
        url: self.api_refound,
        params: {
          user_id  : _.get(self.$user.get(), 'data.user_id'),
          order_id : self.$route.query.id || null,
          page     : self.page
        }
      })
      .then((res) => {
        self.isLoading = false;
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

          self.total        = res.data.total * 1;
          self.per_page     = res.data.per_page * 1;
          self.current_page = res.data.current_page * 1;
          self.last_page    = res.data.last_page * 1;

        }
      });
    },
    refresh (done) {
      let self = this;
      self.page = 0;
      self.isLoading = false;
      self.getItems();
      done();
    },

    infinite (done) {
      let self = this;
      if (false === self.isLoading) {
        if (self.current_page >= self.last_page) {
          done(true);
          return;
        }
        self.getItems();
        done();
      }
    },

    cancel (index) {
      let self = this;
      self.axios({
        method : 'POST',
        url : self.api_cancel,
        data : {
          order_id : self.items.data[index].order_id
        }
      }).then((res) => {
        if ('success' === res.state) {
        self.$router.push({name: 'user.Prompt', query:{handle: 'cancel_refound'}});
        }
      });
    }
	}
};