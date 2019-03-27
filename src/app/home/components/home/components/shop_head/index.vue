<template>
  <div class="pShopHead">
    <section class="top">
      <div class="img">
        <img v-lazy="shopInfo.shop_logo" />
      </div>
      <h2 v-text="shopInfo.shop_name"></h2>
      <i class="i1"></i>
      <i class="i2"></i>
      <span>全民易购<br />官方认证</span>
    </section>
    <section class="notes">
      <i class="icon icon-edit"></i>
      <div class="slides swiper-scroll" ref="swiperNote">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">小店特色：商品正价格低</li>
          <li class="swiper-slide">店家留言：有您的关照，我会更有信心</li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>