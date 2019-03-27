<template>
  <div class="eMicroShare">
    <app-title title="新人微共享"></app-title>
    <section class="head">
			<em>60.00</em>
			<p>新人微共享收益总额</p>
    </section>

    <section class="tabs">
			<li>
				<span>今日访客</span>
				<i>1</i>
			</li>
			<li>
				<span>七日订单</span>
				<i>2</i>
			</li>
    </section>

    <section class="enters">
			<router-link :to="{name: 'user.IncomeList'}">
				<span>查看收益明细</span>
				<i class="icon-enter"></i>
			</router-link>
    </section>

    <div class="foot">
    	<i class="icon-logo"></i>
    	<p>深圳全民易购贸易有限公司</p>
    </div>

    <app-footer active="4"></app-footer>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>