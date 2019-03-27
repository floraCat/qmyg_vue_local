<template>
  <div id="user_detailes">
    <app-title :title="title"></app-title>
    <app-wait v-if="waite"></app-wait>
    <ul class="detailes_con" v-show="showPage">
      <li v-for="(item, index) in items" v-bind:key="index">
        <div>
          <p v-text="item.change_desc"></p>
          <p v-text="item.change_time"></p>
        </div>
        <span v-text="item.amount" :class="{red_span: item.amount < 0}"></span>
      </li>
    </ul>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>