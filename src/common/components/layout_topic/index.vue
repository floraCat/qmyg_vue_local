<template>
  <section class="eTopic">
  	<a class="img" :href="items.title.href">
			<img class="banner" :src="items.title.img" />
		</a>
		<ol>
			<router-link :to="{name : 'home.Info', params: {id : item.goods_id}}" class="item" v-for="(item, index) in items.goods_list" v-bind:key="index">
				<img v-lazy="item.goods_thumb" data-original-width='10px' data-original-height='10px' />
				<p v-text="item.goods_name"></p>
				<span><i>￥</i><em v-text="item.shop_price"></em></span>
			</router-link>
		</ol>
  </section>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>