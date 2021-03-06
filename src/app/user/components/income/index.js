import './index.scss';

import _     from 'lodash';
import Title    from '~common/components/title';
import Gotop    from '~common/components/gotop';
import Scroller from '~common/components/scroller';

export default {
	name: 'income',
  data () {
    return {
      items: [],
      loading: false,
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
    scrollerWatch () {
      return '';
    }
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

      self.loading = true;

      let data = {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
          type: 'income',
          page: self.page
        }
      };


      self.axios.get('/user/v100/Message/getMsgList', data)
      .then((res) => {
        self.loading = false;

        if ('success' === res.state) {

          let data = res.data;

          if (1 !== self.page) {
            for (let i in data.data) {
              self.items.push(data.data[i]);
            }
          }
          else {
            self.items = data.data;
          }

          self.total        = data.total * 1;
          self.per_page     = data.per_page * 1;
          self.current_page = data.current_page * 1;
          self.last_page    = data.last_page * 1;
        }


      });

    },

    refresh (done) {
      let self = this;
      self.page = 0;
      self.loading = false;
      self.getItems();
      done();
    },

    infinite (done) {
      let self = this;
      if (false === self.loading) {
        if (self.current_page >= self.last_page) {
          done(true);
          return;
        }
        self.getItems();
        done();
      }
    }
	}
};