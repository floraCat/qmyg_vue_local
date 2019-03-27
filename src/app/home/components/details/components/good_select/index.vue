<template>
  <div class="eGoodSel" @touchmove="noScroll">
  	<ol class="main">
			<div class="img"><img :src="goodData.goods_thumb" /></div>
			<div class="rt">
				<p class="ttl" v-text="goodData.goods_name"></p>
				<p class="price">
					<em>￥<i v-text="curPrice.shop_price"></i></em>
					<s>×</s>
					<span v-text="numGood"></span>
				</p>
				<p class="priceSum">
					<label>总价：</label>
					<em>￥<i v-text="(curPrice.shop_price * numGood).toFixed(2)"></i></em>
				</p>
				<p class="dou">
					<i @click="_openBean">易购豆</i>
					<span>可获<em v-text="(curPrice.ygcoin_p * numGood).toFixed(2)"></em>易购豆</span>
				</p>
			</div>
  	</ol>
  	<ol class="wrap" ref="swiperObj">
  		<div class="swiper-wrapper">
  			<div class="swiper-slide">
		  		<div class="size" v-for="(attr,index1) in attrs" v-bind:key="index1">
						<label v-text="attr.attr_name"></label>
						<ul>
							<li v-for="(item,index2) in attr.data"  v-bind:key="index2" :class="{on:attrOn[index1][index2]}" @click="ruleSel(item.goods_attr_id, item.attr_value, index1, index2)">{{item.attr_value}}<i class="icon-selected"></i></li>
						</ul>
			  	</div>
			  	<div class="numSel">
						<label>数量</label>
						<div class="pNum">
							<i class="icon-sub" @click="subGood(numGood)"></i>
							<span class="num" v-text="numGood"></span>
							<i class="icon-add" @click="addGood(numGood)"></i>
						</div>
			  	</div>
			  </div>
	  	</div>
	  </ol>
  	<ol class="btns">
			<li><a class="yellow" href="javascript:;" @click="addCart">加入购物车</a></li>
			<li><a class="red" href="javascript:;" @click="addCart('buyNow');">立即购买</a></li>
  	</ol>
  	<ol class="btns" :class="{hide:!outOfStock}">
			<li><a class="gray" href="javascript:;">暂时缺货</a></li>
  	</ol>
  	<a class="quit icon-close2" @click="closeGoodSelect"></a>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>