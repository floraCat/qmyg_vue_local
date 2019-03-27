<template>
  <div class="pSeller">
    <app-title title="卖家中心"></app-title>
    <router-link :to="{name:'seller.Profit'}" class="head">
			<h2>龙头企业店铺</h2>
			<em v-text="brokerage.brokerage"></em>
			<p>累计收入（<span></span>元）</p>
    </router-link>
    <section class="tabs">
			<router-link :to="{name : 'seller.CountVisit'}">
				<span>今日访客</span>
				<i v-text="counts.visit"></i>
			</router-link>
			<router-link :to="{name : 'seller.CountOrder'}">
				<span>七日订单</span>
				<i v-text="counts.order"></i>
			</router-link>
			<router-link :to="{name : 'seller.CountSale'}">
				<span>七日销售</span>
				<i  v-text="counts.sale"></i>
			</router-link>
    </section>
    <section class="enters">
			<li>
        <router-link :to="{name : 'home.Home'}">
          <img src="~assets/images/sce_myshop1.png" alt="">
          <span>我的店铺</span>
        </router-link>
    	</li>
    	<li>
        <router-link :to="{name : 'seller.InSale', params:{id:0}}">
          <img src="~assets/images/sce_mygoods.png" alt="">
          <span>我的商品</span>
        </router-link>
    	</li>
    	<li>
        <router-link :to="{name : 'seller.RecomGood'}">
          <img src="~assets/images/sce_myjiaoyi.png" alt="">
          <span>代理商品</span>
        </router-link>
    	</li>
    	<li>
        <router-link :to="{name : 'seller.SetShop'}">
          <img src="~assets/images/sce_myset1.png" alt="">
          <span>店铺设置</span>
        </router-link>
    	</li>
    	<li>
        <router-link :to="{name : 'seller.Order'}">
          <img src="~assets/images/sce_myorder1.png" alt="">
          <span>我的订单</span>
        </router-link>
    	</li>
    	<li class="position-box">
        <router-link :to="{name : 'seller.Profit'}">
          <img src="~assets/images/sce_myshouyi1.png" alt="">
          <span>收益明细</span>
        </router-link>
        <span class="p-num" id="p-num-1" style="display: none;"></span>
    	</li>
    	<li>
        <router-link :to="{name : 'user.Raply'}">
          <img src="~assets/images/sce_mytixian1.png" alt="">
          <span>我要提现</span>
        </router-link>
    	</li>
    	<li>
        <a @click="checkAddGood">
          <img src="~assets/images/sce_myaddshop1.png" alt="">
          <span>添加商品</span>
        </a>
    	</li>
    </section>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>