<template>
  <div class="orderAddress">
    <app-title title="收货地址" undefined v-on:goBack="goBack"></app-title>
    <ul class="list">
			<li v-for="(item,index) in items" v-bind:key="index">
				<div class="check" :class="{on: index === checkOn}" @click="check(index)">
					<i></i>
				</div>
				<div class="address-box">
					<p class="user-info"><span v-text="item.consignee"></span> <span v-text="item.mobile"></span></p> 
					<p class="detail">
						<em v-show="item.is_default">[默认地址]</em>
						<span v-text="item.full_address"></span>
					</p>
				</div>
			</li>
    </ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>