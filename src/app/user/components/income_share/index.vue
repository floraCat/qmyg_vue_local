<template>
  <div class="eMicroShare">
    <app-title title="团队共享收益"></app-title>
    <section class="head">
			<em>228.00</em>
			<p>团队共享收益总额</p>
    </section>

    <section class="tabs">
			<li>
				<span>可提现</span>
				<i>3</i>
			</li>
			<li>
				<span>消费型</span>
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