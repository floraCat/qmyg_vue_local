import './index.scss';

import Title from '~common/components/title';

export default {
  name: 'activityRecruit',
  data () {
    return {
      income: 8543,
      yigoud: 5100,
      extract: 5750,
      scrollTop: 0,
      isScroll :false,
    };
  },
  components: {
    'app-title': Title
  },
  mounted () {
    this.random();
    this.getScrollTop();
  },
  computed: {
  },
  methods: {
    random () {
      let maxIncome   = 8643;
      let maxYigoud   = 5322;
      let maxExtract  = 6032;

      this.randomAdd(maxIncome, 'income');
      this.randomAdd(maxYigoud, 'yigoud');
      this.randomAdd(maxExtract, 'extract');
    },
    randomAdd (num, itme) {
      let self = this;
      let t = setInterval(function () {
        if (num > self[itme]) {
          self[itme] += 1;
        }
        else {
          clearInterval(t);
        }
      }, 10);
    },

    getScrollTop () {
      let self = this;
      window.onscroll = function () {
        if (false === self.isScroll) {
          self.isScroll = true;
          setTimeout(function () {
            // let t = document.documentElement.scrollTop || document.body.scrollTop;
            self.isScroll = false;
          }, 500);
        }

      };
    }

  }
};