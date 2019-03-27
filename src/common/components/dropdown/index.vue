<template>
	<div class="dropdown-page">
    <button type="button" class="dropdown-toggle" v-on:click="handleToggle">
    	{{ curSelect.name }}
    	<i v-if="icon" class="icon" :class="icon"></i>
    </button>

    <ul v-show="toggle" class="dropdown-menu">
      <li v-for="(item, index) in menu" :key="index" v-on:click="handleSelect(item)">
      	<a href="javascript:;">{{ item.name }}</a>
     	</li>
    </ul>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>