import './index.scss';

import _     from 'lodash';
import Title from '~common/components/title';
import Waiting from '~common/components/waiting';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import QrcodeVue from 'qrcode.vue';

export default {
	name: 'user_extend',
  data () {
    return {
      msg: 'this is extend_code',
      size: 120,
      className: 'extend_qrcode',
      items: [
        {src: '../../../assets/pictures/data_pic_01.jpg'},
        {src: '../../../assets/pictures/data_pic_02.jpg'},
        {src: '../../../assets/pictures/data_pic_03.jpg'},
        {src: '../../../assets/pictures/data_pic_04.jpg'},
        {src: '../../../assets/pictures/data_pic_05.jpg'},
        {src: '../../../assets/pictures/data_pic_06.jpg'}
      ],
      swiperOption: {
        notNextTick: true,
        grabCursor : true,
        setWrapperSize :true,
        pagination : '.extend_select',
        mousewheelControl : true,
        observeParents:true,
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        loop : true,
        paginationClickable: true,
        onTransitionStart () {},
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows : true
        },
      },
      imgNum: 0,
      showBox: false,
      showImg: false,
      imgSrc: '',
      bgPic: new Image(),
      headPic: new Image(),
      logoPic: new Image(),
      received: [],
    };
  },
  components: {
    swiper,
    swiperSlide,
    'app-title': Title,
    'app-wait': Waiting,
    QrcodeVue,
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted () {
    this.swiper.slideTo(3, 1000, false);
    this.getUserInfo();
    this.getPic();
  },
  methods: {
    //获取数据
    getUserInfo () {
      this.received.push({
        url: 'http://www.eggou.com/',
        userImg: _.get(this.$user.get(), 'data.user_picture'),
        userName: _.get(this.$user.get(), 'data.user_name'),
        userType: _.get(this.$user.get(), 'data.user_type'),
        agentCode: `邀请码：${_.get(this.$user.get(), 'data.agent_code')}`,
      });
    },
    //获取背景图片
    getPic: function () {
      return '../../../assets/pictures/base_pic_0' + ( this.swiper.realIndex + 1) + '.jpg';
    },
    //获取图片
    getNum: function () {
      let self = this;
      self.showBox = true;
      self.bgPic.src = self.getPic();
      self.headPic.src = self.received[0].userImg;
      if (!(0 < self.headPic.fileSize || 0 < self.headPic.width && 0 < self.headPic.height)) {
        self.headPic.src = '../../../assets/pictures/qmyg_icon.png';
      }
      self.logoPic.src = '../../../assets/pictures/qmyg_icon.png';
      self.imgLoad();
    },
    //重载页面
    loadPage: function () {
      this.$router.go(0);
    },
    //绘制canvas
    draw: function () {
      let self = this,
          fontY = 928,
          nameY = 1090,
          typeY = 1020,
          picY = 944,
          qrY = 1180,
          fColot = '#ec972a',
          canvas = document.getElementById('canvas'),
          picCanvas = document.getElementById('pic_canvas'),
          fontCanvas = document.getElementById('font_canvas'),
          headCanvas = document.getElementById('head_canvas'),
          qrCanvas = document.getElementById('qr_canvas').getElementsByTagName('canvas')[0],
          ctx = canvas.getContext('2d'),
          pctx = picCanvas.getContext('2d'),
          hctx = headCanvas.getContext('2d');
      switch (self.swiper.realIndex) {
        case 0:
          fontY += 10;
          nameY += 7;
          typeY += 7;
          picY += 7;
          qrY += 7;
          break;
        case 1:
          fontY += 10;
          nameY += 7;
          typeY += 7;
          picY += 7;
          qrY += 7;
          break;
        case 2:
          fontY += 10;
          nameY += 7;
          typeY += 7;
          picY += 7;
          qrY += 7;
          fColot = '#f4c32e';
          break;
        case 5:
          fontY += 12;
          nameY += 12;
          typeY += 11;
          picY += 10;
          qrY += 10;
          break;
        default:
          break;
      }
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      picCanvas.width = picCanvas.offsetWidth * 2;
      picCanvas.height = picCanvas.offsetHeight * 2;
      fontCanvas.width = 180;
      fontCanvas.height = 60;
      headCanvas.width = headCanvas.offsetWidth * 2;
      headCanvas.height = headCanvas.offsetHeight * 2;
      hctx.drawImage(self.headPic, 0, 0, headCanvas.width, headCanvas.height);
      let pattern = pctx.createPattern(headCanvas, 'no-repeat');
      pctx.arc(40, 40, 40, 0, 2 * Math.PI);
      pctx.fillStyle = pattern;
      pctx.fill();
      self.canvasTextAutoLine(self.received[0].userName, fontCanvas, 0, 40, fontCanvas.height, '27px Arial', 'rgb(255,255,255)');
      ctx.drawImage(self.bgPic, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(picCanvas, 223, picY, picCanvas.width, picCanvas.height);
      ctx.drawImage(fontCanvas, 463, fontY);
      ctx.drawImage(qrCanvas, 314, qrY, 200, 200);
      let logoY = qrY + 75;
      ctx.drawImage(self.logoPic, 389, logoY, 50, 50);
      ctx.font = '27px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText(self.received[0].userType, 463, typeY);
      if (2 === self.swiper.realIndex) {
        ctx.fillText('百万级SKU商品', 245, 463);
        ctx.fillText('正品主流行货', 245, 503);
        ctx.fillText('享有平台商品', 245, 630);
        ctx.fillText('全程托管权益', 245, 665);
        ctx.fillText('商品利润70%', 245, 720);
        ctx.fillText('购物立省  卖货立赚', 245, 755);
        ctx.fillText('平台促销特价支持', 245, 808);
        ctx.fillText('帮你引流帮你赚钱', 245, 843);
        ctx.font = '25px Arial';
        ctx.fillText('只要发发朋友圈', 245, 553);
        ctx.fillText('轻松躺赚，时间自由', 245, 586);
      }
      else if (1 !== self.swiper.realIndex) {
        ctx.shadowColor = '#333333';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
      }
      if (0 === self.swiper.realIndex) {
        ctx.fillText('百万级SKU商品', 245, 423);
        ctx.fillText('正品主流行货', 245, 463);
        ctx.font = '25px Arial';
        ctx.fillText('享有平台商品全程托管权益', 465, 565);
        ctx.fillText('只要发发朋友圈', 145, 518);
        ctx.fillText('轻松躺赚', 145, 551);
        ctx.fillText('时间自由', 145, 581);
        ctx.fillText('商品利润70%', 415, 610);
        ctx.fillText('购物立省', 415, 640);
        ctx.fillText('卖货立赚', 415, 670);
        ctx.fillText('平台促销特价支持', 285, 718);
        ctx.fillText('帮你引流帮你赚钱', 285, 753);
      }
      else if (3 === self.swiper.realIndex) {
        ctx.fillText('百万级SKU商品', 558, 490);
        ctx.fillText('正品主流行货', 558, 530);
        ctx.font = '25px Arial';
        ctx.fillText('享有平台商品', 85, 715);
        ctx.fillText('全程托管权益', 85, 755);
        ctx.fillText('只要发发朋友圈', 558, 642);
        ctx.fillText('轻松躺赚，时间自由', 558, 681);
        ctx.fillText('商品利润70%', 120, 563);
        ctx.fillText('购物立省，卖货立赚', 45, 600);
        ctx.fillText('平台促销特价支持', 556, 797);
        ctx.fillText('帮你引流帮你赚钱', 556, 832);
      }
      else if (4 === self.swiper.realIndex) {
        ctx.font = '28px Arial';
        ctx.fillStyle = '#dbb078';
        ctx.fillText('百万级SKU商品', 388, 495);
        ctx.fillText('正品主流行货', 388, 535);
        ctx.fillText('商品利润70%', 415, 685);
        ctx.fillText('购物立省', 470, 725);
        ctx.fillText('卖货立赚', 470, 765);
        ctx.fillText('享有平台商品全程托管权益', 445, 625);
        ctx.fillStyle = '#938052';
        ctx.fillText('只要发发朋友圈', 198, 601);
        ctx.fillText('轻松躺赚', 198, 641);
        ctx.fillText('时间自由', 198, 681);
        ctx.fillText('平台促销特价支持', 96, 737);
        ctx.fillText('帮你引流帮你赚钱', 96, 777);
      }
      else if (5 === self.swiper.realIndex) {
        ctx.font = '28px Arial';
        ctx.fillText('百万级SKU商品正品主流行货', 293, 585);
        ctx.fillText('商品利润70%购物立省，卖货立赚', 293, 701);
        ctx.fillText('享有平台商品全程托管权益', 330, 823);
        ctx.fillText('只要发发朋友圈轻松躺赚，时间自由', 293, 643);
        ctx.fillText('平台促销特价支持帮你引流帮你赚钱', 293, 763);
      }
      ctx.font = '38px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = fColot;
      ctx.fillText(self.received[0].agentCode, 415, nameY);
      self.toImage(canvas);
    },
    //加载图片素材
    imgLoad: function () {
      let canvasTime,
          self = this;
      self.headPic.onload = function () {
        self.imgNum += 1;
      };
      self.bgPic.onload = function () {
        self.imgNum += 1;
      };
      self.logoPic.onload = function () {
        self.imgNum += 1;
      };
      if (3 === self.imgNum) {
        clearTimeout(canvasTime);
        self.draw();
      }
      else {
        canvasTime = setTimeout(function () {
          self.imgLoad();
        }, 500);
      }
    },
    /*
    名字过长控制
    str:要绘制的字符串
    canvas:canvas对象
    initX:绘制字符串起始x坐标
    initY:绘制字符串起始y坐标
    lineHeight:字行高，自己定义个值即可
    */
    canvasTextAutoLine: function (str, canvas, initX, initY, lineHeight, font, cstyle) {
      let ctx = canvas.getContext('2d'),
          lineWidth = 0,
          canvasWidth = canvas.width,
          lastSubStrIndex = 0;
      ctx.font = font;
      ctx.fillStyle = cstyle;
      for ( let i = 0; i < str.length; i ++ ) {
        lineWidth += ctx.measureText(str[i]).width;
        if (lineWidth > canvasWidth - initX * 5) {
        //减去initX,防止边界出现的问题
          ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
          initY += lineHeight;
          lineWidth = 0;
          lastSubStrIndex = i;
        }
        if (i === str.length - 1) {
          ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
        }
      }
    },
    //canvas转图片
    toImage: function (canvas) {
      let self = this,
          type = 'image/png',
          image = new Image();
      image.src = canvas.toDataURL(type);
      let _fixType = function (type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      };
      image.src = image.src.replace(_fixType(type), 'image/octet-stream');
      self.imgSrc = image.src;
      self.showImg = true;
      self.showBox = false;
    }
  }
};