import './index.scss';

import Swiper        from 'swiper';

import Title         from '~common/components/title';
import Gotop         from '~common/components/gotop';

export default {
  name: 'cart',
  data () {
    return {
      swiperOption: {
        scrollbarHide: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        grabCursor: true,
        slidesPerView: 2.5,
      },
      /*商品列表*/
      emptyLists: [],
      /*订单列表*/
      orderLists: [],
      /*编辑标记*/
      editText: [],
      /*本店全选标记*/
      shopGoodsAll: [],
      /*订单长度*/
      orderLen: 0,
      /*单选标记*/
      shopGoodsSingle: [],
      /*总全选标记*/
      allSelect: false,
      /*判断购物车是否为空*/
      isEmpty: false,
      /*合计总价格*/
      totalPrice: 0,
      /*合计总数量*/
      totalNumber: 0,
      /*合计易购豆*/
      totalIg: 0.00,
    };
  },
  computed: {
    api_empty_goods () {
      return `${window.API_DOMAIN}/api/goods/v100/index/getGoodses.json`;
    },
    api_cart_orders () {
      return `${window.API_DOMAIN}/api/order/v100/cart/getCartList.json`;
    },
    api_update () {
      //return `${this.API_DOMAIN}/test.json`;
      return '/order/v100/cart/updateCartGoods';
    },
    api_del () {
      //return `${this.API_DOMAIN}/test.json`;
      return '/order/v100/cart/deleteCartGoods';
    },
    api_settle () {
      return '/order/v100/index/checkoutOrder';
    },
  },
  mounted () {
    this.getEmptyGoods();
    this.getOrderList();
  },
  components: {
    'app-gotop'       : Gotop,
    'app-title'       : Title,
  },
  methods: {
    /*获取商品列表*/
    getEmptyGoods () {
      let url  = this.api_empty_goods;
      let self = this;
      self.axios({
        method: 'GET',
        url: url,
      })
      .then((res) => {
        if ('success' === res.state) {
          self.emptyLists = res.data.data;
          setTimeout(function () {
          /* eslint-disable */
          new Swiper(self.$refs.swiperCart, self.swiperOption);
          /* eslint-enable */
        }, 400);
        }
      });
    },
    /*获取订单列表*/
    getOrderList () {
      let self = this;
      let userId = self.$user.get().data ? self.$user.get().data.user_id : '';
      self.axios({
        method: 'GET',
        url: self.api_cart_orders,
        params: {
          user_id:userId
        }
      }).then((res) => {
        if ('success' === res.state) {
          self.orderLen = res.data.length;
          if (0 !== self.orderLen) {
            self.orderLists = res.data;
            for (let i = 0; i < self.orderLists.length; i ++) {
              self.$set(self.shopGoodsSingle, i, []);
            }
          }
          else {
            self.isEmpty = true;
          }
        }
      });
    },
    /*编辑*/
    editGoods (index) {
      this.$set(this.editText, index, !this.editText[index]);
    },
    /*提交更改数量*/
    updateNum (recId, num, callback) {
      let self = this;
      this.axios({
        method: 'POST',
        url: self.api_update,
        params: {
          rec_id : recId,
          number : num,
        }
      }).then((res) => {
        if ('success' === res.state) {
          if (callback && 'function' === typeof callback) {
            callback();
          }
        }
        if ('fail' === res.state) {
          self.$toast(res.desc);
        }
      });
    },
    /*更改数量*/
    editNum (act, recId, num, i1, i2) {
      let self = this;
      let _num;
      if ('add' === act) {
        if (num >= self.orderLists[i1].goods_list[i2].goods_max_number) {
          this.$toast('没有更多商品啦~');
          return;
        }
        _num = num * 1 + 1;
      }
      if ('decrease' === act) {
        if (2 > num ) {
          return;
        }
        _num = num * 1 - 1;
      }
      this.updateNum(recId, _num, function () {
        self.orderLists[i1].goods_list[i2].goods_number = _num;
        self.goodsSelectTotal();
      });
    },
    /*本店全选*/
    shopAll (index) {
      let child = this.shopGoodsSingle[index];
      let flag = this.shopGoodsAll;
      for (let i = 0; i < this.orderLists[index].goods_list.length; i ++) {
        this.$set(child, i, !flag[index]);
      }
      this.$set(this.shopGoodsAll, index, !this.shopGoodsAll[index]);
      this.eachShopAll();
      this.goodsSelectTotal();
    },
    /*本店全选遍历*/
    eachShopAll () {
      for (let i = 0; i < this.orderLen; i ++ ) {
        if (!this.shopGoodsAll[i]) {
          this.allSelect = false;
          return false;
        }
      }
      this.allSelect = true;
    },
    /*本店单选*/
    goodsSelect (index, i) {
      let flag = this.shopGoodsSingle;
      if (flag[index][i]) {
        this.$set(this.shopGoodsAll, index, false);
      }
      this.$set(this.shopGoodsSingle[index], i, !this.shopGoodsSingle[index][i]);
      if (this.shopGoodsSingle[index][i]) {
        this.eachGoodsSelect(this.shopGoodsSingle[index], index);
      }
      this.eachShopAll();
      this.goodsSelectTotal();
    },
    /*本店单选遍历*/
    eachGoodsSelect (goods, index) {
      let len = this.orderLists[index].goods_list.length;
      for (let i = 0; i < len; i ++) {
        if (!goods[i]) {
          return false;
        }
      }
      this.$set(this.shopGoodsAll, index, true);
    },
    /*本店单选合计*/
    goodsSelectTotal () {
      this.totalPrice = 0.00;
      this.totalNumber = 0;
      this.totalIg = 0.00;
      for (let i = 0; i < this.orderLen; i ++ ) {
        for (let j = 0; j < this.orderLists[i].goods_list.length; j ++) {
          if ( this.shopGoodsSingle[i][j] ) {
            this.totalPrice += this.orderLists[i].goods_list[j].goods_price * this.orderLists[i].goods_list[j].goods_number;
            this.totalNumber += this.orderLists[i].goods_list[j].goods_number;
            this.totalIg += this.orderLists[i].goods_list[j].ygcoin * this.orderLists[i].goods_list[j].goods_number;
          }
        }
      }
    },
    /*全选*/
    selectAllShop () {
      this.allSelect = !this.allSelect;
      for (let j = 0; j < this.orderLen; j ++) {
        this.$set(this.shopGoodsAll, j, this.allSelect);
        for (let i = 0; i < this.orderLists[j].goods_list.length; i ++) {
          this.$set(this.shopGoodsSingle[j], i, this.allSelect);
        }
      }
      this.goodsSelectTotal();
    },
    /*删除订单*/
    delOrder (recId, index, i) {
      let self = this;
      if (confirm('真的要删除吗?')) {
        this.axios({
          method: 'POST',
          url: self.api_del,
          params: {
            rec_id : recId,
          }
        }).then((res) => {
          if ('success' === res.state) {
            this.orderLists[index].goods_list.splice(i, 1);
            this.shopGoodsSingle[index].splice(i, 1);
            if ( 0 === this.orderLists[index].goods_list.length ) {
              this.orderLists.splice(index, 1);
              this.shopGoodsAll.splice(index, 1);
              this.shopGoodsSingle.splice(index, 1);
              this.editText.splice(index, 1);
              this.orderLen = this.orderLists.length;
            }
            if ( 0 === this.orderLists.length ) {
              this.isEmpty = !this.isEmpty;
              this.$nextTick( () => {
                /* eslint-disable */
                new Swiper('.swiper-container-cart', self.swiperOption);
                /* eslint-enable */
              });
            }
            this.goodsSelectTotal();
          }
        });
      }
    },
    /*结算*/
    settlement () {
      if ( 0 === this.totalNumber ) {
        this.$toast('至少选中一个商品');
        return false;
      }
      let self = this;
      let goods = self.shopGoodsSingle;
      let list = [];
      for (let i = 0; i < goods.length; i ++) {
        for (let j = 0; j < goods[i].length; j ++) {
          if ( true === goods[i][j] ) {
            list.push(this.orderLists[i].goods_list[j].rec_id);
          }
        }
      }
      // alert('您选中了' + list.length + '个商品，商品rec_id分别是：' + list.join(','));
      self.$router.push({name: 'user.Flow', query: {cart_value: list.join(',')}});
    },
  },
  filters: {
    twofixed (value) {
      return value ? value : '0.00';
    },
  },
};