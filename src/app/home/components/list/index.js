import './index.scss';

import PageHead      from '~common/components/page_head';
import Filter        from '~common/components/filter';
import Sorting       from '~common/components/sorting';
import ImgList       from '~common/components/img_list';
import MaskClose     from '~common/components/mask_close';
import Gotop         from '~common/components/gotop';
import Scroller      from '~common/components/scroller';

export default {
  components: {
    'app-page-head'      : PageHead,
    'app-sorting'        : Sorting,
    'app-filter'         : Filter,
    'app-img-list'       : ImgList,
    'app-mask-close'     : MaskClose,
    'app-gotop'          : Gotop,
    scroller             : Scroller
  },
  data () {
    return {
      /*列表样式代号*/
      listStyle : 1,
      /*swiper实例*/
      swiperObj : {}
    };
  },
  computed: {
    api_list () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getGoodses.json`;
    },
    catId () {
      return this.$route.query.cat_id;
    },
    scrollerWatch () {
      return this.$store.get.state.Imglist.items;
    }
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
  },
  methods: {

    /*上拉刷新*/
    refresh (done) {
      this.$store.get.dispatch({
        type    : 'getImglist',
        curPage : 1,
        action  : 'refresh'
      });
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

    /*排版切换*/
    switchStyle () {
      this.$nextTick(function () {
        this.swiperObj.update();
        this.swiperObj.setWrapperTranslate(0);
      });
    },

    /*筛选弹窗*/
    filterSel () {
      this.$store.get.commit({ type: 'openFilter', openFilter: true, stateKey: 'Filter'});
      this.$store.get.commit({ type: 'showMask', showMask: true, stateKey: 'MaskClose'});
    },

  },
};