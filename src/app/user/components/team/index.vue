<template>
  <div id="user_team">
    <app-title title="我的团队"></app-title>
    <div class="team_header">
      <span :class="{ active: 1 === type }" @click="handleChangeType(1)">普通用户</span>
      <span :class="{ active: 2 === type }" @click="handleChangeType(2)">大创客团队</span>
    </div>
    <div class="num">普通用户人数：<span v-text="teamList.length"></span></div>
    <ul v-show="0 < teamList.length" class="team_main">
      <li v-for="(item, index) in teamList" v-bind:key="index">
        <span>
          <img v-bind:src="item.user_picture">
        </span>
        <span>
          <p class="nickname">昵称：<span v-text="item.nick_name"></span></p>
          <p>注册时间：<span v-text="item.reg_time"></span></p>
          <p>共享助力：<span v-text="item.vip_time"></span></p>
          <p>团队消费：<span v-text="item.team_shopping"></span></p>
        </span>
        <span>
          <span>TA粉丝</span>
          <span v-text="item.team"></span>
          <span v-text="item.city"></span>
          <span>
            <a href="#">
              <i class="icon icon-chat"></i>
              聊天
            </a>
          </span>
        </span>
      </li>
    </ul>
    <app-wait v-show="loading"></app-wait>
    <div v-show="0 >= teamList.length && !loading" class="no_team_wrap">
      <img src="~assets/images/no_team_icon.png" alt="">
      <span>没有成功的个人，只有成功的团队</span>
    </div>
    <a v-show="0 >= teamList.length" class="bottom_null_logo" href="#">
      <i></i>
      <span>深圳全民易购贸易有限公司</span>
    </a>
    <app-gotop></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>