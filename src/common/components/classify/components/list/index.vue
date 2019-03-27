<template>
  <div class="class-list-page">
  	<div class="goods-list">

      <div class="item"
        v-for="(children, index) in goodsData"
        :key="index">

  			<div class="nav">
  				<h3>{{ children.cat_name }}</h3>
          <router-link :to="{ name: routerTo, query: { cat_id: children.cat_id } }" v-if="routerTo==='home.List'" class="more">更多</router-link>
  			</div>
  			<ul>
  				<li class="item"
            v-for="(item, index) in children.children"
            :key="index">
            <router-link :to="{ name: routerTo ,query: { cat_id: item.cat_id } }">
              <img :src="item.touch_thumb" :alt="item.cat_name">
              {{ item.cat_name }}
            </router-link>
  				</li>
  			</ul>
  		</div>


  	</div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>