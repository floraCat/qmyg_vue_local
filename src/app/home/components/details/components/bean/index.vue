<template>
  <div class="eBean" @touchmove="noScroll">
  	<i class="quit icon-close" @click="closeBean"></i>
  	<ol>
	  	<div class="cont">
				<p>1. 易购豆为深圳全民易购平台内部结算虚拟货币。</p>
				<p>2. 易购豆可在本商城等值抵扣消费，大创客更可以等值提现。</p>
	  	</div>
	  	<p class="right">解释权归深圳全民易购贸易有限公司所有</p>
  	</ol>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>