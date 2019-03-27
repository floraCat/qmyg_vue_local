<template>
  <div class="raply-page">
    <app-title :title="title"></app-title>
    <app-wait v-if="waite"></app-wait>
    <div class="withdrawals_con">
      <div class="raply-top">
        <p>提现金额<i>（本次最高可提现￥{{ money }}），不含手续费</i></p>
        <input type="num" v-model="raplyMoney" placeholder="¥ 100元起提">
        <p>
          本次需扣手续费：
          <span> {{ rateMoney | money }}</span>
          <button type="button" class="addallmoney" v-on:click="addAllMoney">全部提现</button>
        </p>

      </div>
      <div class="raply-bot">
        <div>
          <label>提现方式</label>
          <dropdown :menu="menus"></dropdown>
        </div>
        <p>提现手续费：5%</p>
      </div>

      <button type="button" v-on:click="submit">提交申请</button>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>