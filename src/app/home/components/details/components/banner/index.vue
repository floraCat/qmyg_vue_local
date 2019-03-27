<template>
	<div class="pSliders" :class="{fixed:fixedView}">
    <div class="main" @click="clickFixed" ref="bannerSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in items" v-bind:key="index">
          <a class="banner_btn">
            <img v-lazy="item">
          </a>
        </div>
      </div>
      <span class="banner_page">
    		<i v-text="curSwiper"></i>/<i v-text="sumSwiper"></i>
    	</span>
    </div>
    <div class="quit icon-close2" @click="closeFixed"></div>
	</div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>