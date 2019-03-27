<template>
  <div class="msg-page">
    <app-title title="消息中心"></app-title>
    <div class="msg-box">
      <!-- <scroller :on-refresh="refresh" :on-infinite="infinite"> -->

        <ul class="msg-list">
          <scroller :on-refresh="refresh">
            <router-link :to="{ name: 'user.Express' }" tag="li" class="item">
                <div class="item-pic">
                  <img src="~assets/images/cus_info_icon5.png" alt="物流信息">
                  <span v-if="0 < express">{{ express }}</span>
                </div>
                <div class="item-title">物流信息</div>
            </router-link>

            <router-link :to="{ name: 'user.Activity' }" tag="li" class="item">
              <div class="item-pic">
                <img src="~assets/images/cus_info_icon6.png" alt="促销活动">
                <span v-if="0 < topic">{{ topic }}</span>
              </div>
              <div class="item-title">促销活动</div>
            </router-link>

            <router-link :to="{ name: 'user.Notice' }" tag="li" class="item">
              <div class="item-pic">
                <img src="~assets/images/cus_info_icon7.png" alt="商城公告">
                <span v-if="0 < announce">{{ announce }}</span>
              </div>
              <div class="item-title">商城公告</div>
            </router-link>

            <router-link :to="{ name: 'user.Service' }" tag="li" class="item">
              <div class="item-pic">
                <img src="~assets/images/cus_info_icon8.png" alt="客服咨询">
                <span v-if="0 < custom_service">{{ custom_service }}</span>
              </div>
              <div class="item-title">
                客服咨询
                <span>点击查看客服信息</span>
              </div>
            </router-link>

            <router-link :to="{ name: 'user.Income' }" tag="li" class="item">
              <div class="item-pic">
                <img src="~assets/images/cus_info_icon9.png" alt="我的收益">
                <span v-if="0 < income">{{ income }}</span>
              </div>
              <div class="item-title">我的收益</div>
            </router-link>

            <router-link :to="{ name: 'user.Voucher' }" tag="li" class="item">
              <div class="item-pic">
                <img src="~assets/images/cus_info_icon10.png" alt="支付凭证">
                <span v-if="0 < pay_order">{{ pay_order }}</span>
              </div>
              <div class="item-title">
                支付凭证
                <span>点击查看支付凭证</span>
              </div>
            </router-link>
          </scroller>

        </ul>
      <!-- </scroller> -->
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>