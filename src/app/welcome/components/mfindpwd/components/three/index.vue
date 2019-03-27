<template>
  <div class="mfindpwd-three">
    <app-title title="设置新密码"></app-title>

    <form class="form" ref="form" @submit.prevent="submit">
      <div class="input-group">
        <div class="input pass">
          <input vd-validate
            type="password"
            v-model="password"
            name="password"
            ref="password"
            vd-notify="请输入新密码"
            placeholder="请输入新密码">
          <i v-show="0 < password.length" class="icon icon-close3" @click="handleClean('password')"></i>
        </div>
        <i class="icon icon-eye" :class="{ active: showpass1 }" @click="showpass('password')"></i>
      </div>

      <div class="input-group">
        <div class="input pass">
          <input vd-validate
            type="password"
            v-model="password1"
            name="password1"
            ref="password1"
            vd-notify="请再次输入新密码"
            placeholder="请再次输入新密码">
          <i v-show="0 < password1.length" class="icon icon-close3" @click="handleClean('password1')"></i>
        </div>
        <i class="icon icon-eye" :class="{ active: showpass2 }" @click="showpass('password1')"></i>

      </div>

      <div class="login-submit">
        <button type="button" @click="handleNextSubmit">确认修改</button>
      </div>

    </form>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>