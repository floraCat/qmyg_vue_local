import './index.scss';

import Swiper from 'swiper';

export default {
  name: 'serviceDesc',
  data () {
    return {};
  },
  props:['close'],
  updated () {
    /* eslint-disable */
    new Swiper(this.$refs.eServiceDesc, {
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: !0,
      freeMode: !0,
      observer:true,
    });
    /* eslint-disable */
  },
  methods: {
    /*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    closeServiceDesc () {
      this.close();
    }
  }
};