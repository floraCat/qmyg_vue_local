<template>
  <div class="home-act">
    <div class="act-bg">
      <a v-for="(item,index) in items" v-bind:key="index" :href="item.ad_link">
        <img :src="item.ad_code">
      </a>
    </div>
    <div class="act-list">
      <a v-for="(item2,index) in items2" v-bind:key="index" :href="item2.ad_link">
        <img :src="item2.ad_code">
      </a>
    </div>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>