<template>
	<transition name="fade">
		<div v-if="Active" class="dialog" :class="[CustomClass, { active: Active }]">
			<div class="content">
		    <div class="head">
		    	<h3>{{ Title }}</h3>
		    	<p>{{ Msg }}</p>
		    </div>
		    <div class="dialog-body">
		      <button v-for="item in listsData" @click="handleDialog(item)" :class="{ item: 1 < listsData.length }">{{ item.msg }}</button>
		    </div>
			</div>
	  </div>
	</transition>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>