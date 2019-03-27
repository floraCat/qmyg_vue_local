<template>
  <div class="eAddGood">
    <header class="hdAddGood">
			<a class="return icon icon-back" @click="agentBack"></a>
			<h1 v-text="agentTitle"></h1>
    </header>
    <div class="navGood">
			<div class="item first" :class="{active:curCat===-1}">
				<router-link :to="{ name : 'seller.RecomGood'}" replace>
					<div class="img"><img src="https://www.eggou.com/mobile/statics/images/app/nav_super.png" /></div>
					<span>超级精选</span>
				</router-link>
			</div>
			<div class="list" ref="swiperCats">
				<ul class="swiper-wrapper">
					<router-link :to="{name : 'seller.SelectGood', params:{id:item.cat_id}}" class="item swiper-slide" :class="{active:curCat===item.cat_id}" v-for="(item,index) in itemCats" v-bind:key="index" replace>
						<div class="img"><img :src="item.touch_thumb" /></div>
						<span v-text="item.cat_name"></span>
					</router-link>
				</ul>
			</div>
		</div>
		<router-view></router-view>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>