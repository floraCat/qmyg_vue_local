<template>
  <div class="eProfit">
    <app-title title="我的奖励"></app-title>
    <div class="head">
      <h6>累计收益奖励</h6>
      <em v-text="brokerage"></em>
      <p>待返奖励：<span v-text="brokerageWait"></span></p>
    </div>
    <div class="enters">
      <router-link :to="{name : 'seller.Settled'}" class="lineB">
        <label>已结算收入</label>
        <i class="icon icon-enter"></i>
      </router-link>
      <router-link :to="{name : 'seller.Unsettled'}" class="mgB">
        <label>未结算收入</label>
        <i class="icon icon-enter"></i>
      </router-link>
      <router-link :to="{name : 'seller.Account'}">
        <label>到账明细</label>
        <i class="icon icon-enter"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>