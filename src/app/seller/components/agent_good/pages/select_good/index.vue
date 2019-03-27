<template>
  <div class="selectGood">
  	<scroller :on-refresh="refresh" :on-infinite="infinite" :active="scrollerWatch" off-height="7.75" ref="swiperObj">
    <div class="tabs">
			<li v-for="(cat,index) in cats2" v-bind:key="index" v-text="cat.cat_name" :class="{active:curCat2 === cat.cat_id}" @click="switchTab(cat.cat_id)"></li>
    </div>
    <div class="lists">
			<li v-for="(good,index) in goods" v-bind:key="index">
				<router-link :to="{name:'home.Info', params:{id:good.goods_id}}" class="img">
					<img :src="good.goods_thumb" />
				</router-link>
				<ol>
					<h4 v-text="good.goods_name"></h4>
					<p>
						<label>利润：</label>
						<em>￥0</em>
					</p>
					<p>
						<label>售价：</label>
						<span>￥{{good.shop_price}}</span>
					</p>
					<i class="icon icon-close3" @click="pop_upToShop(index)"></i>
				</ol>
			</li>
		</div>
    </scroller>
    <!--上架商品-->
    <div class="upToShop" :class="{show:show_upToShop}">
    	<header class="hdAddGood">
				<i class="return icon icon-back" @click="close_upToShop"></i>
				<h1>上架商品</h1>
	    </header>
			<div class="good">
				<img :src="curGood.goods_thumb" />
				<h4 v-text="curGood.goods_name"></h4>
			</div>
			<a class="cats" @click="pop_selectCat">
				<label>商品分类</label>
				<span v-text="selectedCat.cat_name"></span>
			</a>
			<ol class="info">
				<li>
					<label>利润</label>
					<span>￥0</span>
				</li>
				<li>
					<label>售价</label>
					<span>￥{{curGood.shop_price}}</span>
				</li>
			</ol>
			<div class="submitAdd">
				<a class="btn" @click="submitAddGood">上架到我的店铺</a>
			</div>
    </div>
    <!--选择分类-->
    <app-select-cat :class="{show:show_selectCat}"></app-select-cat>
    
    <app-gotop :swiperObj="swiperObj" :watch="goods"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>