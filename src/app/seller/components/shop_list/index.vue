<template>
  <div class="eShopList">
    <app-title title="店铺"></app-title>
    <div class="banner">
			<img src="~assets/images/shopplist_1.jpg" />
    </div>
    <scroller class="list" :on-refresh="refresh" :on-infinite="infinite" :active="items" ref="swiperShops" off-height="13.45" v-show="items.length">
			<ul>
				<li>
					<section>
						<a class="img" href="#">
							<img src="~assets/images/sce_myset1.png">
						</a>
						<a class="ttl" href="#">
							标题title
						</a>
					</section>
					<footer>
						<p>商品5分<span>高</span></p>
						<p>服务5分<span>高</span></p>
						<p>时效5分<span>高</span></p>
					</footer>
				</li>
				<li>
					<section>
						<a class="img" href="#">
							<img src="~assets/images/sce_myset1.png">
						</a>
						<a class="ttl" href="#">
							标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title标题title
						</a>
					</section>
					<footer>
						<p>商品5分<span>高</span></p>
						<p>服务5分<span>高</span></p>
						<p>时效5分<span>高</span></p>
					</footer>
				</li>
			</ul>
    </scroller>
    <div class="noContent" v-show="!items.length">
			<p>亲，此处没有内容~ ！</p>
			<div class="brand">
				<i class="icon-logo"></i>
				<span>深圳全民易购贸易有限公司</span>
			</div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>