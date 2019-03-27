<template>
	<div class="eInfo" :class="{hasSidebar:activeSidebar}">

		<!--悬浮头部-->
		<div class="fixHead" :class="{show:showFixHead}">
			<img class="logo" src="~assets/images/qmLogo.png" alt="商标" />
			<ol>
				<i class="share icon-share" @click="openShare"></i>
				<router-link :to="{name:'user.Home'}" class="user">个人中心<i class="new"></i></router-link>
			</ol>
		</div>

		<!--大图轮播-->
	  <app-banner class="infoBanner"></app-banner>

	  <section class="imgBtm">
	  	<p class="fl">
				<span>销量：{{goodData.sales_volume}}</span>
				<span>已评价：{{goodData.comment}}</span>
	  	</p>
	  	<p class="fr" :class="{on:goodData.is_collected}" @click="saveHandle">
	  		<span>收藏</span>
	  		<ol>
		  		<i class="icon-like saved"></i>
		  		<i class="icon-like"></i>
	  		</ol>
	  	</p>
	  </section>
	  <section class="info">
	  	<h1 v-text="goodData.goods_name" class="goods_name"></h1>
	  	<p class="price">
	  		<em>￥<i v-text="curPrice.shop_price"></i></em>
	  		<s>￥<i v-text="goodData.market_price"></i></s>
	  	</p>
	  	<p class="post">
	  		<label>运费信息</label>
	  		<span v-text="curPrice.shipping_fee"></span>
	  	</p>
	  	<a class="share" @click="openShare"><i class="icon-share"></i>分享赚钱</a>
	  </section>

	  <section class="dou">
	  	<i @click="openBean">易购豆</i>
	  	<ol>
				<p>本次购买普通用户可获<em class="normal_egdou" v-text="curPrice.ygcoin_p"></em>易购豆</p>
				<p>大创客可获<em class="big_egdou" v-text="curPrice.ygcoin_b"></em>易购豆</p>
	  	</ol>
	  </section>

	  <section class="ewm">
	  	<p>立即付款 立即返豆 <em @click="openBeanDesc">提现/使用说明</em></p>
	  	<span @click="creatQRcode">
				<i class="icon-ewm"></i>
				<label>商品二维码</label>
	  	</span>
	  </section>

	  <section class="enter">
	  	<a @click="addrSel">
		  	<label>配送至</label>
		  	<p>{{ address }}</p>
		  	<i class="icon-enter"></i>
	  	</a>
	  </section>

	  <section class="enter">
	  	<a @click="openGoodSelect">
		  	<label>已选</label>
		  	<p><span v-text="curAttrsTxt"></span><span v-text="numGood"></span>个</p>
		  	<i class="icon-enter"></i>
	  	</a>
	  </section>

	  <section class="appNote" v-show="openNote">
	  	<span class="icon-note"></span>
	  	<p>官方精选品质货源，一键分享，安心赚钱！</p>
	  	<i class="icon-close" @click="closeNote"></i>
	  </section>

	  <!--售后说明-->
	  <section class="support">
	  	<a @click="openServiceDesc">
		  	<label>支持</label>
		  	<span><i class="icon-sale"><u class="path1"></u><u class="path2"></u></i>店铺发货&售后</span>
		  	<span><i class="icon-seven"></i>7天退货</span>
		  	<span><i class="icon-deliver"></i>包邮</span>
	  	</a>
	  </section>

		<!--正文-->
		<div class="noteMainContent" ref="noteMainContent" v-show="!showMainContent">
			<div class="loading-icon"></div>
		</div>
	  <app-main-content v-if="showMainContent"></app-main-content>

	  <router-link :to="{name : 'home.Comment', query: {tabActive: 1}}" class="enter comment" v-if="showOneComment">
	  	<label>用户评价</label>
	  	<p>好评率<em>100%</em></p>
	  	<span><em v-text="goodData.comment_list.total"></em>人评论</span>
	  	<i class="icon-enter"></i>
	  </router-link>

	  <section class="comment2" v-if="showOneComment">
			<div class="top">
				<ul>
					<li v-for="i in 5" :class="{on:i<=goodData.comment_list.data[0].comment_rank}">
						<i class="i1 icon-star"></i><i class="i2 icon-star_fill"></i>
					</li>
				</ul>
				<label v-text="goodData.comment_list.data[0].user_name"></label>
				<span v-text="goodData.comment_list.data[0].add_time"></span>
			</div>
			<p v-text="goodData.comment_list.data[0].content"></p>
			<div class="btns">
				<router-link :to="{name : 'home.Comment', query: {tabActive: 4} }" class="hasPic">有图评价</router-link>
				<router-link :to="{name : 'home.Comment'}" class="all">全部评价</router-link>
			</div>
	  </section>

	  <section class="pSimilar" v-if="showMainContent">
			<h3>同类商品</h3>
			<ul>
				<li v-for="(item,index) in itemsSameGoods" v-bind:key="index">
					<router-link :to="{name: 'home.Info', params:{id:item.goods_id}}">
						<img :src="item.goods_thumb" />
						<p v-text="item.goods_name"></p>
						<span>
							<em>￥{{item.shop_price}}</em>
							<s>￥{{item.market_price}}</s>
						</span>
					</router-link>
				</li>
			</ul>
			<router-link :to="{name: 'home.List'}" class="btn">更多同类产品</router-link>
	  </section>

	  <!--飞入购物车-->
	  <div id="flyItem" class="fly_item"><img :src="goodData.goods_thumb" width="35" height="35"></div>
	  <div class="noteAddCart" :class="{show:showAddCart}">商品已加入购物车</div>

	  <section class="pFoot">
		  <li>
				<a class="service" href="#">
					<i class="icon icon-chat"></i>
					<span>客服</span>
				</a>
			</li>
			<li>
				<a class="agent" @click="handleAgent">我要代理</a>
			</li>
			<li>
				<a class="addCart" @click="addCart">加入购物车</a>
			</li>
			<li>
				<a class="buyNow" @click="openGoodSelect">立即购买</a>
			</li>
	  </section>

	  <!--缺货-->
	  <section class="pOutOfStock" :class="{show:outOfStock}">
			<p class="note">所选地区宝贝暂时缺货，非常抱歉！</p>
			<a class="btn" @click="noticeStock">到货通知</a>
	  </section>

		<!--悬浮购物车-->
	  <router-link :to="{ name : 'home.Cart'}" class="pCart icon-cart2">
	  	<i class="cartSum" v-text="cartSum" :class="{show:cartSum}"></i>
	  </router-link>

		<!--悬浮用户中心入口-->
	  <div class="personal_info_btn" @click="openSidebar">
      <i class="icon-person"></i>
      <div class="pib_rotate">
          <div></div>
          <div></div>
          <div></div>
      </div>
  	</div>

  	<!--关闭-->
  	<a class="detailClose" @click="$router.go(-1)">
  		<i class="icon-close"></i>
  		<span>关闭</span>
  	</a>

  	<!--[分享]-->
	  <app-share v-if="activeShare" :close="closeShare"></app-share>

		<!--[易购豆]-->
	  <app-bean v-if="activeBean" :close="closeBean"></app-bean>
	  
  	<!--[易购豆提现]-->
  	<transition name="transBeanDesc">
  		<app-bean-desc v-if="activeBeanDesc"></app-bean-desc>
  	</transition>

  	<!--[二维码生成]-->
  	<app-qrcode ref="child"></app-qrcode>

  	<!--[商品选择]-->
  	<transition name="transGoodSelect">
	  	<app-good-select v-show="activeGoodSelect" ref="goodSelect" :close="closeGoodSelect" :openBean="openBean" :active="activeGoodSelect"></app-good-select>
	  </transition>

  	<!--[售后]-->
	  <transition name="transServiceDesc">
	  	<app-service-desc v-if="activeServiceDesc" :close="closeServiceDesc"></app-service-desc>
	  </transition>

		<!--[右边侧栏]-->
		<transition name="transSidebar">
  		<app-sidebar v-if="activeSidebar" :close="closeSidebar"></app-sidebar>
  	</transition>

  	<!--[地址选择]-->
  	<app-address-select></app-address-select>
  	<app-mask-close></app-mask-close>

  	<!--其他下单提示-->
  	<div class="detailOrder" v-if="showLatest" :class="{show:showLatest}">
			<div class="img">
				<img :src="infoLatest.imgurl" />
			</div>
			<p>{{infoLatest.name}} 提交了一笔购物订单 <em v-text="secondBefore"></em> 秒前</p>
  	</div>

		<!--覆盖层-->
		<div class="detailMask" :class="{show:detailMask, upup:maskUp}" @click="closeAll" @touchmove.prevent ref="detailMask"></div>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>