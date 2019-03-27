import './index.scss';

import Swiper   from 'swiper';
import Arrow    from './components/arrow/Arrow.vue';
import Spinner  from './components/spinner/Spinner.vue';

export default {
  name: 'swiper_load',
  components: {
    'app-arrow':Arrow,
    'app-spinner':Spinner
  },
  data () {
    return {
      /*用于单例*/
      first: true,
      /*执行刷新,控制刷新图标停留样式*/
      refleshActive : false,
      /*刷新箭头是否向上*/
      arrowUp: false,
      /*距离底部多少开始加载*/
      dist: 30,
      /*是否没有数据了,控制加载图标和文本样式*/
      isEnd:false,
      /*定时器，方便销毁*/
      setTime: {},
      /*swiper实例对象*/
      swiper : {},
      scrollerDom: {}
    };
  },
  computed: {},
  props: {
    /*可传实例的dom元素ID，针对一个页面调用多次*/
    scrollerId: { type: String, default: ''},
    /*触发监听的对象*/
    active: null,
    onRefresh: Function,
    onInfinite: Function,
    /*自定义刷新文本*/
    refreshText: { type: String, default: '下拉刷新'},
    /*自定义加载完成文本*/
    noDataText: { type: String, default: '没有更多数据了'},
    /*刷新图标停留时间*/
    stayTime: { type: Number, default: 1500},
    /*可视窗口除swiper容器外的区域高度 单位：rem*/
    offHeight: { default: 0},
  },
  mounted () {
    let self = this;
    // 是否自定义了实例的元素
    if ('' !== this.scrollerId) {
      this.scrollerDom = document.getElementById(this.scrollerId);
    }
    else {
      this.scrollerDom = document.querySelector('.eSwiperLoad');
    }
    // 外容器高度
    let clientHeight = document.documentElement.clientHeight;
    let remBase = parseInt(document.documentElement.style.fontSize);
    if (0 !== this.offHeight) {
      this.scrollerDom.style.height = (clientHeight / remBase - this.offHeight) * remBase + 'px';
    }
    else {
      this.scrollerDom.style.height = clientHeight + 'px';
    }
    // 实例一次
    /* eslint-disable */
    this.swiper = new Swiper(this.scrollerDom, {
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: !0,
      freeMode: !0,
      observer:true,
    });
    /* eslint-disable */
    if (this.onRefresh) {
      this.swiper.on('touchMove', self.swiperTouchMove);
      this.swiper.on('touchEnd', self.swiperTouchEnd);
    }
  },
  watch: {
    // 父组件监听到变化时update实例
    active (val) {
      if (!!val) {
        let self = this;
        this.$nextTick(function () {
          self.swiper.update();
          if (0 < val.length) {
            setTimeout(function () {
              // 防止第一屏就显示下拉加载图标
              self.swiper.setWrapperTranslate(self.swiper.translate);
            }, 0);
          }
          if (self.onInfinite) {
            //先取消监听后重新监听，防止同时多次触发
            self.swiper.off('setTranslate', self.swiperSetTrans);
            self.swiper.on('setTranslate', self.swiperSetTrans);
          }
        });
      }
    }
  },
  beforeDestroy () {
    /*销毁定时器*/
    clearTimeout(this.setTime);
  },
  methods:{

    /*touchMove*/
    swiperTouchMove () {
      let self = this;
      let transY = self.swiper.translate;
      let offset = self.swiper.slides[0].offsetHeight;
      // 超出顶部60时调转箭头
      if (60 < transY) {
        self.arrowUp = true;
      }
    },
    /*刷新过渡动画*/
    refleshInterval (stopCondition) {
      let self = this;
      return setInterval(function () {
        let transY2 = parseInt(self.$refs.reflesh.style.marginTop);
        let ispeed = Math.floor( -transY2 / 20);
        if (stopCondition && 'function' === typeof stopCondition) {
          stopCondition(transY2);
        }
        self.$refs.reflesh.style.marginTop = transY2 + ispeed + 'px';
      }, 15);
    },
    /*touchEnd*/
    swiperTouchEnd () {
      let self = this;
      let transY = self.swiper.translate;
      let offset = self.swiper.slides[0].offsetHeight;
      // 上拉刷新
      let done = function () {
        self.setTime = setTimeout(function () {
          let moveTop2 = self.refleshInterval(function (transY2) {
            if (0 >= transY2) {
              clearInterval(moveTop2);
              self.refleshActive = false;
            }
          });
        }, self.stayTime);
      }
      if (60 < transY) {
        self.$refs.reflesh.style.marginTop = transY + 'px';
        let moveTop1 = self.refleshInterval(function (transY2) {
          if (60 >= transY2) {
            clearInterval(moveTop1);
            self.arrowUp = false;
            self.isEnd = false;
            self.refleshActive = true;
            self.onRefresh(done);
          }
        });
      }
    },
    /*滑动时的偏移*/
    swiperSetTrans () {
      let self = this;
      let offset = self.swiper.slides[0].offsetHeight;
      let transY = self.swiper.translate;
      // 下拉加载
      let done = function (boolean = false) {
        if (boolean) {
          setTimeout(function () {
            self.isEnd = true;
          }, 400);
        }
        //取消监听，防止同时多次触发
        self.swiper.off('setTranslate', self.swiperSetTrans);
      }
      if (transY <= - offset + this.swiper.height + this.dist) {
        this.onInfinite(done);
      }
    }
  }
};