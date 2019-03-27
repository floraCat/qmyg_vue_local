<template>
  <div class="eShare" @touchmove="noScroll">
  	<p class="note">因微信浏览器原因点击<b>微信</b>右上角菜单进行分享</p>
  	<img class="arrow" src="~assets/images/jiantou.png" alt="箭头" />
  	<div class="tranMask" @click="closeShare"></div>
  	<div class="main">
			<h3>动动手指&nbsp;&nbsp;&nbsp;躺着赚钱</h3>
			<p>
				<em class="cen">198元加入大创客，开启店铺，自动锁粉</em>
				<span>推荐产品或分享商城给朋友，您的朋友任何时候购买商城任何产品，您均可获得订单商品毛利<em>70%</em>的奖励！</span><br />
				<b>普通用户</b><span class="last">：推荐产品给朋友购买，也可获得订单商品毛利<em>10%</em>的奖励！</span>
			</p>
			<ul>
				<li>
					<img src="~assets/images/weixin.jpg" alt="微信" />
					<span>微信</span>
				</li>
				<li>
					<img src="~assets/images/weixinpy.jpg" alt="朋友圈" />
					<span>朋友圈</span>
				</li>
				<li>
					<img src="~assets/images/qq.jpg" alt="QQ" />
					<span>QQ</span>
				</li>
				<li>
					<img src="~assets/images/qqzone.jpg" alt="QQ空间" />
					<span>QQ空间</span>
				</li>
			</ul>
			<a class="cancel" @click="closeShare">取消分享</a>
  	</div>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>