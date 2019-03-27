<template>
  <div class="edit-address-wrapper">
    <app-title title="编辑收货地址"></app-title>
    <div class="content">
      <form class="form" ref="form" @submit.prevent="submit">
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>收货人：</div>
          <div class="input-box">
            <input vd-required
              type="text"
              v-model="username"
              name="username"
              vd-notify='{
                "text": "收货人不能为空"
              }'
              placeholder="请输入收货人姓名">

            <i class="icon-close2" v-show="0 < username.length" @click="close('username')"></i>
          </div>
        </div>
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>手机号码：</div>
          <div class="input-box">
            <input vd-required
              vd-validate
              v-model="phone"
              type="text"
              vd-type="phone"
              vd-notify='{
                "text": "手机号码不能为空",
                "patt": "手机号码格式不正确"
              }'
              placeholder="请输入联系电话">

            <i class="icon-close2" v-show="0 < phone.length" @click="close('phone')"></i>
          </div>
        </div>
        <div class="input-wrapper">
          <div class="title-box"><span>*</span>所在地区：</div>
          <div class="input-box input-region" v-on:click="handleSelectCity">
            <span class="region">{{ address }}</span>
          </div>
          <div class="icon">
            <i class="icon-enter"></i>
          </div>
        </div>
        <div class="input-wrapper bottom">
          <div class="title-box"><span>*</span>详细地址：</div>
        </div>
        <div class="input-wrapper top">
          <div class="input-box">
            <input vd-required
              v-model="region"
              vd-notify='{
                "text": "详细地址不能为空"
              }'
              type="text"
              placeholder="请正确填写详细地址" >
            <i class="icon-close2" v-show="0 < region.length" @click="close('region')"></i>
          </div>
        </div>
        <div class="submit">
          <button>保存</button>
        </div>
      </form>
    </div>

    <app-address></app-address>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>