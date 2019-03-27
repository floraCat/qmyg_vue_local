import './index.scss';

import Swiper   from 'swiper';

export default {
  name: 'shopHead',
  data () {
    return {
      shopInfo : {}
    };
  },
  computed: {
    api () {
      return `${window.API_DOMAIN}/api/user/v100/Seller/getStoreInfo.json`;
    }
  },
  mounted () {
    this.getShopInfo();
    // setTimeout(function () {
    this.$nextTick(() => {
      /* eslint-disable */
      new Swiper(document.querySelectorAll('.swiper-scroll'), {
        // scrollbar: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        loop: true,
        autoplay: 2500,
      });
      /* eslint-disable */
    })
    // }, 2000);
  },
  methods: {
    /*请求店铺信息*/
    getShopInfo () {
      let self = this;
      let userId = self.$user.get().data ? self.$user.get().data.user_id : '';
      self.axios({
        method: 'GET',
        url : self.api,
        params: {
          user_id: userId
        }
      }).then((res) => {
        self.shopInfo = res.data;
      });
    }
  }
};