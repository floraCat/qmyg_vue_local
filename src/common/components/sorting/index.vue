<template>
	<ul class="eSort">
		<li :class="{on:curSort==='goods_id'}" data-sort='goods_id' @click="sortSwitch($event);">
      <span>综合</span>
      <i :class="{'icon-arr_btm_fill':!goods_id_up, 'icon-arr_up_fill':goods_id_up}"></i>
    </li>
		<li :class="{on:curSort==='last_update'}" data-sort='last_update' @click="sortSwitch($event);">
      <span>新品</span>
    </li>
		<li :class="{on:curSort==='sales_volume'}" data-sort='sales_volume' @click="sortSwitch($event);">
      <span>销量</span>
    </li>
		<li :class="{on:curSort==='shop_price'}" data-sort='shop_price' @click="sortSwitch($event);">
      <span>价格</span>
      <i :class="{'icon-arr_btm_fill':!shop_price_up, 'icon-arr_up_fill':shop_price_up}"></i>
    </li>
		<slot></slot>
	</ul>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>