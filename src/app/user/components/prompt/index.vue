<template>
  <div class="pPrompt">
    <app-title title="系统提示"></app-title>
    <div class="wrap">
      <h2 class="txt" v-text="title"></h2>
      <ol>
        <li v-for="(item,index) in items" v-bind:key="index">
        <router-link :to="item.linkTo" v-text="item.txt"></router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>