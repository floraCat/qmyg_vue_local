<template>
  <div v-if="0 < formTemp.length" class="tips-page">
    <ul class="tips-list">
      <li v-for="(item, index) in formTemp" :key="index" class="item">
        <div class="item-body">
          <img :src="item.images" :alt="item.msg">
          <div class="text">{{ item.type | tipsType }}</div>
          <a v-if="0 === item.type" href="#">点击查看</a>
          <router-link v-if="1 === item.type" :to="{ name: 'pay.Share', query: { dt: referer } }">立即开通</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>