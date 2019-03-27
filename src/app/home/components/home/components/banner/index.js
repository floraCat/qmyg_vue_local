import './index.scss';

import Swiper from 'swiper';
import  'swiper/dist/css/swiper.css';

export default {
  name: 'banner',
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 2500,
        grabCursor : true,
        setWrapperSize :true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        mousewheelControl : true,
        observeParents:true,
        loop: true
      },
      items: [],
      refreshCls: false
    };
  },
  computed: {
    api () {
      return `${window.API_DOMAIN}/api/show/v100/Index/getBannerShow.json`;
    }
  },
  mounted () {
    this.ajax();
  },
  methods: {
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url:self.api,
        data:{}
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items = res.data;
          self.$nextTick(function () {
            /* eslint-disable */
            new Swiper(self.$refs.bannerSwiper, self.swiperOption);
            /* eslint-disable */
          });
        }
        this.refreshCls = false;
      });
    },
    refresh () {
      this.refreshCls = true;
      this.ajax();
    }
  }
};