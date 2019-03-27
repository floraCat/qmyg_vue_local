<template>
  <footer class="eFoot">
    <li :class="{on: 1===tabOn}">
      <router-link :to="{ name: 'home.Home' }" class="nav home">
        <i class="i1 icon-home"></i>
        <i class="i2 icon-home_fill"></i>
        <span>首页</span>
      </router-link>
    </li>
    <li :class="{on: 2===tabOn}">
      <router-link :to="{ name: 'home.Class' }" class="nav cats">
        <i class="i1 icon-search"></i>
        <i class="i2 icon-search_fill"></i>
        <span>分类</span>
      </router-link>
    </li>
    <li :class="{on: 3===tabOn}">
      <router-link :to="{ name: 'home.Cart'}" class="nav cart">
        <i class="i1 icon-cart"></i>
        <i class="i2 icon-cart_fill"></i>
        <span>购物车</span>
        <em class="num" v-if="cart_nums" v-text="cart_nums"></em>
      </router-link>
    </li>
    <li :class="{on: 4===tabOn}">
      <router-link :to="{ name: 'user.IncomeDetail' }" class="nav profit">
        <i class="i1 icon-order"></i>
        <i class="i2 icon-order_fill"></i>
        <span>我的收益</span>
        <em class="num" v-if="incom_nums" v-text="incom_nums"></em>
      </router-link>
    </li>
    <li :class="{on: 5===tabOn}">
      <router-link :to="{ name: 'user.Home' }" class="nav user">
        <i class="i1 icon-user"></i>
        <i class="i2 icon-user_fill"></i>
        <span>个人中心</span>
      </router-link>
    </li>
  </footer>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>