import './index.scss';

import Title        from '~common/components/title';
import Scroller     from '~common/components/scroller';
import Gotop        from '~common/components/gotop';
import Swiper       from 'swiper';

export default {
  name: 'comment',
  components: {
    'app-title' : Title,
    'app-gotop' : Gotop,
    Scroller
  },
  data () {
    return {
      /*列表数组*/
      items       : [],
      /*各tab列表状态数组*/
      states      : [],
      /*当前下标*/
      tabActive   : 0,
      /*水平方向swiper实例*/
      tabsSwiper  : null,
      /*当前swiper对象*/
      curSwiperObj : {},
      /*上拉加载 or 下拉刷新*/
      action      : 'refresh',
      /*搜索关键字*/
      keyword: ''
    };
  },
  computed: {
    api_order () {
      return '/user/v100/Seller/getOrderGoods';
      //return `${API_DOMAIN}/getComments.json`;
    },
    curType () {
      let rs;
      switch (this.tabActive) {
        case 0:
          rs = 'all';
          break;
        case 1:
          rs = 'wait_pay';
          break;
        case 2:
          rs = 'wait_ship';
          break;
        case 3:
          rs = 'wait_confirm';
          break;
        case 4:
          rs = 'confirmed';
          break;
      }
      return rs;
    }
  },
  created () {
    for (let i = 0; 5 > i; i ++) {
      // 初始五个空数组
      this.$set(this.items, i, []);
      // 默认状态设置
      this.$set(this.states, i, {
        // 控制没内容样式
        noContent : false,
        // 当前页数
        curPage   : 1,
        // // 总条数
        itemCount : 0,
        // 总页数
        pageCount : 0
      });
    }
  },
  mounted () {
    let self = this;
    /*水平方向swiper实例*/
    this.$refs.swiperHorizon.style.height = document.documentElement.clientHeight - 170 + 'px';
    self.tabsSwiper = new Swiper(this.$refs.swiperHorizon, {
      speed      : 100,
      noSwiping  : true,
      autoHeight : true,
      /*初始化加载第一页评价数据*/
      onInit: function (Swiper) {
        self.tabActive = Swiper.activeIndex;
        self.ajax(Swiper.activeIndex);
        self.curSwiperObj = self.$refs['swiperObj' + self.tabActive][0].swiper;
      },
      /*切换操作*/
      onSlideChangeStart: function (Swiper) {
        self.tabActive = Swiper.activeIndex;
        self.switchTabs(self.tabActive);
        self.curSwiperObj = self.$refs['swiperObj' + self.tabActive][0].swiper;
      }
    });
    /*url传参tabActive*/
    if (this.$route.query.tabActive) {
      self.tabActive = this.$route.query.tabActive * 1;
      self.tabsSwiper.slideTo(self.tabActive);
    }
  },
  methods: {

    ajax (index, callback) {
      let self = this;
      self.axios({
        method : 'GET',
        url    : self.api_order,
        params : {
          store_id  : self.$user.get().data.store_info.id,
          type      : self.curType,
          keyword   : self.keyword,
          page      : self.states[index].curPage,
        }
      }).then((res) => {
        // console.log(res);
        // setTimeout(function () {
        if ('success' === res.state) {
          if (0 >= res.data.length) {
            self.states[index].noContent = true;
          }
          if ('refresh' === self.action) {
            self.$set(self.items, index, res.data.data);
          }
          if ('infinite' === self.action) {
            self.$set(self.items, index, self.items[index].concat(res.data.data));
          }
          // console.log('卖家中心order');
          // console.log(self.items);
          self.$set(self.states[index], 'pageCount', res.data.last_page);
          self.$set(self.states[index], 'itemCount', res.data.total);
        }
        if (callback && 'function' === typeof callback) {
          callback();
        }
        // }, 1000);
      });
    },
    /*切换tab*/
    switchTabs (index) {
      let self = this;
      this.tabActive = index;
      if (0 >= this.items[index].length) {
        this.ajax(index, function () {
          if (0 >= self.states[index].itemCount) {
            self.$set(self.states[index], 'noContent', true);
          }
          else {
            self.$set(self.states[index], 'noContent', false);
          }
        });
      }
    },
    /*上拉刷新*/
    refresh (done) {
      this.action = 'refresh';
      this.states[this.tabActive].curPage = 1;
      this.ajax(this.tabActive);
      done();
    },
    /*下拉加载*/
    infinite (done) {
      this.action = 'infinite';
      if (this.states[this.tabActive].curPage >= this.states[this.tabActive].pageCount) {
        done(true);
      }
      else {
        this.states[this.tabActive].curPage += 1;
        this.ajax(this.tabActive);
        done();
      }
    },
    /*搜索提交*/
    searchSubmit () {
      let self = this;
      if ('' !== this.keyword) {
        this.states[0].curPage = 1;
        this.items[0] = [];
        if (0 !== this.tabActive) {
          this.tabsSwiper.slideTo(0);
        }
        else {
          this.tabActive = 0;
          this.ajax(0);
        }
      }
      else {
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          active: true,
          customClass : 'dialog_seller',
          title : '',
          msg   : '请输入要搜索的关键字！',
          lists : [
            {
              msg: '取消',
            },
            {
              msg: '确定',
              func () {
                self.$refs.search.focus();
              }
            },
          ]
        });
      }
    },
  }
};