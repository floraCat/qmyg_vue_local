<template>
  <div class="addrMask" v-if="showMask" @touchmove="noScroll">
		<div class="mask"></div>
		<div class="quit" @click="maskClose();">
      关闭
      <i class="icon-arr_rt"></i>
    </div>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>