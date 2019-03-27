<template>
  <div class="eList">
  	<app-page-head></app-page-head>
    <a class="keyFilter" @click="filterSel">筛选</a>
    <app-mask-close></app-mask-close>
    <app-filter></app-filter>
    <app-sorting>
      <li class="style">
        <span class="icon-list" :class="{show:listStyle===1}" @click="listStyle=2; switchStyle()"></span>
        <span class="icon-list2" :class="{show:listStyle===2}" @click="listStyle=3; switchStyle()"></span>
        <span class="icon-square" :class="{show:listStyle===3}" @click="listStyle=1; switchStyle()"></span>
      </li>
    </app-sorting>
    <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" :active="scrollerWatch" off-height="7.75" ref="swiperObj">
  	<app-img-list
    :class="{
      listStyle1:listStyle===1,
      listStyle2:listStyle===2,
      listStyle3:listStyle===3
      }" :api="api_list" :catId="catId">
    </app-img-list>
    </scroller>
    <app-gotop :swiperObj="swiperObj" :watch="scrollerWatch"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>