<template>
  <div class="search">
		<div class="search-nav">
			<app-nav-back></app-nav-back>
			<div class="icon input-group">
				<div class="dropdown">
					<dropdown :menu="menus" icon="icon-arr_btm" ref="searchMenu"></dropdown>
				</div>
				<input type="text" 
							 class="keyword" 
							 placeholder="商品/店铺搜索"
							 v-model="keyword"
				>
			</div>
			<button type="button" class="button" @click="submitSearch">搜索</button>
		</div>

		<div class="search-body">
			<app-swiper>
				<div class="search-content">
					<div class="search-list hot-search">
						<h3>热门搜索</h3>
						<div class="search-main">
							<a class="item" v-for="(item,index) in itemsHot" v-bind:key="index">
								<span v-text="item.keyword"></span>
							</a>
						</div>
					</div>

					<div class="search-list history-search">
						<h3>最近搜索</h3>
						<i class="icon icon-del" @click="clearHistory"></i>
						<div class="search-main" v-show="itemsHistory.length">
							<a class="item" 
								 v-for="(item2, index2) in itemsHistory" 
								 v-bind:key="index2"
								 @click="handleSearch(item2)"
							>
								<span v-text="item2.keyword"></span>
							</a>
						</div>
						<div class="noHistory" v-show="!itemsHistory.length">
							暂无搜索记录
						</div>
					</div>
				</div>
			</app-swiper>
		</div>

		<app-footer></app-footer>

  </div>

</template>

<script>
  import Index from './index.js';
  export default Index;
</script>