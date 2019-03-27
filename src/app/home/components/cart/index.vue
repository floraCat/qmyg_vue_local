<template>
  <div class="cart-wrapper">
    <app-title title="购物车"></app-title>
    <div class="cart-container">
      <!-- null -->
      <div class="empty" v-if="isEmpty">
        <div class="empty-icon"></div>
        <p>购物车什么也没有</p>
        <router-link :to="{ name: 'home.Home' }" class="e-url">
          <span>去逛逛</span>
        </router-link>
        <div class="empty-goods">
          <p>你可能想要</p>
          <div class="swiper-container-cart" ref="swiperCart">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in emptyLists">
                <div class="empty-goods-item">
                  <router-link :to="{name:'home.Info', params:{id:item.goods_id}}">
                    <img v-lazy="item.goods_thumb" alt="">
                    <div class="e-title">
                      <p>{{ item.goods_name }}</p>
                      <span><em>¥</em>{{ item.shop_price }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- not empty -->
      <div class="not-empty" v-if="!isEmpty">
        <div class="order-lists">
          <div class="order-item" v-for="(item,index) in orderLists" v-if="item.goods_list.length != 0">
            <div class="order-title">
              <!-- on -->
              <div class="icons" :class="{'on':shopGoodsAll[index]}" @click="shopAll(index)">
                <i></i>
              </div>
              <div class="order_num">订单(<span v-text="index+1"></span>)</div>
              <div class="shop-edit" @click="editGoods(index)">
                <i class="icon-edit"></i>
                <span>{{ editText[index] ? '完成' : '编辑' }}</span>
              </div>
            </div>
            <ul class="od-list">
              <li class="od-item" v-for="(goods,i) in item.goods_list">
                <div class="od-icon" :class="{'on':shopGoodsSingle[index][i]}" @click="goodsSelect(index,i)">
                  <i></i>
                </div>
                <div class="od-main">
                  <div>
                    <div class="shop_name">
                      <div class="shop-icon">
                        <i class="icon-shop"></i>
                      </div>
                      <div class="shop-name">
                        <router-link :to="{name: 'seller.ShopIndex'}">
                          <span>{{ goods.shop_name }}</span>
                          <i class="icon-enter"></i>
                        </router-link>
                      </div>
                    </div>
                    <div class="goods-img">
                      <router-link :to="{name : 'home.Info', params : {id : goods.goods_id}}">
                        <img v-lazy="goods.goods_thumb" alt="">
                      </router-link>
                    </div>
                    <div class="goods-content">
                      <div class="g-content">
                        <a href="javascript:" class="g-title">{{ goods.goods_name }}</a>
                        <div class="spec">
                          <span v-html="goods.goods_attr"></span>
                        </div>
                        <div class="price">
                          <span class="pri-cl">¥<em>{{ goods.goods_price }}</em></span>
                          <span class="pri-num">x<em>{{ goods.goods_number }}</em></span>
                        </div>
                        <div class="egd">
                          <span>获易购豆：<em>{{ goods.ygcoin }}</em></span>
                        </div>
                      </div>
                      <!-- on -->
                      <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
                        <div class="g-mask" v-show="editText[index]">
                          <div class="g-num">
                            <div class="g-nbox">
                              <a href="javascript:" class="more" @click="editNum('decrease', goods.rec_id, goods.goods_number, index, i)"></a>
                              <input type="number" :value="goods.goods_number" readonly="readonly">
                              <a href="javascript:" class="adds" @click="editNum('add', goods.rec_id, goods.goods_number, index, i)"></a>
                            </div>
                          </div>
                          <a href="javascript:" @click="delOrder(goods.rec_id, index, i)">删除</a>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <div class="title">推荐商品</div>
          <div class="product-list">
            <ul>
              <li v-for="(item,index) in emptyLists">
                <router-link :to="{name : 'home.Info', params : {id : item.goods_id}}">
                  <div class="product-img">
                    <img v-lazy="item.goods_thumb" alt="">
                  </div>
                  <p>{{ item.goods_name }}</p>
                  <div class="pro-price clearfix">
                    <span class="pro-new">¥<em>{{ item.shop_price }}</em></span>
                    <span class="pro-old">¥<em>{{ item.market_price }}</em></span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="cart-bottom" v-if="!isEmpty">
        <div class="wrapper">
          <div class="all-select" :class="{'on':allSelect}" @click="selectAllShop">
            <i></i>
            <span>全选</span>
          </div>
          <div class="cart-total">
            <div class="total-price">
              <div>合计：<span>¥<em>{{ totalPrice | twofixed }}</em></span></div>
              <span>(不含运费)</span>
            </div>
            <div class="total-ig">
              <span>获易购豆：<em>{{ totalIg | twofixed }}</em></span>
            </div>
          </div>
          <div class="cart-set">
            <a href="javascript:" @click="settlement">结算<span>{{ '(' + totalNumber + ')' }}</span></a>
          </div>
        </div>
      </div>
    </div>
    <app-gotop></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>