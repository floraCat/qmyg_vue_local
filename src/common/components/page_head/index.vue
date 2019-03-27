<template>
	<header class="page-head">
		<app-nav-back></app-nav-back>
	  <section class="search">
	  	<i class="icon icon-search"></i>
	  	<div class="search-text">
		  	<router-link :to="{ name: 'home.Search' }">
		  		商品/店铺搜索
		  	</router-link>
	  	</div>

	  </section>
	</header>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>