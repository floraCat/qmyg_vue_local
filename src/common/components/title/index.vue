<template>
  <div class="header-title">
    <div class="mask" :class="{'on':flag}" @click="toggle" @touchstart="toggle"></div>
    <div class="box">
      <a class="back" href="javascript:" @click="goBack"></a>
      <div class="title" v-text="title"></div>
      <i class="icons" @click="toggle"></i>
    </div>
    <div class="menus" :class="{'on':flag}">
      <ul class="menus-list">
        <li class="menus-item">
          <router-link :to="{ name: 'home.Home' }">
            <i class="icon-home2"></i>
            <span>商城首页</span>
          </router-link>
        </li>
        <li class="menus-item">
          <router-link :to="{ name: 'home.Class' }">
            <i class="icon-cats"></i>
            <span>商品分类</span>
          </router-link>
        </li>
        <li class="menus-item">
          <router-link :to="{ name: 'user.IncomeDetail' }">
            <i class="icon-order2"></i>
            <span>我的收益</span>
          </router-link>
        </li>
        <li class="menus-item">
          <router-link :to="{ name: 'user.Home' }">
            <i class="icon-user2"></i>
            <span>个人中心</span>
          </router-link>
        </li>
        <li class="menus-item">
          <a href="javascript:" @click="logout">
            <i class="icon-shop"></i>
            <span>退出登录</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>