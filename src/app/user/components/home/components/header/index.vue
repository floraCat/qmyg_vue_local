<template>
  <div class="user_header">
    <div>
      <router-link :to="{ name: 'user.Profile' }">
        <img :src="user.user_picture" :alt="user.user_name">
        <span v-text="user.member_number"></span>
      </router-link>
      <div class="user_info_box">
        <p v-text="user.user_name">baby2</p>
        <router-link v-if="'未开通' == user.team_shopping" :to="{ name: 'pay.Team' }" tag="i" class="sp sp-icon_normal"></router-link>
        <i v-if="'未开通' != user.team_shopping" class="sp sp-icon_normal on"></i>
        <p v-if="'未开通' == user.team_shopping" class="tips">
          <span>未开通团队消费收益</span>
          <router-link :to="{ name: 'pay.Team' }">开通</router-link>
        </p>
        <p>推荐人：<span class="user_superior" v-text="user.parent_user"></span></p>
        <p>已成为<span v-text="user.user_type"></span><span class="user_day" v-text="user.days"></span>天</p>
        <p>共享助力：<span v-text="user.vip_time"></span></p>
      </div>
    </div>
    <div class="header_btn_box">
      <router-link :to="{ name: 'user.Msglists' }" tag="a">
        <i class="user_msg"></i>
        <span v-if="0 < message"></span>
      </router-link>
      <router-link :to="{ name: 'user.Profile' }" tag="a">
        <i class="user_setting"></i>
      </router-link>
    </div>

    <div class="tips" v-if="tips">
      <i class="icon icon-close2" @click="closeTips()"></i>
      <div class="list">
        <app-swiper>
          <a href="javascript:;" class="item">亲，您尚有未付款订单，点击付款……</a>
          <a href="javascript:;" class="item">亲，最近一个月您订单未评价，点击评价……</a>
        </app-swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>