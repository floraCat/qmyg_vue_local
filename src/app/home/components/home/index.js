import './index.scss';

import Header       from '~common/components/header';
import Footer       from '~common/components/footer';
import Gotop        from '~common/components/gotop';
import LayoutTopic  from '~common/components/layout_topic';
import ImgList      from '~common/components/img_list';
import Scroller     from '~common/components/scroller';

import Menu         from './components/menu';
import Banner       from './components/banner';
import Act          from './components/act';
import Goodsint     from './components/goods_int';
import ShopHead     from './components/shop_head';
import ShopRecom    from './components/shop_recom';


export default {
  data () {
    return {
      /*专题数组*/
      items_topics: [],
      /*scroller组件监听对象*/
      scrollerWatch: 0,
      /*监听一次*/
      watchFirst:true,
      /*商铺头部定位*/
      fixedHead : false,
      /*swiper实例*/
      swiperObj : {},
      /*是否显示店铺相关模块*/
      noShop : false
    };
  },
  components: {
    'app-header'      : Header,
    'app-footer'      : Footer,
    'app-gotop'       : Gotop,
    'app-layout-topic': LayoutTopic,
    'app-img-list'    : ImgList,
    'app-menu'        : Menu,
    'app-banner'      : Banner,
    'app-act'         : Act,
    'app-goods-int'   : Goodsint,
    'app-shop-head'   : ShopHead,
    'app-shop-recom'  : ShopRecom,
    scroller          : Scroller
  },
  computed: {
    /*精品api*/
    api_img_list: function () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getBestGoodses.json`;
    },
    /*专题api*/
    api_layout_topic: function () {
      return `${window.API_DOMAIN}/api/show/v100/Index/getTopicGoods.json`;
    },
    /*图文列表数组*/
    items_imglist () {
      return `${window.API_DOMAIN}/api/img_list_page_1.json`;
    },
    /*商铺头部离顶部高度*/
    offsetHead () {
      return this.$refs.shop_head.$el.offsetTop;
    },
  },
  mounted () {
    /*判断是否商家*/
    if (this.$user.get().data && this.$user.get().data.store_info.id) {
      this.noShop = false;
    }
    this.swiperObj = this.$refs.swiperObj.swiper;
    this.getLayoutTopic();
  },
  watch: {
    items_imglist () {
      let self = this;
      this.$nextTick(function () {
        // 触发scroller更新
        this.scrollerWatch = Math.random();
        /*监听滚动-商铺头部定位*/
        this.swiperObj.on('setTranslate', function () {
          let tansY = self.swiperObj.translate;
          if (-self.offsetHead >= tansY) {
            self.fixedHead = true;
          }
          else {
            self.fixedHead = false;
          }
        });
      });
    },
    items_topics () {
      this.$nextTick(function () {
        // 触发scroller更新
        this.scrollerWatch = Math.random();
      });
    },
    fixedHead () {
      this.swiperObj.update();
    }
  },
  methods: {
    /*请求专题数据*/
    getLayoutTopic () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_layout_topic,
        params:{}
      }).then((res) => {
        if ('success' === res.state) {
          /*接口有问题，修复后删除 start*/
          for (let i in res.data) {
            if (!res.data[i].title) {
              res.data[i].title = {
                href: '',
                img:''
              };
            }
          }
          /*接口有问题，修复后删除 end*/
          self.items_topics = res.data;
        }
      });
    },
    /*上拉刷新*/
    refresh (done) {
      let self = this;
      self.$store.get.dispatch({
        type    : 'getImglist',
        curPage : 1,
        action  : 'refresh'
      });
      this.$refs.menu.refresh();
      this.$refs.banner.refresh();
      done();
    },
    /*下拉加载*/
    infinite (done) {
      let self = this;
      let Imglist = self.$store.get.state.Imglist;
      if (Imglist.curPage >= Imglist.pageCount) {
        done(true);
      }
      else {
        self.$store.get.state.Imglist.curPage += 1;
        self.$store.get.dispatch({
          type    : 'getImglist',
          curPage : Imglist.curPage,
          action  : 'infinite'
        });
        done();
      }
    },
  }
};