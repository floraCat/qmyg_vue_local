import './index.scss';
import Swiper from 'swiper';
import  'swiper/dist/css/swiper.css';

export default {
  name: 'banner',
  data () {
    return {
      fixedView : false,
      swiperOption: {
        notNextTick: true,
        autoplay: false,
        grabCursor : true,
        setWrapperSize :true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : false,
        observeParents:true,
        loop: false
      },
      curSwiper : 1,
      sumSwiper : 0
    };
  },
  computed: {
    items () {
      return this.$store.get.state.Info.goodData.gallery;
    },
  },
  watch: {
    items () {
      let self =  this;
      this.$nextTick(function () {
        /* eslint-disable */
        new Swiper(this.$refs.bannerSwiper, this.swiperOption);
        /* eslint-disable */
        this.sumSwiper  = this.items.length;
        this.$refs.bannerSwiper.swiper.onTransitionStart = function () {
          self.curSwiper = this.realIndex + 1;
        };
      });
    }
  },
  methods: {
    /*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    clickFixed () {
      this.fixedView = true;
      document.body.style.overflow = 'hidden';
    },
    closeFixed () {
      this.fixedView = false;
      document.body.style.overflow = 'auto';

    }
  }
};