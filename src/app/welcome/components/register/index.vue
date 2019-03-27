<template>
  <div class="register-page">
    <app-title :title="title"></app-title>

    <form class="form" ref="form" @submit.prevent="submit">
      <div class="input-group">
        <i class="icon icon-phone"></i>
        <div class="input phone">
          <input vd-validate
            type="text"
            vd-type="phone"
            v-model="phone"
            vd-notify='{
              "text": "手机号码不能为空",
              "patt": "手机号码格式不正确"
            }'
            placeholder="请输入11位手机号码">
          <i v-show="0 < phone.length" class="icon icon-close3" @click="handleClean('phone')"></i>
        </div>

        <phone-code title="发送验证码" :phone="phone"></phone-code>
      </div>

      <div class="input-group">
        <i class="icon icon-email"></i>
        <div class="input">
          <input type="text" v-model="key" ref="key" placeholder="请输入短信验证码">
          <i v-show="0 < key.length" class="icon icon-close3" @click="handleClean('key')"></i>
        </div>
      </div>

      <div class="input-group">
        <i class="icon icon-key"></i>
        <div class="input pass">
          <input type="password" v-model="password" ref="password" placeholder="请设置6-20位登录密码">
          <i v-show="0 < password.length" class="icon icon-close3" @click="handleClean('password')"></i>
        </div>
        <i class="icon icon-eye" @click="showpass"></i>
      </div>

      <div class="input-group">
        <i class="icon icon-qrcode"></i>
        <div class="input">
          <input type="text" v-model="qrcode" ref="qrcode" placeholder="请输入推荐码（可选）">
          <i v-show="0 < qrcode.length" class="icon icon-close3" @click="handleClean('qrcode')"></i>
        </div>
      </div>

      <div class="checkbox">
        <label :class="{ checked: checked }" v-on:click="hanldeCheck">
          我已阅读并同意《
          <router-link :to="{ name: 'agreement.Register' }">用户注册协议</router-link>
          》
        </label>
      </div>

      <div class="register-submit">
        <button :class="{ notick: false === checked }" :disabled="false === checked">{{ btnText }}</button>
      </div>
    </form>

    <div class="login-link">
      已有账号，
      <router-link :to="{ name: 'welcome.Login' }">点此登录</router-link>
    </div>


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