import './index.scss';

import Swiper       from 'swiper';

import SwiperPage   from '~common/components/swiper';

export default {
  name: 'payShare',
  data () {
    return {
      swiperOption: {
        scrollbar: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
      },
      switchText: false,
      rows: 1,
      content: '',
      swiperEl: null,
      testW: 14,
      chatList: [
        {
          uid: 1,
          type: 0,
          time: '2017-8-8 15:07:25',
          msg: '单独放一块',
          avatar: '',
        },
        {
          uid: 2,
          type: 0,
          time: '2017-8-8 15:07:25',
          msg: '你上次做的聊天页面',
          avatar: '',
        },
        {
          uid: 2,
          type: 1,
          time: '2017-8-8 15:07:25',
          msg: 'url',
          avatar: '',
        },
      ],
    };
  },
  components: {
    'app-swiper': SwiperPage,
  },
  mounted () {
    let self = this;
    window.aa = self;
    self.$nextTick(() => {
      /* eslint-disable */
      self.swiperEl = new Swiper(document.querySelectorAll('.swiper-scroll'), self.swiperOption);
      self.swiperEl.slideTo(self.$refs.list.children.length, 0, false);
      /* eslint-enable */
    });
  },
  computed: {
  },
  watch: {
    content () {
      let data = this.strlen(this.content) - 1;
      let rows = parseInt(data / 29) + 1;
      let lassTob = this.$refs.content.style.bottom;
      let paddTob = 0;

      if (rows !== this.rows) {
        this.rows = 5 < rows ? 5 : rows;
      }

      switch (this.rows) {
        case 1:
          paddTob = lassTob;
          break;
        case 2:
          paddTob = '5';
          break;
        case 3:
          paddTob = '6.25';
          break;
        case 4:
          paddTob = '7.5';
          break;
        case 5:
          paddTob = '8.75';
          break;
      }

      this.$refs.content.style.bottom = paddTob + 'rem';
      this.swiperEl.update();
      if (lassTob < paddTob) {
        this.swiperEl.slideTo(this.$refs.list.children.length, 0, false);
      }

    }
  },
  methods: {
    handelSwitch () {
      this.switchText = !this.switchText;
    },
    strlen (str) {
      let len = 0;
      for (let i = 0; i < str.length; i ++) {
        let c = str.charCodeAt(i);
        if (0x0001 <= c && 0x007e >= c || 0xff60 <= c && 0xff9f >= c) {
          len ++;
        }
        else {
          len += 2;
        }
      }
      return len;
    }
  }
};