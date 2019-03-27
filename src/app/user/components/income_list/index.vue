<template>
  <div class="income-list-page">
    <app-title title="收益明细"></app-title>
    <app-profit-list :api="api" filter="true"></app-profit-list>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>