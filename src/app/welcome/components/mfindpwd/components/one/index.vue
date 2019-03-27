<template>
  <div class="mfindpwd-one">
    <app-title title="找回密码"></app-title>

    <form class="form" ref="form" @submit.prevent="submit">
      <div class="input-group">
        <div class="input">
          <input vd-validate
            type="text"
            v-model="username"
            name="username"
            ref="username"
            vd-notify="请输入用户名/手机号/邮箱"
            placeholder="用户名/手机号/邮箱">
          <i v-show="0 < username.length" class="icon icon-close3" @click="handleClean('username')"></i>
        </div>
      </div>

      <div class="input-group">
        <div class="input pass">
          <input vd-validate
            type="text"
            v-model="verify"
            name="verify"
            ref="verify"
            vd-notify="请输入验证码"
            placeholder="请输入验证码">
          <i v-show="0 < verify.length" class="icon icon-close3" @click="handleClean('verify')"></i>
        </div>

        <img :src="captchaUrl" ref="captcha" alt="验证码" @click="getCaptcha">
      </div>

      <div class="login-submit">
        <button type="button" @click="handleNextSubmit">下一步</button>
      </div>

    </form>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>