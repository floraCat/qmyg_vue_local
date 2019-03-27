<template>
  <div class="eSwiperLoad">
  	<div class="swiper-wrapper" >
      <div class="pScroller pReflesh" v-if="onRefresh" ref="reflesh">
        <p :class="{show:!refleshActive}">
          <app-arrow class="arrow" :class="{up:arrowUp}"></app-arrow>
          <span v-text="refreshText" ></span>
        </p>
        <app-spinner :class="{show:refleshActive}"></app-spinner>
      </div>
	  	<div class="swiper-slide" ref="swiperSlide">
	  		<slot></slot>
			</div>
			<div class="pScroller pLoadMore swiper-slide" v-if="onInfinite" ref="pLoadMore">
        <app-spinner :class="{show:!isEnd}"></app-spinner>
	    	<span v-text="noDataText" :class="{show:isEnd}"></span>
	    </div>
		</div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>