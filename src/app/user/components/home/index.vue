<template>
  <div class="user-page">
    <app-header :message="formTemp.message"></app-header>
    <ul class="nav-list">
      <li class="item">
        <router-link :to='{ name: "user.Order", query: {status : 100} }'>
          <i class="icon icon-no-payment"></i>
          <h3>待付款</h3>
          <span v-if="formTemp.wait_pay" v-text="formTemp.wait_pay" class="num"></span>
        </router-link>
      </li>
      <li class="item">
        <router-link :to='{ name: "user.Order", query: {status : 101} }'>
          <i class="icon icon-no-delivery"></i>
          <h3>待发货</h3>
          <span v-if="formTemp.wait_shipping" v-text="formTemp.wait_shipping" class="num"></span>
        </router-link>
      </li>
      <li class="item">
        <router-link :to='{ name: "user.Order", query: {status : 105} }'>
          <i class="icon icon-no-delivery"></i>
          <h3>待收货</h3>
          <span v-if="formTemp.wait_receive" v-text="formTemp.wait_receive" class="num"></span>
        </router-link>
      </li>
      <li class="item">
        <router-link :to='{ name: "user.Order", query: {status : 102} }'>
          <i class="icon icon-evaluate"></i>
          <h3>待评价</h3>
          <span v-if="formTemp.wait_comment" v-text="formTemp.wait_comment" class="num"></span>
        </router-link>
      </li>
      <li class="item">
        <router-link :to='{ name: "user.Refound" }'>
          <i class="icon icon-return"></i>
          <h3>退换货</h3>
          <span v-if="formTemp.return_change" v-text="formTemp.return_change" class="num"></span>
        </router-link>
      </li>
    </ul>

    <div class="user_menu">
      <div class="user_menus_top">
        <router-link :to="{ name: 'user.IncomeDetail' }" tag="div">
          <div></div>
          <div>
            <a href="#">
              <b class="icon_user_shouyi"></b>我的收益
            </a>
          </div>
        </router-link>
        <router-link :to="{ name: 'user.Account' }" tag="div">
          <div></div>
          <div>
            <a href="#">
              <b class="icon_user_qianbao"></b>我的钱包
            </a>
          </div>
        </router-link>
      </div>
      <ul class="clearfix">
        <li>
          <router-link :to="{ name: 'user.Team' }" tag="div">
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_tuandui"></b>我的团队
              </a>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.ExtendCode' }" tag="div">
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_tuigaung"></b>推广二维码
              </a>
            </div>
          </router-link>
        </li>
        <li>
          <div>
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_ruzhu"></b>商家店铺
              </a>
            </div>
          </div>
        </li>
        <li>
          <router-link :to="{ name: 'home.Supplychain' }" tag="div">
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_gongying"></b>超级供应链
              </a>
            </div>
          </router-link>
        </li>
        <li>
          <div>
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_kaidian"></b>
                我要开店
              </a>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div></div>
            <div>
              <a href="http://partner.eggou.com/index.php?g=&m=Index&a=partnerRegister">
                <b class="icon_user_hehuo"></b>合伙人申请
              </a>
            </div>
          </div>
        </li>
        <li>
          <router-link :to="{ name: 'user.Order' }" tag="div">
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_dingdan"></b>全部订单
              </a>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user.Help' }" tag="div">
            <div></div>
            <div>
              <a href="#">
                <b class="icon_user_bangzhu"></b>帮助中心
              </a>
            </div>
          </router-link>
        </li>
        <li>
          <div>
            <div></div>
            <div>
              <router-link :to="{ name: 'user.Service' }">
                <b class="icon_user_kefu"></b>联系客服
              </router-link>
            </div>
          </div>
        </li>
      </ul>
      <p>更多推荐</p>
    </div>

    <div class="recommend">
      <img src="~assets/images/ash_icon9.jpg" class="ad-pic" alt="品牌推荐">

      <div class="layout-list">
        <app-layout-topic v-for="(topic, index) in items_topics" :items="topic" v-bind:key="index"></app-layout-topic>
      </div>

      <a href="#">
        <img src="~assets/images/14957937553300.jpg" class="ad-pic" alt="底部">
      </a>
    </div>

    <app-gotop></app-gotop>
    <app-footer></app-footer>
    <app-tips :referer="referer"></app-tips>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>