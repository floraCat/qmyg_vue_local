import './index.scss';

import Swiper       from 'swiper';
import Scroller     from '~common/components/scroller';
import Gotop      from '~common/components/gotop';

export default {
  name: 'unSettled',
  components: {
    'app-gotop' : Gotop,
    scroller    : Scroller
  },
  data () {
    return {
      /*商品数组*/
      itemGoods: [],
      /*当前分页*/
      curPage : 1,
      /*每页条数*/
      listRows: 8,
      /*上拉刷新 or 下拉加载*/
      action: 'refresh',
      /*swiper实例*/
      swiperObj : {}
    };
  },
  computed: {
    /*商品接口*/
    api () {
      return '/user/v100/Seller/getSuperHints';
      //return `${this.API_DOMAIN}/agent_good.json`;
    }
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
    this.$store.get.commit({ type: 'curCat', curCat: -1});
    this.$store.get.commit({ type: 'agentTitle', agentTitle: '超级精选'});
    this.getGoods();
  },
  methods: {

    /*请求商品*/
    getGoods () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api,
        params: {
          categoryId : self.$store.get.state.AgentGood.curCat,
          page : self.curPage,
          listRows : self.listRows
        }
      }).then((res) => {
        // console.log(res);
        if ('success' === res.state) {
          if ('refresh' === self.action) {
            self.itemGoods = res.data.data;
          }
          if ('infinite' === self.action) {
            self.itemGoods = self.itemGoods.concat(res.data.data);
          }
          self.pageCount = res.data.last_page;
          // console.log('agent_good');
          // console.log(res.data);
          self.$nextTick(function () {
            let len = self.itemGoods.length;
            for (let i = 0; i < len; i ++) {
              /* eslint-disable */
              new Swiper(self.$refs.swiperGoods[i], {
                slidesPerView: 3.4
              });
              /* eslint-disable */
            }
          });
        }
          
      });
    },

    /*上拉刷新*/
    refresh (done) {
      this.action = 'refresh';
      this.curPage = 1;
      this.getGoods();
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
        this.getGoods();
        done();
      }
    }
  }
};