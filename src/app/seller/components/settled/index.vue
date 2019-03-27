<template>
  <div class="eSettle">
    <app-title title="已结算订单"></app-title>
    <app-settle-list :api="api_settleList"></app-settle-list>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>