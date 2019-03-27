<template>
  <div class="eHome">
    <app-header nested="true"></app-header>
    <transition name="transShopHead">
      <!--我的店铺头部fixed-->
      <!-- <app-shop-head class="mShopHead fixed" :class="{gHide:noShop}" v-show="fixedHead"></app-shop-head> -->
    </transition>
    <scroller :on-refresh="refresh" :on-infinite="infinite" :active="scrollerWatch" ref="swiperObj" off-height="3.25">
      <!--幻灯片-->
      <app-banner class="indexBanner" ref="banner"></app-banner>
      <!--我的店铺头部-->
      <app-shop-head class="mShopHead flow" ref="shop_head"></app-shop-head>
      <!--菜单-->
      <app-menu class="indexMenu" ref="menu"></app-menu>
      <!--店铺精选-->
      <app-shop-recom></app-shop-recom>
      <!--广告-->
      <app-act class="indexAct"></app-act>
      <!--品牌推荐-->
      <app-goods-int></app-goods-int>
      <!--热销商品-->
    	<app-layout-topic v-for="(topic, index) in items_topics" :items="topic" v-bind:key="index"></app-layout-topic>
      <!--精品-->
      <app-img-list :api="api_img_list" catId="0"></app-img-list>
    </scroller>
    <app-footer></app-footer>
    <app-gotop :swiperObj="swiperObj" :watch="scrollerWatch"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>