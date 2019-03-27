<template>
  <div class="refound-page">
    <app-title title="退换货列表"></app-title>
    <div class="refound-box">
      <ul class="refound-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" off-height="3.8" ref="swiperObj">
          <li v-for="(item, index) in items" class="item">
            <div class="top">
              <p>订单号：<span v-text="item.order_sn"></span></p>
              <p v-text="item.apply_time"></p>
            </div>
            <div class="bot">
              <div class="item-left">
                <img :src="item.goods_thumb" :alt="item.goods_name">
              </div>
              <div class="item-right">
                <div class="title" v-text="item.goods_name"></div>
                <div class="num">数量：× <span v-text="item.return_number"></span></div>
                <ol v-show="'after' === state">
                  <router-link :to="{ name: 'user.RefoundDetail', params: { id: item.order_id } }">
                  查看详情
                  </router-link>
                </ol>
                <ol v-show="'before' === state">
                  <router-link :to="{ name: 'user.RefoundApply', query: { id: item.order_id } }">
                  申请售后
                  </router-link>
                  <a class="gray" href="javascript:;" @click="cancel(index)">
                  取消
                  </a>
                </ol>
              </div>
            </div>
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