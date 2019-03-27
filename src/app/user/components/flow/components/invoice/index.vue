<template>
  <div class="invoice-wrapper">
    <div class="header">
      <span>发票内容</span>
    </div>
    <div class="main">
      <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div class="rise-wrapper" v-show="!invoice[0].flag">
          <p>发票抬头</p>
          <div class="rise-box">
            <input type="text" placeholder="可填写个人或单位名称" v-model="riseText">
          </div>
        </div>
      </transition>
      <div class="content-wrapper">
        <p>发票内容</p>
        <ul class="content-list">
          <li v-for="(item,index) in invoice" :data-type="item.id" :class="{'on':item.flag}" @click="select(index)">
            <span>{{ item.name }}</span>
            <i></i>
          </li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <a href="javascript:" @click="confirm">确认</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>