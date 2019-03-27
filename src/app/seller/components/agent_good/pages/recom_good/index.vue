<template>
	<div class="listGood">
		<scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" :active="itemGoods" ref="swiperObj" off-height="8.2">
			<section v-for="(item, index) in itemGoods" v-bind:key="index" ref="swiperGoods">
				<ul class="swiper-wrapper">
					<router-link :to="{name:'home.Info', params:{id:item2.goods_id}}" class="swiper-slide" v-for="(item2, index2) in item.goods_list" v-bind:key="index2">
						<div class="img"><img v-lazy="item2.goods_thumb" /></div>
						<p v-text="item2.goods_name"></p>
						<span>￥{{item2.shop_price}}</span>
					</router-link>
				</ul>
			</section>
		</scroller>
		<app-gotop :swiperObj="swiperObj" :watch="itemGoods"></app-gotop>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>