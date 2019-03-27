<template>
  <div class="profile-wrapper">
    <app-title title="用户资料"></app-title>
    <div class="content">
      <div class="avatar">
          <cropper :cropImg="user.user_picture" :cropAlt="user.user_name" cropType="user"></cropper>
      </div>
      <ul class="detail">
        <li>
          <a href="javascript:">
            <div class="icon">
              <img src="~assets/images/profile/user.png" alt="">
            </div>
            <div class="title">
              <span>用户名</span>
            </div>
            <div class="text">
              <span>{{ user.user_name }}</span>
            </div>
          </a>
        </li>
        <li @click="switchNick">
          <a href="javascript:">
            <div class="icon">
              <img src="~assets/images/profile/nickname.png" alt="">
            </div>
            <div class="title">
              <span>昵称</span>
            </div>
            <div class="text">
              <span>{{ user.nick_name }}</span>
            </div>
            <i class="icon-enter"></i>
          </a>
        </li>
        <li @click="switchSex">
          <a href="javascript:">
            <div class="icon">
              <img src="~assets/images/profile/sex.png" alt="">
            </div>
            <div class="title">
              <span>性别</span>
            </div>
            <div class="text">
              <span>{{ user.role | gender }}</span>
            </div>
            <i class="icon-enter"></i>
          </a>
        </li>
        <li @click="switchPhone">
          <a href="javascript:">
            <div class="icon">
              <img src="~assets/images/profile/phone.png" alt="">
            </div>
            <div class="title">
              <span>手机</span>
            </div>
            <div class="text">
              <span>{{ user.mobile_phone }}</span>
            </div>
            <i class="icon-enter"></i>
          </a>
        </li>
        <li>
          <router-link :to="{ name: 'user.EditPassword'}">
            <div class="icon">
              <img src="~assets/images/profile/password.png" alt="">
            </div>
            <div class="title">
              <span>修改密码</span>
            </div>
            <i class="icon-enter"></i>
          </router-link>
        </li>
        <li v-if="!user.real">
          <router-link :to="{ name: 'user.Realname' }">
            <div class="icon">
              <img src="~assets/images/profile/falseReal.png" alt="">
            </div>
            <div class="title">
              <span>实名认证</span>
            </div>
            <i class="icon-enter"></i>
          </router-link>
        </li>
        <li v-if="user.real">
          <router-link :to="{ name: 'user.RealnameSuccess' }">
            <div class="icon">
              <img src="~assets/images/profile/trueReal.png" alt="">
            </div>
            <div class="title">
              <span>已实名认证</span>
            </div>
            <i class="icon-enter"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.Address' }">
            <div class="icon">
              <img src="~assets/images/profile/adress.png" alt="">
            </div>
            <div class="title">
              <span>收货地址</span>
            </div>
            <i class="icon-enter"></i>
          </router-link>
        </li>
        <li>
          <a href="javascript:">
            <div class="icon">
              <img src="~assets/images/profile/date.png" alt="">
            </div>
            <div class="title">
              <span>关注时间</span>
            </div>
            <div class="text">
              <span v-text="user.reg_time"></span>
            </div>
          </a>
        </li>
      </ul>
      <div class="sign-out">
        <a href="javascript:" v-on:click="logout">退出登陆</a>
      </div>
    </div>
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
      <app-nickname :nickFlag="bf" v-if="bf.nf"></app-nickname>
    </transition>
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
      <app-sex :sexFlag="bf" v-if="bf.sf"></app-sex>
    </transition>
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
      <app-phone :phoneFlag="bf" v-if="bf.pf"></app-phone>
    </transition>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>