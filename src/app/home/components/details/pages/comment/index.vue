<template>
  <div class="eComment">
  	<ul class="tabs">
			<li @click="tabsSwiper.slideTo(0)" :class="{on:tabActive===0}">
				<span>全部评价</span>
				<i v-text="itemsCount[0]"></i>
			</li>
			<li @click="tabsSwiper.slideTo(1)" :class="{on:tabActive===1}">
				<span>好评</span>
				<i v-text="itemsCount[1]">202</i>
			</li>
			<li @click="tabsSwiper.slideTo(2)" :class="{on:tabActive===2}">
				<span>中评</span>
				<i v-text="itemsCount[2]">0</i>
			</li>
			<li @click="tabsSwiper.slideTo(3)" :class="{on:tabActive===3}">
				<span>差评</span>
				<i v-text="itemsCount[3]">0</i>
			</li>
			<li @click="tabsSwiper.slideTo(4)" :class="{on:tabActive===4}">
				<span>有图</span>
				<i v-text="itemsCount[4]">0</i>
			</li>
  	</ul>
  	<div class="bodys" ref="swiperX">
  		<div class="swiper-wrapper">
				<!--全部评价-->
				<section class="swiper-slide" v-for="(_items,index0) in items" v-bind:key="index0">
					<scroller nested="true" :id="'scroller'+index0" :scroller-id="'scroller'+index0" class="list" :on-refresh="refresh" :on-infinite="infinite" :active="_items" off-height="8.2" v-show="!states[index0].noContent" :ref="'swiperObj'+ index0">
						<li v-for="item in _items">
							<div class="info">
								<ol class="stars">
									<i v-for="i in 5"  
										 :class="{'icon-star_fill':i<=item.comment_rank,
										 				'on':i<=item.comment_rank,
										 				'icon-star':i>item.comment_rank}"
									></i>
								</ol>
								<label v-text="item.user_name"></label>
								<span>{{item.add_time}}</span>
							</div>
							<p v-text="item.content"></p>
						</li>
					</scroller>
					<!--没有内容-->
					<div class="noContent" v-show="states[index0].noContent">
						<p>亲，此处没有内容~ ！</p>
						<div class="brand">
							<i class="icon-logo"></i>
							<span>深圳全民易购贸易有限公司</span>
						</div>
					</div>
				</section>
			</div>
  	</div>
  	<app-gotop :swiperObj="curSwiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>