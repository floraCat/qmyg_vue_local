<template>
  <div id="user_help">
    <app-title title="帮助中心"></app-title>
    <ul class="help_list">
      <li v-for="item in items">
        <a :href="item.link">
          <b></b>
          <span v-text="item.text"></span>
          <i></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>