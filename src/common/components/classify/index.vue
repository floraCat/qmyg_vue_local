<template>
	<div class="classify-page">

		<div class="menu-left">
      <app-swiper>
        <ul class="menu-list" ref='menu'>
          <li class="item"
            v-for="(item, index) in items"
            :class="{ active: activeIndex === item.cat_id }"
            @click="handleState(item.cat_id)"
            :key="index">{{ item.cat_name }}</li>
        </ul>
      </app-swiper>

  	</div>

    <div class="menu-right">
      <app-swiper>
        <app-list :goodData="goodsList"></app-list>
      </app-swiper>
    </div>

	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>