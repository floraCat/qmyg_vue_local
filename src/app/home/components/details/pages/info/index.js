import './index.scss';

import Banner            from '../../components/banner';
import MainContent       from '../../components/main_content';
import MaskClose         from '~common/components/mask_close';
import Share             from '../../components/share';
import Bean              from '../../components/bean';
import BeanDesc          from '../../components/bean_desc';
import ServiceDesc       from '../../components/service_desc';
import AddressSelect     from '~common/components/address_select';
import GoodSelect        from '../../components/good_select';
import Sidebar           from '../../components/sidebar';
import QRcode            from '../../components/QRcode';
import SessionStorage    from '~common/services/sessionStorage.cookie';

export default {
  components: {
    /*大图轮播*/
    'app-banner'         : Banner,
    /*商品图文*/
    'app-main-content'   : MainContent,
    /*覆盖层2*/
    'app-mask-close'     : MaskClose,
    /*分享弹窗*/
    'app-share'          : Share,
    /*易购豆*/
    'app-bean'           : Bean,
    /*易购豆提现*/
    'app-bean-desc'      : BeanDesc,
    /*售后说明*/
    'app-service-desc'   : ServiceDesc,
    /*地址选择*/
    'app-address-select' : AddressSelect,
    /*商品选择*/
    'app-good-select'    : GoodSelect,
    /*侧栏*/
    'app-sidebar'        : Sidebar,
    /*二维码生成*/
    'app-qrcode'         : QRcode,
  },
  data () {
    return {
      /*是否关闭公告*/
      openNote : true,
      /*是否显示悬浮头部*/
      showFixHead : false,
      /*最新下单信息*/
      infoLatest : {},
      /*是否显示最新下单信息*/
      showLatest : false,
      /*多少秒前下的单*/
      secondBefore : 0,
      /*同类商品*/
      itemsSameGoods : [],
      /*是否加载正文*/
      showMainContent : false,
      /*覆盖层*/
      detailMask : false,

      /*弹窗显隐*/
      activeShare : false,
      activeBean : false,
      activeBeanDesc : false,
      activeGoodSelect : false,
      activeServiceDesc : false,
      activeSidebar : false,

      /*mask层叠数状态*/
      maskUp : false,
      /*是否定位的默认地址*/
      addrChangeFirst : false,
    };
  },
  computed: {
    /*商品数据api*/
    api_detail () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getGoodsDetail.json`;
    },
    /*收藏提交api*/
    api_save () {
      return '/user/v100/Collect/CollectGoods';
    },
    /*最新订单提示api*/
    api_orderTip () {
      return `${window.API_DOMAIN}/api/orderTip.json`;
    },
    /*同类商品api*/
    api_goods_same () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getSameGoodsList.json`;
    },
    /*加入购物车数量*/
    api_cartNum () {
      return `${window.API_DOMAIN}/api/order/v100/cart/cartNumber.json`;
    },
    /*加入购物车*/
    api_add_cart () {
      return `${window.API_DOMAIN}/api/order/v100/cart/addCartGoods.json`;
    },
    /*代理商品*/
    api_agent () {
      return '/user/v100/Seller/agentGoods';
    },
    /*商品数据*/
    goodData () {
      return this.$store.get.state.Info.goodData;
    },
    /*是否缺货*/
    outOfStock () {
      return this.$store.get.state.Info.outOfStock;
    },
    /*当前选择的商品数据*/
    curPrice () {
      return this.$store.get.state.GoodSelect.curPrice;
    },
    /*已选商品数量*/
    numGood () {
      return this.$store.get.state.GoodSelect.numGood;
    },
    /*已选商品规格*/
    curAttrsTxt () {
      return this.$store.get.state.GoodSelect.curAttrsTxt;
    },
    /*购物车商品总数*/
    cartSum () {
      return this.$store.get.state.Info.cartSum;
    },
    /*是否显示已加入购物车提示*/
    showAddCart () {
      return this.$store.get.state.Info.showAddCart;
    },
    /*是否显示一条评论*/
    showOneComment () {
      return this.goodData.comment_list && this.goodData.comment_list.data && this.showMainContent ? true : false;
    },
    // 地区
    prov () {
      return {
        id: this.$store.get.state.AddressSelect.filterAddr.province || '',
        name: this.$store.get.state.AddressSelect.filterAddr.prov_name || '',
      };
    },
    city () {
      return {
        id: this.$store.get.state.AddressSelect.filterAddr.city || '',
        name: this.$store.get.state.AddressSelect.filterAddr.city_name || '',
      };
    },
    area () {
      return {
        id: this.$store.get.state.AddressSelect.filterAddr.district || '',
        name: this.$store.get.state.AddressSelect.filterAddr.district_name || '',
      };
    },
    address () {
      return `${this.prov.name}${this.city.name}${this.area.name}` || '请选择所在地区';
    },
  },
  watch: {
    curPrice () {
      /*缺货状态*/
      let outOfStock = this.$store.get.state.GoodSelect.curPrice.goods_number ? false : true;
      this.$store.get.commit({ type : 'outOfStock', outOfStock : outOfStock });
    },
    address () {
      if (!this.addrChangeFirst) {
        this.addrChangeFirst = true;
      }
      else {
        // 选择地址后重新请求价格
        this.$refs.goodSelect.setCurPrice();
      }
    }
  },
  mounted () {
    //清缓存test
    //localStorage.clear();
    // console.log('localStorage');
    // console.log(localStorage);
    this.getGoodData();
    this.getCartNum();
    this.lastOrderNotice();
    this.getGoodsSame();
    this.watchScroll();
  },
  methods: {
    /*请求商品数据*/
    getGoodData () {
      let self = this;
      let userId = self.$user.get().data ? self.$user.get().data.user_id : '';
      self.axios({
        method    : 'GET',
        url       : self.api_detail,
        params    : {
          goodsId : self.$route.params.id,
          userId : userId
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.$store.get.commit({type:'goodData', goodData:res.data});
        }
      });
    },
    /*请求购物车数量*/
    getCartNum () {
      let self = this;
      self.axios({
        method  : 'GET',
        url     : self.api_cartNum,
        params  : {
          user_id : self.$user.get().data ? self.$user.get().data.user_id : ''
        }
      }).then((res) => {
        if ('success' === res.state) {
          this.$store.get.commit({ type: 'cartSum', cartSum: res.data.cart_number});
        }
      });
    },
    /*滚动监听*/
    watchScroll () {
      let self = this;
      // 正文dom滚动高度
      let dist = self.$refs.noteMainContent.offsetTop - document.documentElement.clientHeight;
      window.onscroll = function () {
        let sTop = document.body.scrollTop + document.documentElement.scrollTop;
        /*滚动到一定距离加载正文*/
        if (sTop > dist + 100) {
          setTimeout(function () {
          self.showMainContent = true;
        }, 1000);
        }
        /*滚动到一定距离显隐悬浮头部*/
        if (50 < document.body.scrollTop ) {
          self.showFixHead = true;
        }
        else {
          self.showFixHead = false;
        }
      };
    },
    /*随机显示最新下单信息*/
    lastOrderNotice () {
      let self = this;
      self.axios({
        method : 'GET',
        url    : self.api_orderTip,
        data   : {}
      }).then((res) => {
        //if ('success' === res.state) {
          self.infoLatest = res.data;
          let showOrNot = false;
          let chance = Math.random() * 100;
          if (40 >= chance) {
            showOrNot = true;
          }
          window.addEventListener('scroll', winScroll);
          function winScroll () {
            let dist = document.body.scrollTop;
            /*下单信息*/
            if (90 < dist) {
              self.showLatest = showOrNot;
              self.secondBefore = Math.ceil(Math.random() * 50);
              let sto = setInterval(function () {
                self.secondBefore ++;
              }, 1000);
              window.removeEventListener('scroll', winScroll);
              setTimeout(function () {
                showOrNot = false;
                self.showLatest = false;
                clearInterval(sto);
              }, 6000);
            }
          }
        //}
      });
    },
    /*收藏*/
    saveHandle () {
      let self = this;
      if (this.$user.get().data) {
        let op = self.goodData.is_collected ? 'del' : 'add';
        self.axios({
          method:'POST',
          url:self.api_save,
          data:{
            op : op,
            user_id : self.$user.get().data.user_id,
            goods_id : self.goodData.goods_id
          }
        }).then( (res) => {
          if ('success' === res.state) {
            self.goodData.is_collected = !self.goodData.is_collected;
          }
        });
      }
      else {
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          active: true,
          customClass : 'dialog_agent',
          msg   : '请登录后收藏该商品',
          lists : [
            {
              msg: '取消',
            },
            {
              msg: '立即登录',
              func () {
                self.$router.push({name:'welcome.Login'});
              }
            },
          ]
        });
      }
    },
    /*地址选择*/
    addrSel () {
      this.$store.get.commit({ type: 'openAddr', openAddr: true, stateKey: 'AddressSelect'});
      this.$store.get.commit({ type: 'showMask', showMask: true, stateKey: 'MaskClose'});
    },
    /*关闭所有弹窗*/
    closeAll () {
      this.detailMask = false;
      this.activeShare = false;
      this.activeBean = false;
      this.activeBeanDesc = false;
      this.activeGoodSelect = false;
      this.activeServiceDesc = false;
      this.activeSidebar = false;
      this.$store.get.commit({ type: 'openAddr', openAddr: false, stateKey: 'AddressSelect'});
    },
    /*关闭公告*/
    closeNote () {
      this.openNote = false;
    },
    /*分享*/
    openShare () {
      this.activeShare = true;
      this.detailMask = true;
    },
    closeShare () {
      this.activeShare = false;
      this.detailMask = false;
    },
    /*易购豆*/
    openBean () {
      this.activeBean = true;
      this.detailMask = true;
      if (this.activeGoodSelect) {
        this.maskUp = true;
      }
    },
    closeBean () {
      this.activeBean = false;
      if (this.activeGoodSelect) {
        this.maskUp = false;
      }
      else {
        this.detailMask = false;
      }
    },
    /*易购豆提现*/
    openBeanDesc () {
      this.activeBeanDesc = true;
      this.detailMask = true;
    },
    /*二维码生成*/
    creatQRcode () {
      this.$store.get.commit({ type: 'creatQRcode', creatQRcode: true, stateKey: 'QRcode'});
    },
    /*规格选择*/
    openGoodSelect () {
      this.activeGoodSelect = true;
      this.detailMask = true;
    },
    closeGoodSelect () {
      this.activeGoodSelect = false;
      this.detailMask = false;
    },
    /*售后说明*/
    openServiceDesc () {
      this.activeServiceDesc = true;
      this.detailMask = true;
    },
    closeServiceDesc () {
      this.activeServiceDesc = false;
      this.detailMask = false;
    },
    /*侧栏*/
    openSidebar () {
      // if (!this.$user.get().data) {
      //   this.$router.push({name:'welcome.Login'});
      // }
      // else {
        SessionStorage.set('userInfo', {
          user_picture:'http://localhost:8033/images/a1.jpg',
          user_name: 'xxx',
          is_activate: true
        }, 60 * 60);

        this.activeSidebar = true;
        this.detailMask = true;
        document.body.scrollTop = 0;
      // }
    },
    closeSidebar () {
      this.activeSidebar = false;
      this.detailMask = false;
    },
    /*同类商品*/
    getGoodsSame () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_goods_same,
        params:{
          goods_id : self.$route.params.id
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.itemsSameGoods = res.data.data;
        }
      });
    },
    /*到货通知*/
    noticeStock () {
      this.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        customClass : 'dialog_agent',
        msg   : '如果30天内到货，\n会通知消息中心通知您',
        lists : [
          {
            msg: '知道了',
          },
        ]
      });
    },
    /*我要代理*/
    handleAgent () {
      let self = this;
      let shopId = this.$user.get().data ? this.$user.get().data.store_info.id : false;
      let isAgent = this.$store.get.state.Info.goodData.is_agent;
      if (shopId) {
        if (isAgent) {
          self.$store.get.dispatch({
            type  : 'handleChangeDialog',
            active: true,
            customClass : 'dialog_agent',
            msg   : '此商品你已经代理过了~',
            lists : [
              {
                msg: '知道了',
              }
            ]
          });
          return;
        }
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          active: true,
          customClass : 'dialog_agent',
          msg   : '您是否要代理此商品？',
          lists : [
            {
              msg: '取消',
            },
            {
              msg: '代理',
              func () {
                self.submitAgent();
              }
            },
          ]
        });
      }
      else {
        this.$router.push({ name : 'welcome.Login'});
      }
    },
    /*代理提交*/
    submitAgent () {
      let self = this;
      self.axios({
        method: 'POST',
        url: self.api_agent,
        data: {
          goods_ids:self.goodData.goods_id,
          store_id: self.$user.get().data.store_info.id,
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.$store.get.dispatch({
            type  : 'handleChangeDialog',
            active: true,
            customClass : 'dialog_agent',
            msg   : '代理成功，是否前往查看？',
            lists : [
              {
                msg: '取消',
              },
              {
                msg: '去看看',
                func () {
                  self.$router.push({name: 'seller.InSale'});
                }
              }
            ]
          });
        }
      });
    },
    /*加入购物车*/
    addCart () {
      let self = this;
      let eleFlyElement = document.querySelector('#flyItem'),
          eleShopCart = document.querySelector('.pCart');
      // 抛物线运动
      let myParabola = this.funParabola(eleFlyElement, eleShopCart, {
          //抛物线速度
          speed: 25,
          //控制抛物线弧度
          curvature: 0.008,
          complete: function () {
              eleFlyElement.style.visibility = 'hidden';
              self.$refs.goodSelect.addCart();
              myParabola = null;
          }
      });
      if (eleFlyElement && eleShopCart) {
        // 滚动大小
        let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        eleFlyElement.style.left = event.clientX + scrollLeft + 'px';
        eleFlyElement.style.top = event.clientY + scrollTop + 'px';
        eleFlyElement.style.visibility = 'visible';
        // 需要重定位
        myParabola.position().move();
      }
    },
    /*加入购物车抛物线*/
    funParabola (e, t, i) {
      let n = {
          speed: 166.67,
          curvature: 0.001,
          progress: function () {},
          complete: function () {}
      }, s = {};
      i = i || {};
      for (let a in n) {
        s[a] = i[a] || n[a];
      }
      let o = {
          mark: function () {
              return this;
          },
          position: function () {
              return this;
          },
          move: function () {
              return this;
          },
          init: function () {
              return this;
          }
      },
      r = 'margin',
      l = document.createElement('div');
      'oninput' in l && ['', 'ms', 'webkit'].forEach(function (e) {
          let t = e + (e ? 'T' : 't') + 'ransform';
          t in l.style && (r = t);
      });
      let c = s.curvature, d = 0, h = !0;
      if (e && t && 1 === e.nodeType && 1 === t.nodeType) {
          let u = {}, p = {}, f = {}, m = {}, g = {}, v = {};
          o.mark = function () {
              return 0 === h ? this : ('undefined' === typeof g.x && this.position(), e.setAttribute('data-center', [g.x, g.y].join()), t.setAttribute('data-center', [v.x, v.y].join()), this);
          },
          o.position = function () {
              if (0 === h) {
                return this;
              }
              let i = document.documentElement.scrollLeft || document.body.scrollLeft,
              n = document.documentElement.scrollTop || document.body.scrollTop;
              'margin' === r ? e.style.marginLeft = e.style.marginTop = '0px' : e.style[r] = 'translate(0, 0)',
              u = e.getBoundingClientRect(),
              p = t.getBoundingClientRect(),
              f = {
                  x: u.left + (u.right - u.left) / 2 + i,
                  y: u.top + (u.bottom - u.top) / 2 + n
              },
              m = {x: p.left + (p.right - p.left) / 2 + i, y: p.top + (p.bottom - p.top) / 2 + n},
              g = {
                  x: 0,
                  y: 0
              },
              v = {x: -1 * (f.x - m.x), y: -1 * (f.y - m.y)},
              d = (v.y - c * v.x * v.x) / v.x;
              return this;
          },
          o.move = function () {
              if (0 === h) {
                return this;
              }
              let t = 0,
              i = 0 < v.x ? 1 : -1,
              n = function () {
                  let a = 2 * c * t + d;
                  t += i * Math.sqrt(s.speed / (a * a + 1)), (1 === i && t > v.x || -1 === i && t < v.x) && (t = v.x);
                  let o = t, l = c * o * o + d * o;
                  e.setAttribute('data-center', [Math.round(o), Math.round(l)].join()), 'margin' === r ? (e.style.marginLeft = o + 'px', e.style.marginTop = l + 'px') : e.style[r] = 'translate(' + [o + 'px', l + 'px'].join() + ')', t !== v.x ? (s.progress(o, l), window.requestAnimationFrame(n)) : (s.complete(), h = !0);
              };
              window.requestAnimationFrame(n), h = !1;
              return this;
          },
          o.init = function () {
              this.position().mark().move();
          };
      }
      return o;
    },
  },
};