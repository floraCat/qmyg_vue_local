<template>
  <div class="mfindpwd-two">
    <app-title title="获取验证码"></app-title>

    <form class="form" ref="form" @submit.prevent="submit">
      <div class="input-group">
        <span>用户名：</span>
        <div class="input">
          <span>{{ username }}</span>
        </div>
      </div>

      <div class="input-group">
        <span>手机号码：</span>
        <div class="input">
          <span>{{ phone }}</span>
        </div>
      </div>

      <div class="input-group pass">
        <span>验证码：</span>
        <div class="input pass">
          <input type="text" v-model="code" ref="code" placeholder="请输入验证码">
        </div>

        <phone-code title="发送验证码" :phone="phone"></phone-code>
      </div>

      <div class="login-submit">
        <button type="button" @click="handleSubmit">下一步</button>
      </div>

    </form>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>