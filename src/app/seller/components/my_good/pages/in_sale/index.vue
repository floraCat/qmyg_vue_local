<template>
  <div class="eMyGood" :class="{cancelNote: !openNote}">
  	<app-title title="我的商品"></app-title>
    <ul class="tabs">
			<a class="active">出售中</a>
			<router-link :to="{name : 'seller.InSaleCat'}">分类</router-link>
    </ul>
    <div class="appNote" v-show="openNote">
	  	<span class="icon-note"></span>
	  	<p>官方精选品质货源，一键分享，安心赚钱！</p>
	  	<i class="icon-close" @click="closeNote"></i>
	  </div>
	  <scroller class="lists" :on-refresh="refresh" :on-infinite="infinite" :active="items" ref="swiperObj" off-height="10.8">
			<li v-for="(item,index) in items" v-bind:key="index" :class="{active:curChecks[index]}">
				<div class="check">
					<span @click="checkGood(index)">
						<i class="icon icon-right"></i>
					</span>
				</div>
				<router-link :to="{name:'home.Info', params:{id:item.goods_id}}" class="img">
					<img v-lazy="item.goods_thumb" />
				</router-link>
				<ol>
					<router-link :to="{name:'home.Info', params:{id:item.goods_id}}" class="ttl" v-text="item.goods_name"></router-link>
					<p class="p1">
						<span class="lt">
							<label>销售价：</label>
							<em>￥{{item.shop_price}}</em>
						</span>
						<span class="rt">
							<label>利润：</label>
							<em>0</em>
						</span>
					</p>
					<p class="p2">商品编号：{{item.goods_number}}</p>
					<p class="p3">
						<span class="lt">发布时间：{{item.add_time | date}}</span>
						<span class="rt">已售出：{{item.volume}}</span>
					</p>
				</ol>
			</li>
	  </scroller>
	  <div class="btn_add" :class="{active:openAddGood}">
		  <router-link :to="{ name : 'seller.AddGoodCat' }">
		  	<i class="icon icon-close3"></i>
		  	<span>添加新产品</span>
		  </router-link>
	  </div>
	  <div class="handleCancelAgent" :class="{active:openHandle}">
			<div class="check" :class="{active:allChecked}" @click="checkAll">
        <span>
          <i class="icon icon-right"></i>
        </span>
        <label>全选</label>
      </div>
      <a class="cancel" @click="cancelSelect">取消</a>
      <a class="btn" @click="cancelAgent">取消代理</a>
	  </div>
	  <app-gotop :swiperObj="swiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>