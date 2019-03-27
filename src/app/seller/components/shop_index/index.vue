<template>
  <div class="eShopIndex">
    <div class="head">
			<i class="back icon-back"></i>
			<ol>
				<div class="img"><img src="~assets/images/no_team_icon.png" alt="logo" /></div>
				<h5>龙头企业店铺</h5>
				<p>购物批发价 正品行货</p>
			</ol>
			<ul>
				<i class="icon"></i>
				<span>全民易购<br />官方认证</span>
			</ul>
    </div>
    <ul class="tabs">
			<li>
				<span>今日访客:</span>
				<i>2</i>
			</li>
			<li>
				<span>7天盈利:</span>
				<i>2</i>
			</li>
			<li>
				<span>代理商品:</span>
				<i>2</i>
			</li>
    </ul>
    <section class="notes">
      <i class="icon icon-edit"></i>
      <div class="slides swiper-scroll" ref="swiperNote">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">小店特色：商品正价格低</li>
          <li class="swiper-slide">店家留言：有您的关照，我会更有信心</li>
        </ul>
      </div>
    </section>
    <ul class="lists">
			<li v-for="(item, index) in items" v-bind:key="index">
				<a href="#">
					<div class="img"><img src="http://eggou.oss-cn-shenzhen.aliyuncs.com/images/201706/thumb_img/100457_thumb_G_1497323744170.jpg" /></div>
					<h6 v-text="item.ttl"></h6>
					<p>
						<span class="lt">￥<em>2999.00</em></span>
						<span class="rt"><i class="icon-eye"></i><em>10</em></span>
					</p>
				</a>
			</li>
    </ul>
    <a class="more" href="javascript:;" @click="loadMore">点击加载更多商品</a>
    <app-act></app-act>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>