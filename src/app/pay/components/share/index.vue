<template>
  <div class="share-page">
    <div class="money">
      <span>￥</span>198
    </div>

    <div class="share-main">
      <h2 class="head">选择支付方式：</h2>

      <ul class="list">
        <li class="item item-alipay">支付宝</li>
        <li class="item item-money active">余额支付</li>
        <li class="item item-unionpay">银联支付</li>
      </ul>

      <div class="input-group">
        <span>邀请码：</span>
        <input type="text" placeholder="请输入邀请码（可选）">
        <i class="icon icon-close3"></i>
      </div>

      <div class="footer">
        <button type="button">立即支付</button>
      </div>

      <div class="checkbox">
        <label :class="{ checked: checked }" v-on:click="hanldeCheck">
          支付即同意《
          <router-link :to="{ name: 'agreement.Share', query: { dt: referer } }">深圳全民易购创客协议</router-link>
          》
        </label>
      </div>

    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>