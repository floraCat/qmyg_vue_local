<template>
  <div class="pay-wrapper">
    <app-title title="易购收银台"></app-title>
    <div class="content">
      <div class="pay-money">
        <span>订单金额</span>
        <em>39.90元</em>
      </div>
      <div class="pay-mode">
        <p>付款方式</p>
        <ul class="pay-list">
          <li class="pay-item" v-for="(item,index) in payMode.data">
            <a href="javascript:">
              <div class="pay-icon">
                <img :src="item.icon" alt="">
              </div>
              <div class="pay-text">
                <span>{{ item.name }}</span>
              </div>
              <i class="icon-enter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>