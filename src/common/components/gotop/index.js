
import './index.scss';

export default {
  name: 'gotop',
  data () {
    return {
      /*滚动到多少图标显示*/
      scrollHeight: 600,
      /*是否显示图标*/
      showGoTop : false,
    };
  },
  mounted: function () {
    if (!this.swiperObj) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  props: {
    swiperObj:{ type: Object},
    watch:{}
  },
  watch: {
    watch () {
      let self = this;
      this.swiperObj.update();
      /*监听swiper滚动高度*/
      this.swiperObj.on('setTranslate', function () {
        let tansY = self.swiperObj.translate;
        if (-self.scrollHeight >= tansY) {
          self.showGoTop = true;
        }
        else {
          self.showGoTop = false;
        }
      });
    }
  },
  methods: {
    handleScroll: function () {
      let myTop = document.body.scrollTop;
      if (this.scrollHeight < myTop) {
        this.showGoTop = true;
      }
      else {
        this.showGoTop = false;
      }
    },
    goTop: function () {
      if (this.swiperObj) {
        this.swiperObj.update();
      }
      /*如果有传参swiperObj使用translate实现返回头部，否则用scrollTop*/
      if (this.swiperObj) {
        this.goTopTrans();
      }
      else {
        this.goTopScroll();
      }
    },
    goTopTrans () {
      let self = this;
      let moveTop2 = setInterval(function () {
        let tansY2 = self.swiperObj.translate;
        let ispeed = Math.floor( -tansY2 / 10) + 1;
        if (0 <= tansY2) {
          clearInterval(moveTop2);
          setTimeout(function () {
            self.swiperObj.setWrapperTranslate(0);
          }, 0);
        }
        self.swiperObj.setWrapperTranslate(tansY2 + ispeed);
      }, 10);
    },
    goTopScroll () {
      let moveTop =  setInterval(function () {
        let topNum = document.documentElement.scrollTop || document.body.scrollTop, ispeed = Math.floor( -topNum / 4);
        if (0 === topNum) {
          clearInterval(moveTop);
        }
        document.documentElement.scrollTop = document.body.scrollTop = topNum + ispeed;
      }, 30);
    }
  }
};