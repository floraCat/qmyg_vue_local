<template>
  <div class="eBanner" ref="bannerSwiper" :class="{refresh:refreshCls}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in items" v-bind:key="index">
        <a :href="item.ad_link" class="banner_btn">
          <img :src="item.ad_code">
        </a>
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>