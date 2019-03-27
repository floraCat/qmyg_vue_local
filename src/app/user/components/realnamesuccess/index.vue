<template>
  <div class="realnamesuccess-wrapper">
    <app-title title="实名认证"></app-title>
    <div class="content">
      <div class="prompt">
        <img src="~assets/images/profile/approve-succeed-logo.png" alt="">
      </div>
      <div class="approve">
        <div class="title">
          <img src="~assets/images/profile/approveMasgges.png" alt="">
        </div>
        <div class="approve-box">
          <ul>
            <li>
              <i class="icon-user2"></i>
              <span>真实姓名：<em>{{ formTemp.real_name }}</em></span>
            </li>
            <li>
              <i class="icon-card"></i>
              <span>证件类型：<em>身份证</em></span>
            </li>
            <li>
              <i class="icon-card_id"></i>
              <span>证件号码：<em>{{ formTemp.self_num }}</em></span>
            </li>
            <li>
              <i class="icon-province"></i>
              <span>省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：<em>{{ formTemp.province }}</em></span>
            </li>
            <li>
              <i class="icon-city"></i>
              <span>城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：<em>{{ formTemp.city }}</em></span>
            </li>
            <li>
              <i class="icon-phone"></i>
              <span>绑定手机：<em>{{ formTemp.bank_mobile }}</em></span>
            </li>
            <li>
              <i class="icon-real_time"></i>
              <span>认证时间：<em>{{ formTemp.validate_time }}</em></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>