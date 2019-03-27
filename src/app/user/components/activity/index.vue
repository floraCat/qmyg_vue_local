<template>
  <div class="activity-page">
    <app-title title="促销活动"></app-title>
    <div class="activity-box">
      <ul class="activity-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" class="scroller" off-height="3.8" ref="swiperObj">
          <li v-for="item in items" class="item" v-bind:class="{end: item.start_time <= item.end_time}">
            <a href="#" class="link">
              <h2 class="title">{{ item.title }}</h2>
              <div class="pic">
                <img :src="item.topic_img" :alt="item.title">
              </div>
              <p class="desc">
                {{ item.description }}<span>→</span>
              </p>
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