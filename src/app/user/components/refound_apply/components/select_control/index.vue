<template>
  <div class="pSelect">
    <h5 @click="isOpen = !isOpen" v-text="defVal" :data-val="curIndex"></h5>
    <i class="icon-enter" @click="isOpen = !isOpen" ></i>
    <ol v-show="isOpen">
      <li :class="{active: null === curIndex}" @click="handleSelect(null)" v-text="defaultVal"></li>
      <li :class="{active: index === curIndex}" v-for="(item,index) in items" v-bind:key="index" v-text="item.txt" @click="handleSelect(index)"></li>
    </ol>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>