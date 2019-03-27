import './index.scss';

import _            from 'lodash';
import Swiper       from 'swiper';

import SwiperPage   from '~common/components/swiper';
import PageHead     from '~common/components/page_head';
import Footer       from '~common/components/footer';

import List         from './components/list';

export default {
  name: 'class',
  data () {
    return {
      swiperOption: {
        scrollbar: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
      },
      items: [],
      goodsList: [],
      activeIndex: 0,
      swiperEl: null,
    };
  },
  props: ['api'],
  computed: {
    itemIndex () {
      return this.$store.get.state.Class.Active;
    }
  },
  mounted () {
    this.getMenus();
  },

  components: {
    'app-swiper'    : SwiperPage,
    'app-page-head' : PageHead,
    'app-footer'    : Footer,
    'app-list'      : List,
  },
  methods: {
    getMenus () {
      let self = this;

      self.$store.get.dispatch({
        type: 'Loading',
        Text: '获取数据...',
        isShow: true
      });

      self.axios({
        method: 'GET',
        url: self.api,
      })
      .then((res) => {
        if ('success' === res.state) {
          if (0 < res.data.length) {
            self.items        = res.data;
            self.activeIndex  = self.items[0].cat_id;

            self.getGoodsList();
          }
        }
        else {
          self.$toast(res.desc);
        }

        self.$store.get.dispatch({
          type: 'Loading',
          isShow: false
        });

      });
    },

    getGoodsList () {
      let self = this;
      let data = _.filter(self.items, { cat_id: self.activeIndex });
      self.goodsList = _.get(data[0], 'children');


      self.$nextTick(() => {
        /* eslint-disable */
        self.swiperEl = new Swiper(document.querySelectorAll('.swiper-scroll'), self.swiperOption);
        /* eslint-enable */
      });
    },

    handleState (index) {
      let self = this;

      self.activeIndex = index;
      this.$store.get.dispatch({
        type: 'itemActive',
        Active: self.activeIndex,
      });

      this.getGoodsList();

    },
  }
};