<template>
  <div id="user_apply_record">
    <app-title title="提现申请记录"></app-title>
    <app-wait v-if="waite"></app-wait>
    <ul class="apply_record_con" v-show="showPage">
      <scroller :on-refresh="refresh" :on-infinite="infinite" :active="formTemp.data" class="scroller" off-height="3.45" ref="swiperObj">
        <li v-for="(item, index) in formTemp.data" v-bind:key="index" class="item">
          <router-link :to="{ name: 'user.AccountDetail', params: { id: item.id } }">
            <p>
              <span v-text="item.pay_status"></span>
              <span v-text="item.add_time" class="normal_span gray_span"></span>
            </p>
            <p>
              <span v-text="item.amount"></span>
              <span v-text="item.pay_status" class="normal_span red_span"></span>
            </p>
          </router-link>
        </li>
      </scroller>
    </ul>
    <app-gotop :swiperObj="swiperObj" :watch="formTemp"></app-gotop>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>