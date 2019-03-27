<template>
  <div class="eg_goods">
    <div class="eg_goods_int">
      <a>
        <img src="~assets/images/ash_icon9.jpg" />
      </a>
      <ul class="goods_int_one clearfix">
        <li v-for="(list, index) in items1" v-bind:key="index">
          <a :href="list.ad_link">
            <img :src="list.ad_code">
          </a>
        </li>
      </ul>
      <ul class="goods_int_two">
        <li v-for="(listadd, index) in items2" v-bind:key="index">
          <a :href="listadd.ad_link">
            <img :src="listadd.ad_code">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>