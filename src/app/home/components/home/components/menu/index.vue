<template>
  <div class="eg_menu" :class="{refresh:refreshCls}">
    <ul class="clearfix">
      <li v-for="(item,index) in items" v-bind:key="index">
        <a :href="item.url">
          <!-- <img v-lazy="item.pic" :alt="item.name"> -->
          <img :src="item.pic" :alt="item.name">
          <span v-text="item.name"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>