import './index.scss';

import Swiper from 'swiper';

export default {
  name: 'goods_select',
  data () {
    return {
      /*选中的商品（多个）规格数组*/
      attrOn : [],
      attrs  : [],
      curAttr : {},
      /*规格是否已渲染*/
      swiperRuleCreated: false,
    };
  },
  props:['close', 'openBean', 'active'],
  computed: {
    /*当前规格价格*/
    api_price () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getGoodsPrice.json`;
    },
    /*加入购物车*/
    api_add_cart () {
      return `${window.API_DOMAIN}/api/order/v100/cart/addCartGoods.json`;
    },
    goodData () {
      return this.$store.get.state.Info.goodData;
    },
    outOfStock () {
      return this.$store.get.state.Info.outOfStock;
    },
    curAttrsId () {
      return this.$store.get.state.GoodSelect.curAttrsId;
    },
    curAttrsTxt () {
      return this.$store.get.state.GoodSelect.curAttrsTxt;
    },
    curPrice () {
      return this.$store.get.state.GoodSelect.curPrice;
    },
    numGood () {
      return this.$store.get.state.GoodSelect.numGood;
    },
  },
  mounted () {},
  watch: {
    goodData () {
      this.attrs = this.goodData.attrs;
      /*初始规格*/
      let defAttr = '';
      if (0 < this.goodData.attrs.length) {
        defAttr = this.defAttr(this.goodData.attrs);
      }
      this.curAttr = defAttr;
      this.setCurAttr(defAttr);
      this.setCurPrice();
    },
    active () {
      let self = this;
      if (!this.swiperRuleCreated) {
        this.swiperRuleCreated = true;
        this.$nextTick(function () {
          /* eslint-disable */
          new Swiper(self.$refs.swiperObj, {
            scrollbar: !1,
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: !0,
            freeMode: !0
          });
          /* eslint-disable */
        });
      }
    }
  },
  methods: {
    /*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    /*关闭弹窗*/
    closeGoodSelect () {
      this.close();
    },
    _openBean () {
      this.openBean();
    },
    /*默认规格*/
    defAttr (attrs) {
      let self = this;
      let defIds = [];
      let defTxts = [];
      for (let i in attrs) {
        self.$set(self.attrOn, i, []);
        for (let j in attrs[i].data) {
          // 特殊样式的状态默认false
          self.$set(self.attrOn[i], j, false);
        }
        defIds.push(attrs[i].data[0].goods_attr_id);
        defTxts.push(attrs[i].data[0].attr_value);
        self.$set(self.attrOn[i], 0, true);
      }
      let defAttr = {
        ids: defIds,
        txts: defTxts
      };
      return defAttr;
    },
    /*当前规格文本&ids*/
    setCurAttr (curAttr) {
      if (curAttr.txts && 0 < curAttr.txts.length) {
        this.$store.get.commit({ type: 'curAttrsTxt', curAttrsTxt: curAttr.txts.join('、') + '、'});
      }
      if (curAttr.txts && 0 < curAttr.ids.length) {
        this.$store.get.commit({ type:'curAttrsId', curAttrsId: curAttr.ids.join(',')});
      }
    },
    /*当前规格价格*/
    setCurPrice () {
      let self = this;
      let attrStr = this.curAttr.ids ? this.curAttr.ids.join(',') : '';
       self.axios({
        method: 'GET',
        url:self.api_price,
        params:{
          goods_id : self.$route.params.id,
          attr     : self.$store.get.state.GoodSelect.curAttrsId,
          province : self.$store.get.state.AddressSelect.filterAddr.province,
          city     : self.$store.get.state.AddressSelect.filterAddr.city,
          district : self.$store.get.state.AddressSelect.filterAddr.district,
        }
      }).then((res) => {
        if ('success' === res.state) {
          res.data.shipping_fee = !res.data.shipping_fee ? '包邮' : '￥' + res.data.shipping_fee;
          self.$store.get.commit({ type: 'curPrice', curPrice: res.data});
          let outOfStock = res.data.goods_number ? false : true;
          self.$store.get.commit({ type: 'outOfStock', outOfStock: outOfStock});
        }
      });   
    },
    /*减数量*/
    subGood (num) {
      let numGood = 2 > num ? 1 : num - 1;
      this.$store.get.commit({ type: 'numGood', numGood: numGood});
    },
    /*加数量*/
    addGood (num) {
      let sum = this.curPrice.goods_number;
      if (num >= sum) {
        this.$toast("没有更多的商品啦~");
      }
      let numGood = 1 > sum ? 1 : sum > num ? 1 + num : sum;
      if (1 === numGood) {
        this.$toast("没有更多的商品啦~");
      }
      this.$store.get.commit({type: 'numGood', numGood: numGood});
    },
    /*规范选择*/
    ruleSel (_attrId, _attrVal, i1, i2) {
      let self = this;
      /*如已选返回*/
      if (self.attrOn[i1][i2]) {
        return;
      }
      this.curAttr.ids[i1] = _attrId;
      this.curAttr.txts[i1] = _attrVal;
      this.setCurAttr(this.curAttr);
      this.setCurPrice();
      for (let x in self.attrOn[i1]) {
        self.attrOn[i1].splice(x, 1, false);
      }
      // 选中规格attrOn设置true
      self.attrOn[i1].splice(i2, 1, true);
    },
    /*加入购物车*/
    addCart (act) {
      this.closeGoodSelect();
      this.addCartSubmit(act);
    },
    /*加入购物车提交*/
    addCartSubmit (act) {
      let self = this;
      self.axios({
        // method: 'POST',
        method: 'GET',
        url: self.api_add_cart,
        data: {
          goods_id     : self.$route.params.id,
          goods_number : self.$store.get.state.GoodSelect.numGood,
          spec         : self.$store.get.state.GoodSelect.curAttrsId,
          user_id      : self.$user.get().data ? self.$user.get().data.user_id : '',
          sid          : self.$store.get.state.Info.goodData.sid,
          shop_id      : self.$store.get.state.Info.goodData.shop_id,
        }
      }).then((res) => {
        if ('success' === res.state) {
          let cartSum = self.$store.get.state.Info.cartSum * 1 + self.numGood * 1;
          self.$store.get.commit({ type: 'cartSum', cartSum: cartSum});
          self.$store.get.state.GoodSelect.curPrice.goods_number -= self.$store.get.state.GoodSelect.numGood;
          if (0 >= self.$store.get.state.GoodSelect.curPrice.goods_number) {
            self.$store.get.commit({ type: 'outOfStock', outOfStock: true});
          }
          if ('buyNow' === act) {
            setTimeout(function () {
              self.$router.push({name:'user.Flow'});
            }, 0);
          }
          else {
            this.$store.get.commit({ type: 'showAddCart', showAddCart: true, stateKey: 'Info'});
            setTimeout(function () {
              self.$store.get.commit({ type: 'showAddCart', showAddCart: false, stateKey: 'Info'});
            }, 2000);
          }
        }
        if ('fail' === res.state) {
          self.$toast(res.desc);
        }
      });
    }
  }
};