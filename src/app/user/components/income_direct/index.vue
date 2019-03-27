<template>
  <div class="income-list-page">
    <app-title title="团队直推收益"></app-title>
    <app-profit-list :api="api"></app-profit-list>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>