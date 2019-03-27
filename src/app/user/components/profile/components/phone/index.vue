<template>
  <div class="phone-wrapper">
  	<div class="header">
  		<i @click="switchPhone"></i>
	  	<div class="title">
	  		<span>修改手机</span>
	  	</div>
  	</div>
  	<div class="content">
      <form class="form" ref="form" @submit.prevent="submit">
    		<div class="phone-box">
          <div class="phone-info">
            <div class="phone">
              <input vd-required
                vd-validate
                type="text"
                vd-type="phone"
                v-model="phone"
                vd-notify='{
                  "text": "手机号码不能为空",
                  "patt": "手机号码格式不正确"
                }'
                placeholder="请输入11位手机号码">

              <i class="icon-phone"></i>
              <i class="icon-close2" v-show="0 < phone.length" @click="close('phone')"></i>
            </div>
            <phone-code title="发送验证码" :phone="phone" class="phone-code"></phone-code>
          </div>
          <div class="code-info">
            <div class="code">
              <input vd-required
                v-model="valiCode"
                type="text"
                vd-notify='{
                  "text": "验证码不能为空"
                }'
                placeholder="请输入短信验证码">
              <i class="icon-email"></i>
              <i class="icon-close2" v-show="0 < valiCode.length" @click="close('valiCode')"></i>
            </div>
          </div>
        </div>
    		<div class="btn">
  	  		<button type="submit">确认</button>
  	  		<button type="button" @click="switchPhone">取消</button>
  	  	</div>
      </form>
  	</div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>