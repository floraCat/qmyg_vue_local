import './index.scss';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'make_img',
  data () {
    return {
      marskBox: true,
      size: 120,
      showImg: false,
      url: window.location.href,
      received: [{
        userName: '希尔瓦娜斯',
        userType: '亡灵首领',
        userImg: '../../../assets/pictures/userPic/userPic_01.jpg',
        url: 'http://www.eggou.com/'
      }],
      imgSrc: '',
      bgPic: new Image(),
      goodsPic: new Image(),
      imgNum: 0,
    };
  },
  computed: {
		creatQRcode () {
			return this.$store.get.state.QRcode.creatQRcode;
		}
  },
  components: {
    QrcodeVue,
  },
  methods: {
    //返回
    backTo: function () {
      this.$store.get.state.QRcode.creatQRcode = false;
    },
    //获取图片
    getImg: function () {
      let self = this,
          goodsImg = document.querySelector('.banner_btn').getElementsByTagName('img')[0];
      self.bgPic.src = '../../../assets/pictures/goods_bg.png';
      self.goodsPic.src = goodsImg.src;
      self.imgLoad();
    },
    drawImg: function () {
      let self = this,
          canvas = document.querySelector('#goods_canvas'),
          tCanvas = document.querySelector('#goods_title_canvas'),
          dCanvas = document.querySelector('#goods_detail_canvas'),
          rCanvas = document.querySelector('#rmb_icon_cavas'),
          sCanvas = document.querySelector('#sale_price_canvas'),
          qrCanvas = document.getElementById('goods_qrcode').getElementsByTagName('canvas')[0],
          ctx = canvas.getContext('2d'),
          titleStr = document.querySelector('.goods_name').innerTEXT + '',
          detailStr = titleStr,
          rmbIcon = '¥',
          salePrice = document.querySelector('.seal_price').innerTEXT + '',
          nEgdou = '0.6',
          bEgdou = '4.2',
          nLeft = 0,
          bLeft = 0;
      switch (nEgdou.length) {
        case 4:
          nLeft = 340;
          break;
        case 5:
          nLeft = 356;
          break;
        case 6:
          nLeft = 368;
          break;
        case 7:
          nLeft = 380;
          break;
        default:
          nLeft = 355;
          break;
      }
      switch (bEgdou.length) {
        case 4:
          bLeft = 315;
          break;
        case 5:
          bLeft = 329;
          break;
        case 6:
          bLeft = 342;
          break;
        case 7:
          bLeft = 356;
          break;
        default:
          bLeft = 355;
          break;
      }
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      tCanvas.width = 700;
      tCanvas.height = 120;
      dCanvas.width = 680;
      dCanvas.height = 160;
      self.cText(titleStr, tCanvas, 0, 90, tCanvas.height, 'bold 90px Arial', 'rgb(51, 51, 51)');
      self.cText(detailStr, dCanvas, 5, 70, dCanvas.height * 0.5, '60px Arial', 'rgb(169, 169, 169)');
      self.cText(rmbIcon, rCanvas, 0, 40, 40, '40px Arial', 'rgb(236, 81, 81)');
      self.cText(salePrice, sCanvas, 0, 50, 50, 'bold 65px Arial', 'rgb(236, 81, 81)');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(self.goodsPic, 130, canvas.height * 0.09 + 25, 500, 500);
      ctx.drawImage(qrCanvas, 0, 0, qrCanvas.width, qrCanvas.height, 470, 710, 220, 220);
      ctx.drawImage(self.bgPic, 0, 0, self.bgPic.width, self.bgPic.height, 0, 0, canvas.width, canvas.height );
      ctx.drawImage(tCanvas, 0, 0, tCanvas.width, tCanvas.height, 30, 670, tCanvas.width * 0.5, tCanvas.height * 0.5);
      ctx.drawImage(dCanvas, 0, 0, dCanvas.width, dCanvas.height, 30, 740, dCanvas.width * 0.5, dCanvas.height * 0.5);
      ctx.drawImage(rCanvas, 30, 870);
      ctx.drawImage(sCanvas, 62, 860);
      ctx.fillStyle = '#333';
      ctx.font = '23px Arial';
      ctx.fillText('普通用户可获', 140, 965);
      ctx.fillText('易购豆', nLeft, 965);
      ctx.fillText('大创客可获', 140, 1005);
      ctx.fillText('易购豆', bLeft, 1005);
      ctx.fillStyle = '#ec5151';
      ctx.font = 'bold 25px Arial';
      ctx.fillText(nEgdou, 285, 965);
      ctx.fillText(bEgdou, 260, 1005);
      // self.toImage(canvas);
      canvas.style.zIndex = '3000';
    },
    //加载图片素材
    imgLoad: function () {
      let canvasTime,
          self = this;
      self.goodsPic.onload = function () {
        self.imgNum += 1;
      };
      self.bgPic.onload = function () {
        self.imgNum += 1;
      };
      if (2 === self.imgNum) {
        clearTimeout(canvasTime);
        self.drawImg();
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
    cText: function (str, canvas, initX, initY, lineHeight, font, cstyle) {
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