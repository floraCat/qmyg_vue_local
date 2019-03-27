import './index.scss';

import SelectCat  from '../../components/select_cat';
import Scroller   from '~common/components/scroller';
import Gotop      from '~common/components/gotop';

export default {
  name: 'unSettled',
  components: {
    'app-select-cat' : SelectCat,
    'app-gotop'      : Gotop,
    scroller         : Scroller
  },
  data () {
    return {
      /*当前二级分类*/
      curCat2: 0,
      /*二级分类数组*/
      cats2: [],
      /*商品数组*/
      goods: [],
      /*弹窗_上架到店铺*/
      show_upToShop: false,
      /*当前要上架的商品信息对象*/
      curGood: {},
      /*总页数*/
      pageCount : 0,
      /*每页请求天数*/
      listRows : 10,
      /*上拉刷新 or 下拉加载*/
      action : 'refresh',
      /*swiper实例*/
      swiperObj : {},
      /*供swiper监听更新*/
      scrollerWatch: null
    };
  },
  computed: {
    /*二级分类接口*/
    api_cat2 () {
      //return `${this.API_DOMAIN}/xxx.json`;
      return '/goods/v100/index/getGoodsCategories';
    },
    /*商品接口*/
    api_good () {
      return '/user/v100/Seller/getCategoryGoods';
    },
    /*上架到店铺*/
    api_agent () {
      return '/user/v100/Seller/agentGoods';
    },
    /*商铺信息api*/
    api_shop () {
      return '/user/v100/Seller/getStoreInfo';
    },
    curCat () {
      return this.$store.get.state.AgentGood.curCat;
    },
    show_selectCat () {
      return this.$store.get.state.SelectCat.show_selectCat;
    },
    selectedCat () {
      return this.$store.get.state.SelectCat.selectedCat;
    }
  },
  mounted () {
    let self = this;
    this.swiperObj = this.$refs.swiperObj.swiper;
    this.$store.get.commit({
      type: 'agentTitle',
      agentTitle: '市场选货'
    });
    this.$store.get.commit({
      type: 'curCat',
      curCat: this.$route.params.id
    });
    this.getCats2(function () {
      self.curCat2 = self.cats2[0].cat_id;
      document.querySelectorAll('.selectGood .tabs li')[0].click();
    });
  },
  watch: {
    '$route' () {
      this.$store.get.commit({
        type: 'curCat',
        curCat: this.$route.params.id
      });
      this.curPage = 1;
      this.getCats2();
    },
    cats2 () {
      if (this.$refs.swiperObj.swiper) {
        this.$refs.swiperObj.swiper.update();
      }
    },
    goods () {
      this.$nextTick(function () {
        // 触发scroller更新
        this.scrollerWatch = Math.random();
      });
    },
  },
  methods: {
    /*请求二级分类*/
    getCats2 () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_cat2,
        params: {
          categoryId : self.curCat
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.cats2 = res.data;
          // console.log('二级分类');
          // console.log(self.cats2);
          self.$nextTick(function () {
            document.querySelectorAll('.selectGood .tabs li')[0].click();
          });
        }
      });
    },
    /*获取对应分类商品列表*/
    getGoods () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_good,
        params: {
          category_id: self.curCat2,
          page: self.curPage,
          list_rows: self.listRows
        }
      }).then((res) => {
        // console.log('goods');
        // console.log(res);
        if ('success' === res.state) {
          if ('refresh' === self.action) {
            self.goods = res.data.data;
          }
          if ('infinite' === self.action) {
            self.goods = self.goods.concat(res.data.data);
          }
          self.pageCount = res.data.last_page;
        }
      });
    },

    /*切换二级分类*/
    switchTab (id) {
      this.curPage = 1;
      this.curCat2 = id;
      this.action = 'refresh';
      this.getGoods();
    },

    /*上拉刷新*/
    refresh (done) {
      this.action = 'refresh';
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
        //setTimeout(function () {
          this.getGoods();
          done();
        //}, 1000);
      }
    },

    /*打开弹窗_选择分类*/
    pop_selectCat () {
      this.$store.get.commit({
        type:'show_selectCat',
        show_selectCat: true
      });
      this.$store.get.commit({
        type: 'appFixed',
        appFixed: true
      });
    },

    /*打开弹窗_上架到商铺*/
    pop_upToShop (index) {
      this.show_upToShop = true;
      this.curGood = this.goods[index];
      this.$store.get.commit({
        type: 'appFixed',
        appFixed: true
      });
    },

    /*关闭弹窗_上架到商铺*/
    close_upToShop () {
      this.show_upToShop = false;
      this.$store.get.commit({
        type: 'appFixed',
        appFixed: false
      });
    },

    /*上架到商铺*/
    submitAddGood () {
      let self = this;
      self.axios({
        method: 'POST',
        url:self.api_agent,
        data: {
          goods_ids: self.curGood.goods_id,
          user_cat: self.selectedCat.cat_id,
          store_id: self.$user.get().data.store_info.id
        }
      }).then((res) => {
        if ('success' === res.state) {
          // console.log('上架到店铺');
          // console.log(res);
          if ('success' === res.state) {
            self.$toast('上架成功');
          }
          else {
            self.$toast('上架失败');
          }
          setTimeout(function () {
            self.show_upToShop = false;
          }, 1000);
        }
      });
    }
  }
};