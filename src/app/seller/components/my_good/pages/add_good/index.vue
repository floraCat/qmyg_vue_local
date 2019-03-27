<template>
  <div class="eAddGood" :class="{hasFoot:openHandle}">
  	<app-page-head></app-page-head>
    <a class="keyFilter" @click="filterSel">筛选</a>
    <app-mask-close></app-mask-close>
    <app-filter></app-filter>
    <app-sorting actionName="getAddGoodList">
      <li class="style">
        <span class="icon-square" :class="{show:listStyle===1}" @click="listStyle=2; switchStyle();"></span>
        <span class="icon-list2" :class="{show:listStyle===2}" @click="listStyle=3; switchStyle();"></span>
        <span class="icon-list" :class="{show:listStyle===3}" @click="listStyle=1; switchStyle();"></span>
      </li>
    </app-sorting>
    <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" :active="scrollerWatch" ref="swiperObj" off-height="7.5">
    	<app-add-good-list
      :class="{
        style1:listStyle===1,
        style2:listStyle===2,
        style3:listStyle===3
        }" :api="api_list">
      </app-add-good-list>
    </scroller>
    <!--底部弹窗-->
    <div class="handleAddGood" :class="{active:openHandle}">
      <div class="check" :class="{active:allSelected}" @click="selectAll">
        <span>
          <i class="icon icon-right"></i>
        </span>
        <label>全选</label>
      </div>
      <p>已选择<em v-text="numSelected"></em></p>
      <a class="btn" @click="agentGood">我要代理</a>
    </div>
    <app-gotop :swiperObj="swiperObj" :watch="scrollerWatch"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>