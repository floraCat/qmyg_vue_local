<template>
  <header class="eg_header_wrap">
  	<div class="header_top_add">
  		<div class="eg_search_boxs">
        <router-link :to="{ name: 'home.Search' }" class="eg_sbox j-search-input">
          <img src="~assets/images/eg_home_search.png">
          <span>{{ current.city_name }}全民易购</span>
        </router-link>
  		</div>

      <div class="eg_city">
        <div class="city-name" v-on:click="locationSelecterOpen">
          <span>{{ current.city_name }}</span>
        </div>

        <location-selecter></location-selecter>
      </div>

  		<div class="search_news">
        <router-link :to="{ name: 'user.Msglists' }" class="eg_news_btn">
          <span class="news_nums" v-if="msg_nums" v-text="msg_nums"></span>消息
        </router-link>
  		</div>
  	</div>
  </header>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>