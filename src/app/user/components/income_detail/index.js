import './index.scss';

import Title        from '~common/components/title';
import Footer       from '~common/components/footer';

export default {
	name: 'income_detail',
  data () {
    return {
      msg: 'this is team',
      totalData: [],
      detailData: [],
      time: 'loading...',
      arrival: false,
      noDetail: false,
      state: false,
      canvasFlag: true,
    };
  },
  computed: {
    api_income () {
      return '/user/v100/Account/getIncomeDetails';
    },
    detailApi () {
      return `${this.API_DOMAIN}/user_incomedetail2.json`;
    },
    userData () {
      return this.$user.get().data;
    }
  },
  created () {
    this.ajax();
    this.getTime();
  },
  updated () {
    if (this.canvasFlag) {
      this.drawBg();
      this.drawScale();
      this.drawData();
      this.canvasFlag = false;
    }
  },
  methods: {
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_income,
        params: {
          user_id: 1836
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          self.totalData = res.data;
          self.totalData.totalmoney = 1000;
        }
      });
    },
    getTime: function () {
      let self = this,
      myDate = new Date(),
      myMouth = myDate.getMonth() + 1,
      myDay = myDate.getDate(),
      myYear = myDate.getFullYear(),
      myHours = myDate.getHours(),
      myMin = myDate.getMinutes();
      myHours = 10 > myHours ? '0' + myHours : myHours;
      myDay = 10 > myDay ? '0' + myDay : myDay;
      myMouth = 10 > myMouth ? '0' + myMouth : myMouth;
      myMin = 10 > myMin ? '0' + myMin : myMin;
      self.time = myYear + '-' + myMouth + '-' + myDay + '  ' + myHours + ':' + myMin;
    },
    getData: function () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.detailApi,
        data: {}
      }).then((res) => {
        self.detailData = res;
        if (1 > self.detailData.length) {
          self.noDetail = true;
        }
      });
    },
    drawBg: function () {
      let canvas = document.getElementById('detail_bg'),
      ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#FFF';
      ctx.arc(220, 220, 215, 0.75 * Math.PI, 0.25 * Math.PI);
      ctx.stroke();
    },
    drawScale: function () {
      let canvas = document.getElementById('detail_scale'),
      ctx = canvas.getContext('2d'),
      lines = 100;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      for ( let i = 0; 76 > i; i ++) {
        ctx.beginPath();
        ctx.rotate(Math.PI * 2 / lines);
        if (0 === i % 5) {
          ctx.lineWidth = 3;
          ctx.moveTo(185, 0);
          ctx.lineTo(200, 0);
        }
        else {
          ctx.lineWidth = 2;
          ctx.moveTo(190, 0);
          ctx.lineTo(200, 0);
        }
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }
      ctx.restore();
    },
    drawData: function () {
      let self = this,
          i = 0,
          j = 100,
          data = 0,
          starDeg = 0.75 * Math.PI,
          income = self.totalData.totalmoney;
      if (0 === income) {
        data = 0;
      }
      else if (50 >= income && 0 < income) {
        data = 8;
      }
      else if (100 >= income && 50 < income) {
        data = 24;
      }
      else if (400 >= income && 100 < income) {
        data = 49;
      }
      else if (800 >= income && 400 < income) {
        data = 67;
      }
      else if (800 < income) {
        data = 83;
      }
      self.$store.get.state.Indet.mySet = setInterval(function () {
        if (i < j) {
          i ++;
          let myDeg = i / j * 1.5 * Math.PI + starDeg;
          self.myCanvas(starDeg, myDeg);
        }
        else if (j > data) {
          j --;
          let myDeg = j / 100 * 1.5 * Math.PI + starDeg;
          self.myCanvas(starDeg, myDeg);
        }
      }, 10);
    },
    myCanvas: function (x, y) {
      let canvas = document.getElementById('detail_data'),
          ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#FFF';
      ctx.arc(220, 220, 215, x, y);
      ctx.stroke();
      document.getElementById('detail_video').play();
      document.addEventListener('WeixinJSBridgeReady', function () {
        document.getElementById('detail_video').play();
      }, false);
    },
    refresh (done) {
      let self = this;
      self.canvasFlag = true;
      setTimeout(function () {
        self.state = true;
        self.ajax();
        done();
      }, 1500);
    },
    // infinite (done) {
    //   let self = this;
    //   if (1 <= self.totalData.length) {
    //     setTimeout(() => {
    //       done(true);
    //     }, 1500);
    //     return;
    //   }
    //   setTimeout(function () {
    //     self.state = false;
    //     self.ajax();
    //     done();
    //   }, 1500);
    // }
  },
  components: {
    'app-title'  : Title,
    'app-footer' : Footer,
  }
};