<template>
	<div class="common-address-page" :class="{ on: isShow }">
		<div class="header">
			<i class="icon" v-on:click="handleColse"></i>
			<h2 class="title">地址选择</h2>
			<button v-on:click="handleColse">确定</button>
		</div>

		<div class="address-container">
			<ul class="address-nav">
				<li v-on:click="handleParent(1)" class="nav-item" :class="{ active: 1 === parentIndex }">{{ prov }}</li>
				<li v-if="1 < parentIndex" v-on:click="handleParent(2)" class="nav-item" :class="{ active: 2 === parentIndex }">{{ city }}</li>
				<li v-if="2 < parentIndex" v-on:click="handleParent(3)" class="nav-item" :class="{ active: 3 === parentIndex }">{{ area }}</li>
				<li v-if="3 < parentIndex" v-on:click="handleParent(4)" class="nav-item" :class="{ active: 4 === parentIndex }">请选择</li>
			</ul>

			<ul class="address-content">
				<app-swiper>
					<li v-for="(item, index) in cistyList" :key="index" v-on:click="handleSelect(item)" class="item">{{ item.region_name }}</li>
				</app-swiper>
			</ul>

		</div>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>