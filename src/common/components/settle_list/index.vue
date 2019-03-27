<template>
    <div class="settleList">
      <scroller class="ul" :on-refresh="refresh" :on-infinite="infinite" :active="items" off-height="55" v-show="!noContent" ref="swiperObj">
        <li v-for="(item,index) in items" v-bind:key="index">
          <div>
            <label v-text="item.order_sn"></label>
            <span><i v-text="item.brokerage"></i> 元</span>
          </div>
          <p>
            <span>{{item.order_status | statusOrder}}</span>
            <span>{{item.pay_status | statusPay}}</span>
            <span>{{item.shipping_status | statusShipping}}</span>
          </p>
        </li>
      </scroller>
      <!--没有内容-->
      <div class="noContent" v-show="noContent">
        <p>亲，此处没有内容~ ！</p>
        <div class="brand">
          <i class="icon-logo"></i>
          <span>深圳全民易购贸易有限公司</span>
        </div>
      </div>
    </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>