<template>
	<div class="class-page">
		<app-page-head></app-page-head>
    <app-classify :api="api"></app-classify>
		<app-footer></app-footer>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>