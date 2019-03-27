import './index.scss';

import Swiper     from 'swiper';
import  'swiper/dist/css/swiper.css';
import Scroller   from '~common/components/scroller';
import Gotop      from '~common/components/gotop';

export default {
  components: {
    'app-gotop' : Gotop,
    Scroller
  },
  data () {
    return {
      /*列表数组*/
      items       : [],
      /*总数*/
      itemsCount   : [],
      /*各tab列表状态数组*/
      states      : [],
      /*当前下标*/
      tabActive   : 0,
      /*每页加载条数*/
      listRows    : 10,
      /*上拉加载 or 下拉刷新*/
      action      : 'refresh',
      /*水平方向swiper实例*/
      tabsSwiper  : null,
      /*当前swiper对象*/
      curSwiperObj : {}
    };
  },
  computed: {
    api_comment_count () {
      return `${window.API_DOMAIN}/api/comment/v100/index/getCommentTotal.json`;
    },
    api_comment () {
      return `${window.API_DOMAIN}/api/comment/v100/index/getGoodsComments.json`;
      //return `${API_DOMAIN}/getComments.json`;
    },
  },
  created () {
    this.defaultState();
    this.itemsSum();
  },
  mounted () {
    this.newSwiperX();
    /*url传参tabActive*/
    if (this.$route.query.tabActive) {
      this.$parent.active = 3;
      this.tabActive = this.$route.query.tabActive * 1;
      this.tabsSwiper.slideTo(this.tabActive);
    }
  },
  methods: {

    // 默认状态设置
    defaultState () {
      for (let i = 0; 5 > i; i ++) {
        // 初始五个空数组
        this.$set(this.items, i, []);
        this.$set(this.states, i, {
          // 控制没内容样式
          noContent : false,
          // 当前页数
          curPage   : 1,
          // 总页数
          pageCount : 0,
        });
      }
    },

    // 请求评价总数
    itemsSum () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_comment_count,
        params: {
          id : self.$route.params.id,
          type : 0
        }
      }).then((res) => {
        if ('success' === res.state) {
          for (let i in res.data) {
            self.itemsCount.push(res.data[i]);
          }
        }
      });
    },

    ajax (index) {
      let self = this;
      let grade = 3 === index ? 1 : 1 === index ? 3 : index;
      let hasImg = 4 === grade ? true : false;
      self.axios({
        method : 'GET',
        url    : self.api_comment,
        params : {
          type : 0,
          grade: grade,
          has_img: hasImg ? 1 : 0,
          page : self.states[index].curPage,
          id   : self.$route.params.id,
          listRows : self.listRows
        }
      }).then((res) => {
        // console.log(res);
        if ('success' === res.state) {
          if ('refresh' === self.action) {
            self.$set(self.items, index, res.data.data);
          }
          if ('infinite' === self.action) {
            self.$set(self.items, index, self.items[index].concat(res.data.data));
          }
          // console.log(self.items);
          self.states[index].pageCount = res.data.last_page;
        }
      });
    },

    // 水平方向swiper实例
    newSwiperX () {
      let self = this;
      let clientHeight = document.documentElement.clientHeight;
      let remBase = parseInt(document.documentElement.style.fontSize);
      this.$refs.swiperX.style.height = (clientHeight / remBase - 8.125) * remBase + 'px';
      self.tabsSwiper = new Swiper(this.$refs.swiperX, {
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
    },

    /*切换tab*/
    switchTabs (index) {
      this.tabActive = index;
      if (0 >= this.itemsCount[index]) {
        this.$set(this.states[index], 'noContent', true);
      }
      else {
        this.$set(this.states[index], 'noContent', false);
        if (0 >= this.items[index].length) {
          this.ajax(index);
        }
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
    }
  }
};