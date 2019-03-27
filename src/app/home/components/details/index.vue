<template>
  <div class="eDetails">
  	<app-title title="详情页"></app-title>
		<ul class="pTabs">
			<li :class="{on:1===active}">
				<router-link 
					:to="{ name : 'home.Info'}" 
					replace 
				>商品</router-link>
			</li>
			<li :class="{on:2===active}">
				<router-link 
					:to="{ name : 'home.Content'}" 
					replace 
				>详情</router-link>
			</li>
			<li :class="{on:3===active}">
				<router-link 
					:to="{ name : 'home.Comment'}" 
					replace 
				>评论</router-link>
			</li>
		</ul>
		<div class="main">
			<router-view v-if="updated"></router-view>
		</div>
		<app-gotop></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>