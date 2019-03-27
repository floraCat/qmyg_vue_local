<template>
  <div class="income-page">
    <app-title title="我的收益"></app-title>
    <div class="income-box">

      <ul class="income-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" class="scroller" off-height="3.8" ref="swiperObj">
          <li v-for="(item, index) in items" :key="index" class="item">
            <h3>{{ item.add_time }}</h3>
            <a href="#" class="link">
              <h2 class="title">收益提醒</h2>
              <p class="desc">
                {{ item.msg }}，获得易购豆：{{ item.income }}
              </p>
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