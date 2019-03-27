<template>
  <div class="eCounts">
    <app-title title="订单"></app-title>
    <app-echarts nameL="付款订单" nameR="发货订单" :api="api_order" type="order"></app-echarts>
    <ol class="enters group">
			<li>
        <router-link :to="{name:'seller.Order'}">
          <i class="label icon icon-logo"></i>
          <label>订单管理</label>
          <i class="go icon icon-enter"></i>
        </router-link>
      </li>
      <li>
        <i class="label icon icon-logo"></i>
        <label>7天销量排行榜</label>
        <p>统计时间: <span>07/05 11:30:07</span></p>
      </li>
    </ol>
    <p class="note">
			注：营收数据仅截至到<span>07/05 10:50:57</span>，包含今日数据
    </p>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>