<template>
  <button type="button" class="phone-code" v-on:click="getPhoneCode" :disabled="active" :class="{ active: active }">{{ name }}</button>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>