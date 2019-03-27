<template>
  <div id="user_check_count">
    <app-title title="提现账号列表"></app-title>
    <app-wait v-if="waite"></app-wait>
    <ul class="check_count_con" v-show="showPage">
      <li v-for="(item, index) in items" v-bind:key="index">
        <p v-text="item.bank_name"></p>
        <p><span v-text="item.bank_card"></span><i @click="handleDialog(item)"></i></p>
      </li>
    </ul>
    <button v-show="showPage" @click="addBank(0)">+添加银行卡</button>
    <button v-show="showPage" @click="addBank(1)">+添加支付宝</button>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>