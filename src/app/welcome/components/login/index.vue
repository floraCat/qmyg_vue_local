<template>
  <div class="login-page">
    <app-title title="用户登录"></app-title>

    <form class="form" ref="form" @submit.prevent="submit">
      <div class="input-group">
        <span>账号：</span>
        <div class="input">
          <input type="text" v-model="username" ref="username" placeholder="用户名/手机号/邮箱">
          <i v-show="0 < username.length" class="icon icon-close3" @click="handleClean('username')"></i>
        </div>
      </div>

      <div class="input-group">
        <span>密码：</span>
        <div class="input pass">
          <input type="password" v-model="password" ref="password" placeholder="请输入密码">
          <i v-show="0 < password.length" class="icon icon-close3" @click="handleClean('password')"></i>
        </div>
        <i class="icon icon-eye" :class="{ active: !passType }" @click="showpass"></i>
      </div>

      <div class="tips">
        <router-link :to="{ name: 'welcome.MfindpwdOne' }">忘记密码？</router-link>
      </div>

      <div class="login-submit">
        <button type="button" @click="handleSubmit">登 录</button>
      </div>

    </form>

    <router-link :to="{ name: 'welcome.Register' }" class="register">新用户注册</router-link>

    <div class="footer">
      <i class="icon icon-logo"></i>
      <span>深圳全民易购贸易有限公司</span>
    </div>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>