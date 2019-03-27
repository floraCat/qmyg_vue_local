import './index.scss';

import Title      from '~common/components/title';
import Scroller   from '~common/components/scroller';
import Gotop      from '~common/components/gotop';

export default {
  name: 'shopList',
  data () {
    return {
      items : []
    };
  },
  computed: {
    api_shop_list () {
      return '';
    }
  },
  components: {
    'app-title': Title,
    'app-gotop' : Gotop,
    Scroller
  },
  mounted () {
    // this.getShopList();
  },
  methods: {
    getShopList () {
      let self = this;
      self.axios({
        method : 'GET',
        url : self.api_shop_list,
        params : {
          keyword : self.$route.query.search
        }
      }).then((res) => {
        // console.log(res);
        // console.log(res);
        if ('success' === res.state) {
          if ('refresh' === self.action) {
            self.items = res.data.data;
          }
          if ('infinite' === self.action) {
            self.items = self.items.concat(res.data.data);
          }
          self.pageCount = res.data.last_page;
        }
      });
    },

    /*上拉刷新*/
    refresh (done) {
      this.action = 'refresh';
      this.curPage = 1;
      this.getShopList();
      done();
    },
    /*下拉加载*/
    infinite (done) {
      this.action = 'infinite';
      let self = this;
      if (self.curPage >= self.pageCount) {
        done(true);
      }
      else {
        self.curPage += 1;
        this.getShopList();
        done();
      }
    }
  }
};