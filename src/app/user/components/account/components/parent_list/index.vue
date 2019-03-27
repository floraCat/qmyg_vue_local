<template>
  <div class="parent-list-page">
    <app-title title="团队代付申请"></app-title>
      <div class="parent-list-content">
        <ul class="list">
          <li v-for="(item, index) in items" class="item"><em>07-11 05:00</em>
            <div class="body">
              <div class="pic"><img :src="item.avatar" :alt="item.avatar"></div>
              <div class="info">
                <h2 class="title">团队成员{{ item.user_name }} 申请代开通大创客，快帮人家付款吧。</h2>
                <p class="remark">注：如果同意支付将从账户自动扣除易购豆</p>
                <!-- <a v-if="1 === item.status" href="javascript:;" class="btn" :class="{ ok : 1 === item.status }">已支付</a> -->
                <a href="javascript:;" class="btn" v-on:click="handlePay(item.pid)">同意并支付</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div :class="{ active: isPay }" class="mask">
        <div class="mask-main">
          <div class="head">您当前有可用易购豆
            <p>{{ ygcoin }}</p>
          </div>
          <div class="body">
            <div class="text">是否同意支付？</div>
            <div class="btn-group">
              <button type="button" v-on:click="handleClose" class="button close">取消</button>
              <button type="button" v-on:click="submit" class="button">确定</button>
            </div>
          </div>
        </div>
      </div>
      <div :class="{ active: isFail }" class="mask">
        <div class="mask-main fail">
          <div class="head">您当前有可用易购豆
            <p>{{ ygcoin }}</p>
          </div>
          <div class="body">
            <div class="text">请赚够了再来哦~</div>
            <div class="btn-group">
              <button type="button" v-on:click="handleClose" class="button">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>