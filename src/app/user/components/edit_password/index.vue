<template>
  <div class="editpassword-wrapper">
    <app-title title="修改密码"></app-title>
    <div class="content">
      <div class="input-wrapper" v-for="(item,index) in placeholder">
        <div class="input-box">
          <input type="password" v-if="!eye[index]" :placeholder="item" v-model="value[index]" @input="input(index)">
          <input type="text" v-if="eye[index]" :placeholder="item" v-model="value[index]" @input="input(index)">
          <i class="icon icon-key"></i>
          <i class="icon-close2" v-show="closeflag[index]" @click="close(index)"></i>
          <i class="icon-eye" :class="{'on':eye[index]}" @click="see(index)"></i>
        </div>
      </div>
      <div class="forget">
        <router-link :to="{ name: 'welcome.MfindpwdOne' }">忘记密码？</router-link>
      </div>
      <div class="submit">
        <a href="javascript:" @click="submit">确认修改</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>