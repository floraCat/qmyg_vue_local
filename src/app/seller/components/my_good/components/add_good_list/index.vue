<template>
  <div class="eAddGoodList">
  	<ul>
			<li v-for="(item, index) in items" v-bind:key="index" :class="{active:curSelects[index]}">
					<router-link :to="{name : 'home.Info', params: {id : item.goods_id}}" class="img"><img v-lazy="item.goods_thumb" /></router-link>
					<ol>
						<router-link :to="{name : 'home.Info', params: {id : item.goods_id}}" class="ttl" v-text="item.goods_name"></router-link>
						<p class="p2">
							<em>￥{{item.shop_price}}</em>
							<span @click="addAgent(index)">
								<i class="icon icon-add"></i>
							</span>
						</p>
						<p class="p3">
							<i class="dou">易购豆:0</i>
							<span>销量:1562</span>
						</p>
					</ol>
			</li>
		</ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>