<template>
  <div class="eCounts">
    <app-title title="营收"></app-title>
    <app-echarts nameL="收益总额" nameR="销售总额" :api="api_sale" type="sale"></app-echarts>
    <ol class="enters group">
			<li>
        <router-link :to="{name:'seller.Profit'}">
          <i class="label icon icon-logo"></i>
          <label>营收明细</label>
          <i class="go icon icon-enter"></i>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'seller.Account'}">
          <i class="label icon icon-logo"></i>
          <label>已到账返润 (自动转入余额)</label>
          <i class="go icon icon-enter"></i>
        </router-link>
      </li>
    </ol>
    <p class="note">
			注：营收数据仅计算已到账数据，未包含交易中的订单
    </p>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>