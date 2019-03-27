<template>
  <div id="user_withdtawals_detail">
    <app-title title="详情"></app-title>
    <app-wait v-if="waite"></app-wait>
    <div class="detail_con" v-show="showPage">
      <div>
        <p>
          <span>提现</span>
          <span class="normal_span gray_span" v-text="detail.add_time"></span>
        </p>
        <p>
          <span v-text="detail.amount"></span>
          <span class="normal_span red_span" v-text="detail.status_text"></span>
        </p>
      </div>
      <ul>
        <li>
          <p>
            {{ detail.pay_name }}<span class="normal_span gray_span">手续费：[<span v-text="detail.rate"></span>]</span>
          </p>
        </li>
        <li>
          <p>会员备注</p>
          <span class="normal_span gray_span" v-text="detail.user_note">asda</span>
        </li>
        <li>
          <p>管理员备注</p>
          <span class="normal_span gray_span" v-text="detail.admin_note">asf</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>