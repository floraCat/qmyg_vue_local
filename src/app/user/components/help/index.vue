<template>
  <div id="user_help">
    <app-title title="帮助中心"></app-title>
    <ul class="help_list">
      <li>
        <a href="http://file.api.b.qq.com/bl/cgi-bin/bar/extra/jump2pa?uin=938066090&account_flag=0&jumptype=1&card_type=crm">
          <b></b>
          <span>客服服务</span>
          <i></i>
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'user.CompanyMedal' }">
          <b></b>
          <span>公司荣誉</span>
          <i></i>
        </router-link>
      </li>
      <li>
        <a href="http://e.eqxiu.com/s/3OVvkPCL?eqrcode=1&from=timeline&isappinstalled=0">
          <b></b>
          <span>自由合伙人</span>
          <i></i>
        </a>
      </li>
      <li>
        <router-link :to="{name: 'user.VideoExplain'}">
          <b></b>
          <span>媒体报道</span>
          <i></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>