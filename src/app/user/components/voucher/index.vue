<template>
  <div class="voucher-page">
    <app-title title="支付凭证"></app-title>
    <div class="voucher-box">

      <ul class="voucher-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" off-height="3.8" ref="swiperObj">
          <li v-for="(item, index) in items" class="item">
            <p>
              <span>交易金额：</span>
              <span class="money">{{ item.order_amount }}</span>元
            </p>
            <p>
              <span>交易商家：</span>全民易购
            </p>
            <p>
              <span>交易时间：</span>{{ item.pay_time }}
            </p>
          </li>

        </scroller>
      </ul>
    </div>
    <app-gotop :swiperObj="swiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>