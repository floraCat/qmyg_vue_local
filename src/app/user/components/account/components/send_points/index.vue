<template>
  <div class="send-points-page">
    <app-title title="易购豆互转"></app-title>

    <div class="tips head">
      <p>您账户可用易购豆：<span>50000</span></p>
    </div>
    <div class="form-group">
      <div class="title">转出数量</div>
      <div class="input-group"><span>￥</span>
        <input type="text" placeholder="请输入您要转出的易购豆数量">
      </div>
      <div class="input-group"><span>对方账户</span>
        <input type="text" placeholder="请输入对方平台的编号" class="user_id">
        <div class="btn">验证好友</div>
      </div>
    </div>
    <div class="tips bot">转出易购豆必须为10的倍数</div>
    <div class="button">
      <button type="button">确认转出</button>
    </div>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>