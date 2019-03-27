<template>
  <div class="eOrders">
    <app-title title="我的订单"></app-title>
  	<div class="wraper">
	    <div class="search">
	    	<input type="text" ref="search" v-model="keyword" @keyup.enter="searchSubmit($event)" placeholder="收货人 / 电话 / 运单号 / 宝贝名称 / 订单号" />
			</div>
			<div class="tabs">
				<li :class="{active:0===tabActive}" @click="tabsSwiper.slideTo(0)">全部订单</li>
				<li :class="{active:1===tabActive}" @click="tabsSwiper.slideTo(1)">待付款</li>
				<li :class="{active:2===tabActive}" @click="tabsSwiper.slideTo(2)">待发货</li>
				<li :class="{active:3===tabActive}" @click="tabsSwiper.slideTo(3)">待确认</li>
				<li :class="{active:4===tabActive}" @click="tabsSwiper.slideTo(4)">已确认</li>
			</div>
			<div class="lists" ref="swiperHorizon">
				<div class="swiper-wrapper">
				<!--全部订单-->
				<section class="swiper-slide" v-for="(_items,index0) in items" v-bind:key="index0">
					<scroller nested="true" :id="'scroller'+index0" :scroller-id="'scroller'+index0" class="list" :on-refresh="refresh" :on-infinite="infinite" :active="_items" off-height="10.7" v-show="!states[index0].noContent" :ref="'swiperObj'+index0">
						<ul>
							<li v-for="(item,index1) in _items" v-bind:key="index1">
								<header>
									<i v-text="item.order_info.os"></i>
									<span v-text="item.order_info.order_sn"></span>
									<time v-text="item.order_info.format_time"></time>
									<p v-text="item.order_info.buyer_name"></p>
								</header>
								<article v-for="(good,index2) in item.goods" v-bind:key="index2">
									<img :src="good.goods_img" />
									<section>
										<h4 v-text="good.goods_name"></h4>
										<p>
											<label>规格：</label>
											<span v-html="good.goods_attr"></span>
										</p>
										<p>
											<label>商品货号：</label>
											<span v-text="good.goods_sn"></span>
										</p>
										<p>
											<label>数量：</label>
											<span>{{good.goods_price}} × {{good.goods_number}}</span>
										</p>
										<p>
											<label>总价：</label>
											<span>{{good.total_money}}元</span>
										</p>
										<aside>
											<label>奖励：</label>
											<span>￥0元</span>
										</aside>
									</section>
								</article>
								<footer>
									<span v-text="item.order_info.mobile"></span>
									<address v-text="item.order_info.detail_address"></address>
								</footer>
							</li>
						</ul>
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
		</div>
		<app-gotop :swiperObj="curSwiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>