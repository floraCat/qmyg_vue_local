<template>
  <div class="eContent">
  	<ul class="tabs">
			<li @touchstart="switchTabs($event,0)" @mousedown="switchTabs($event,0)" :class="{on:tabOn===0}"><span>商品详情</span></li>
			<li @touchstart="switchTabs($event,1)" @mousedown="switchTabs($event,1)" :class="{on:tabOn===1}"><span>规格参数</span></li>
  	</ul>
  	<div class="showBodys" ref="swiperX">
      <div class="swiper-wrapper">
    		<!--商品详情-->
  			<div class="unit swiper-slide">
  				<app-main-content></app-main-content>
  			</div>
  			<!--规格参数-->
  			<div class="unit swiper-slide">
          规格参数正文
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