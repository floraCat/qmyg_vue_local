<template>
  <div class="express-page">
    <app-title title="物流信息"></app-title>
    <div class="express-box">
      <div class="no-express">
        <h3>您还没有物流信息</h3>
      </div>

      <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" class="scroller" off-height="3.8" ref="swiperObj">
        <ul class="express-list">
          <li v-for="(item, index) in items" :key="index" class="item">
            <div class="content">
              <div class="top">
                <h2>{{ item.order_state }}</h2>
                <a class="add_comment">晒单评价</a>
              </div>

              <router-link :to="{ name: 'user.OrderDetail', params: { id: item.order_id } }" class="bot">
                <div class="pic">
                  <img :src="item.goods_thumb" :alt="item.order_state">
                </div>
                <div class="exp-right">
                  <div class="time">{{ item.add_time }}</div>
                  <div class="desc">{{ item.hint }}</div>
                  <i class="icon icon-enter"></i>
                </div>
              </router-link>

            </div>
          </li>

        </ul>
      </scroller>
    </div>
    <app-gotop :swiperObj="swiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>