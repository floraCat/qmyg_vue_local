<template>
  <div class="notice-page">
    <app-title title="商城公告"></app-title>
    <div class="notice-box">

      <ul class="notice-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" class="scroller" off-height="3.8" ref="swiperObj">
          <li v-for="item in items" class="item">
            <a :href="item.link" class="link">
              <h2 class="title">{{ item.title }}</h2>
              <div class="pic">
                <img :src="item.file_url" :alt="item.title">
              </div>
              <span class="view">查看详情</span>
              <i class="icon icon-enter"></i>
            </a>
          </li>

        </scroller>
      </ul>
    </div>
    <app-gotop :swiperObj="swiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>