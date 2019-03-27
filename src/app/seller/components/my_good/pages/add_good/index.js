import './index.scss';

import PageHead      from '~common/components/page_head';
import Filter        from '~common/components/filter';
import Sorting       from '~common/components/sorting';
import addGoodList   from '../../components/add_good_list';
import MaskClose     from '~common/components/mask_close';
import Gotop         from '~common/components/gotop';
import Scroller      from '~common/components/scroller';

export default {
  name: 'list',
  components: {
    'app-page-head'      : PageHead,
    'app-sorting'        : Sorting,
    'app-filter'         : Filter,
    'app-add-good-list'  : addGoodList,
    'app-mask-close'     : MaskClose,
    'app-gotop'          : Gotop,
    scroller             : Scroller
  },
  data () {
    return {
      /*列表样式代号*/
      listStyle : 2,
      /*swiper实例*/
      swiperObj : {}
    };
  },
  computed: {
    api_list () {
      //return `${this.API_DOMAIN}/my_good.json`;
      return '/goods/v100/index/getGoodses';
    },
    api_agent () {
      return '/user/v100/Seller/agentGoods';
      //return `${this.API_DOMAIN}/test.json`;
    },
    openHandle () {
      return this.$store.get.state.AddGood.openHandle;
    },
    allSelected () {
      return this.$store.get.state.AddGoodList.allSelected;
    },
    numSelected () {
      return this.$store.get.state.AddGoodList.numSelected;
    },
    scrollerWatch () {
      return this.$store.get.state.AddGoodList.items;
    }
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
  },
  watch: {
    /*监听底部弹窗更新swiper实例*/
    openHandle () {
      this.$nextTick(function () {
        this.swiperObj.update();
      });
    }
  },
  methods: {

    /*上拉刷新*/
    refresh (done) {
      let self = this;
      self.$store.get.dispatch({
        type    : 'getAddGoodList',
        curPage : 1,
        action  : 'refresh'
      });
      done();
    },
    /*下拉加载*/
    infinite (done) {
      let self = this;
      let state = self.$store.get.state.AddGoodList;
      if (state.curPage >= state.pageCount) {
        done(true);
      }
      else {
        state.curPage += 1;
        //setTimeout(function () {
          self.$store.get.dispatch({
            type    : 'getAddGoodList',
            curPage : state.curPage,
            action  : 'infinite'
          });
          done();
        //}, 1000);
      }
    },

    /*排版切换*/
    switchStyle () {
      this.$nextTick(function () {
        this.swiperObj.update();
        this.swiperObj.setWrapperTranslate(0);
      });
    },

    /*全选*/
    selectAll () {
      let self = this;
      self.$store.get.state.AddGoodList.allSelected = !self.allSelected;
      self.$store.get.dispatch('selectAll');
    },

    /*我要代理*/
    agentGood () {
      let self = this;
      self.axios({
        method: 'POST',
        url: self.api_agent,
        data: {
          goods_ids:self.$store.get.state.AddGoodList.agentArr.join(','),
          store_id: self.$user.get().data.store_info.id,
          // user_cat: this.$store.get.state.AddGoodList.curSelects
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.$toast('代理成功');
          setTimeout(function () {
            self.$router.push({name: 'seller.InSale'});
          }, 1500);
        }
      });
    },

    /*筛选弹窗*/
    filterSel () {
      this.$store.get.commit({ stateKey: 'Filter', type: 'openFilter', openFilter: true});
      this.$store.get.commit({ stateKey: 'MaskClose', type: 'showMask', showMask: true});
    },
  },
};