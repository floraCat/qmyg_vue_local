<template>
  <div class="eServiceDesc" @touchmove="noScroll" ref="eServiceDesc">
  	<h3>服务说明</h3>
  	<div class="swiper-wrapper">
	  	<ol class="swiper-slide">
				<dl>
					<dt>
						<i class="icon-no-payment"></i>
						<span>商品售后</span>
					</dt>
					<dd>支持送货上门后再收款，支持现金、POS机刷卡等方式</dd>
				</dl>
				<dl>
					<dt>
						<i class="i2 icon-seven"></i>
						<span>7天退货</span>
					</dt>
					<dd>自实际收货日期的次日起7天内，商品完好，可进行无理由退换货</dd>
				</dl>
	  	</ol>
	  </div>
  	<i class="quit icon-close2" @click="closeServiceDesc"></i>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>