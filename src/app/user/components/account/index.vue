<template>
  <div id="user_account">
    <app-title title="资金管理"></app-title>
      <div class="account_top">
        <div class="money">
          <div class="money-num">
            <p>累计收益总额</p>
            <h1 v-text="items.money"></h1>
          </div>
        </div>
        <!-- <p>可用易购豆：<span v-text="items.egdou"></span></p> -->
        <ul class="items">
          <li class="item item-01">
            余额：{{ items.money }}
            <router-link :to="{ name: 'user.Raply', query: { type: 1 } }">
              提现
            </router-link>
          </li>
          <li class="item item-02">
            可提现易购豆：{{ items.money }}
            <router-link :to="{ name: 'user.Raply', query: { type: 0 } }">
              提现
            </router-link>
          </li>
          <li class="item item-03">
            消费型易购豆：{{ items.egdou_total }}
          </li>
        </ul>
      </div>

      <div class="menu">
        <router-link :to="{ name: 'user.SendPoints' }" class="item item-01">
          易购豆互转
        </router-link>
        <router-link :to="{ name: 'user.ActiveFriend' }" class="item item-02">
          代开通共享助力
        </router-link>
      </div>

      <ul class="account_bot">
        <li>
          <router-link :to="{ name: 'user.CardList' }">
            提现账号
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.AccountList', query: { type: 0 } }">
            账户明细
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.AccountList', query: { type: 1 } }">
            易购豆明细
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.ApplyRecord' }">
            提现申请记录
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.ParentList' }">
            团队代付申请
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>