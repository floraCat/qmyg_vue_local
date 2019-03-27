<template>
	<div class="eImglist">
		<ul>
  		<li v-for="(item, index) in items" v-bind:key="index">
				<router-link :to="{name: 'home.Info', params: {id: item.goods_id}}">
					<div class="img"><img v-lazy="item.goods_thumb" /></div>
					<ol>
						<p class="ttl" v-text="item.goods_name"></p>
						<p class="info">
							<span class="fl">库存:<em v-text="item.goods_number"></em></span>
							<span class="fr">销量:<em v-text="item.sales_volume">20</em></span>
						</p>
						<p class="price">
							<span class="fl"><i>￥</i><em v-text="item.shop_price"></em></span>
							<span class="fr"><u>原价</u><i>￥</i><s v-text="item.market_price"></s></span>
						</p>
					</ol>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>