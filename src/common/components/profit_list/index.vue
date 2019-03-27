<template>
  <div class="profit-list">
    <div class="income-box">
      <div class="head">
        <div class="head-left">
          <div class="times">2017年07月</div>
          <div class="money">总收益400.00</div>
        </div>
        <div class="head-right">
          <div class="screen">
            <div class="type" v-on:click="type = 0" v-show="hasFilter">筛选</div>
            <div class="time" v-on:click="type = 1"></div>
          </div>
        </div>
      </div>

      <ul class="income-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items" class="scroller" off-height="7.88" ref="swiperObj">
          <li class="item" v-for="(item, index) in items" :key="index">
            <div class="item-left">
              <div class="title">{{ item.change_desc }}</div>
              <div class="time">{{ item.change_time }}</div>
            </div>
            <div class="item-right">
              <span>{{ item.amount }}</span>
            </div>
          </li>
        </scroller>
      </ul>
    </div>

    <div class="mask" :class="{ in: '' !== type }">
      <div class="mask-bg" v-on:click="type = ''"></div>
      <div class="mask-content type" v-show="0 === type">
        <span>新人微共享</span>
        <span>团队共享收益</span>
        <span>团队直推收益</span>
        <span>店铺收益</span>
        <span>团队消费收益</span>
      </div>

      <div class="mask-content month" v-show="1 === type">
        <div class="head">请选择月份(2017年度)</div>
        <div class="month-list">
          <span v-for="(item, index) in 12" :key="index">{{ item }}月</span>
        </div>
      </div>
    </div>
    <app-gotop :swiperObj="swiperObj" :watch="items"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>