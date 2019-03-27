import './index.scss';

import _ from 'lodash';

import Swiper       from 'swiper';

import SwiperPage   from '~common/components/swiper';

export default {
	name: 'home',
  data () {
    return {
      swiperOption: {
        scrollbar: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        loop: true,
        autoplay: 2500,
      },
      tips   : true,
      imgSrc : '',
      user: {},
    };
  },
  props: ['message'],
  computed: {
    api () {
      return `${this.API_DOMAIN}/user_team1.json`;
    }
  },
	mounted () {
    let self = this;

    self.user = _.get(self.$user.get(), 'data') || {};

    self.$nextTick(() => {
      /* eslint-disable */
      self.swiperEl = new Swiper(document.querySelectorAll('.swiper-scroll'), self.swiperOption);
      /* eslint-enable */
    });

	},
  components: {
    'app-swiper': SwiperPage,
  },
	methods: {
    closeTips () {
      this.tips = false;
    },
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api,
        data: {}
      })
      .then((res) => {
        self.userData = res.data;
        self.loading = false;
        if (1 > self.userData.length) {
          self.noData = true;
        }
        else {
          self.showMain = true;
        }
      });
    },
	}
};