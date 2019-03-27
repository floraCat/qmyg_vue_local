import './index.scss';

import Swiper from 'swiper';
import  'swiper/dist/css/swiper.css';

import MainContent       from '../../components/main_content';
import Gotop             from '~common/components/gotop';

export default {
  components: {
    'app-main-content'   : MainContent,
    'app-gotop'          : Gotop,
  },
  data () {
    return {
      tabOn : 0,
      tabsSwiper : null
    };
  },
  computed: {
  },
  mounted () {
    let self = this;
    /*swiper实例*/
    const tabsSwiper = new Swiper(this.$refs.swiperX, {
      speed: 100,
      noSwiping: true,
      autoHeight: true,
      onSlideChangeStart: function () {
        self.tabOn = tabsSwiper.activeIndex;
      }
    });
    this.tabsSwiper = tabsSwiper;
  },
  methods: {
    switchTabs (ev, index) {
      this.tabOn = index;
      this.tabsSwiper.slideTo(index);
    }
  }
};