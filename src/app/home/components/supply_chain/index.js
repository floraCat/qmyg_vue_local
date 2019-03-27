import './index.scss';

import Title        from '~common/components/title';

export default {
  name: 'supply_chain',
  data () {
    return {
      gifFirst: false,
      gifFirsts: false,
      gifSec: [],
      gifThird: [],
      gifForth: [],
      flagSec: true,
      flagThird: true,
      flagForth: true,
      mySet: {},
      mySets: {},
      myMove: {},
      myMoves: {},
      myForth: {},
      myForths: {},
    };
  },
  computed: {
  },
  mounted () {
    this.action();
    window.addEventListener('scroll', this.handleScroll);
  },
  components: {
    'app-title':      Title,
  },
  methods: {
    action: function () {
      let self = this;
      setTimeout(function () {
        self.gifFirst = true;
        setTimeout(function () {
          self.gifFirsts = true;
          self.gifFirst = false;
          setTimeout(function () {
            self.gifFirsts = false;
            self.gifFirst = true;
          }, 2000);
        }, 2000);
      }, 500);
    },
    handleScroll: function () {
      let self = this,
          myTop = document.body.scrollTop;
      if (760 < myTop) {
        if (self.flagSec) {
          self.secondGif();
          self.mySets = setTimeout(function () {
            self.secondClear();
            self.secondGif();
          }, 5000);
          self.flagSec = false;
        }
      }
      else {
        self.flagSec = true;
        clearInterval(self.mySet);
        clearTimeout(self.mySets);
        self.secondClear();
      }
      if (1350 < myTop) {
        if (self.flagThird) {
          self.thirdGif();
          self.myMoves = setTimeout(function () {
            self.thirdClear();
            self.thirdGif();
          }, 2200);
          self.flagThird = false;
        }
      }
      else {
        self.flagThird = true;
        clearInterval(self.myMove);
        clearTimeout(self.myMoves);
        self.thirdClear();
      }
      if (1820 < myTop) {
        if (self.flagForth) {
          self.forthGif();
          self.myForths = setTimeout(function () {
            self.forthClear();
            self.forthGif();
          }, 2200);
          self.flagForth = false;
        }
      }
      else {
        self.flagForth = true;
        clearInterval(self.myForth);
        clearTimeout(self.myForths);
        self.forthClear();
      }
    },
    secondGif: function () {
      let i = 0,
          self = this;
      self.mySet = setInterval(function () {
        if (12 > i) {
          self.$set(self.gifSec, i, true);
          i ++;
        }
        else {
          return false;
        }
      }, 300);
    },
    thirdGif: function () {
      let i = 0,
          self = this;
      self.myMove = setInterval(function () {
        if (3 > i) {
          self.$set(self.gifThird, i, true);
          i ++;
        }
        else {
          return false;
        }
      }, 300);
    },
    forthGif: function () {
      let i = 0,
          self = this;
      self.myForth = setInterval(function () {
        if (3 > i) {
          self.$set(self.gifForth, i, true);
          i ++;
        }
        else {
          return false;
        }
      }, 300);
    },
    secondClear: function () {
      let self = this;
      for (let i = 0; 12 > i; i ++) {
        self.$set(self.gifSec, i, false);
      }
    },
    thirdClear: function () {
      let self = this;
      for (let i = 0; 3 > i; i ++) {
        self.$set(self.gifThird, i, false);
      }
    },
    forthClear: function () {
      let self = this;
      for (let i = 0; 3 > i; i ++) {
        self.$set(self.gifForth, i, false);
      }
    }
  }
};