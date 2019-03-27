<template>
  <div class="realname-wrapper">
    <app-title title="实名认证"></app-title>
    <div class="content">
      <form class="form" ref="form" @submit.prevent="submit">
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>真实姓名：</div>
          <div class="input-box">
            <input vd-required
              v-model="userName"
              type="text"
              vd-notify='{
                "text": "请输入姓名",
                "patt": "姓名格式不正确"
              }'
              placeholder="请输入姓名">
            <i class="icon-close2" v-show="0 < userName.length" @click="close('userName')"></i>
          </div>
        </div>
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>身份证号：</div>
          <div class="input-box">
            <input vd-required
              vd-validate
              type="text"
              vd-type="identity"
              v-model="idNumber"
              vd-notify='{
                "text": "请正确填写证件号码",
                "patt": "证件号码格式不正确"
              }'
              placeholder="请输入身份证号码">
            <i class="icon-close2" v-show="0 < idNumber.length" @click="close('idNumber')"></i>
          </div>
        </div>
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>所在地区：</div>
          <div class="input-box input-select" @click="addrSel">
            <span>{{ address }}</span>
            <i class="icon icon-enter"></i>
          </div>
        </div>
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>手机号码：</div>
          <div class="input-box">
            <input vd-required
              vd-validate
              type="text"
              vd-type="phone"
              v-model="phone"
              vd-notify='{
                "text": "请输入手机号码",
                "patt": "手机号码格式不正确"
              }'
              placeholder="请输入手机号码">
            <i class="icon-close2" v-show="0 < phone.length" @click="close('phone')"></i>
          </div>
        </div>
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>短信验证码：</div>
          <div class="input-box">
            <input type="text" v-model="valiCode" placeholder="请输入短信验证码">
            <i class="icon-close2" v-show="0 < valiCode.length" @click="close('valiCode')"></i>
          </div>
          <phone-code class="get-code" title="获取验证码" :phone="phone"></phone-code>
        </div>
        <div class="submit">
          <button type="submit">下一步</button>
        </div>
        <div class="explain-wrapper">
          <span>请保证姓名、证件持有人、银行卡开户人为同一人</span>
        </div>
      </form>
    </div>

    <app-address-select></app-address-select>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>