<template>
  <div id="income_detail">
    <app-title title="我的收益"></app-title>
    <div class="detail_scroll">
      <scroller :on-refresh="refresh" ref="my_scroller">
        <div class="detail_body">
          <div class="detail_top">
            <div class="top_canvas">
              <canvas id="detail_bg" ref="detail_bg"></canvas>
              <canvas id="detail_scale"></canvas>
              <canvas id="detail_data"></canvas>
            </div>
            <p class="detail_total">总收益</p>
            <p class="detail_num">¥<span v-text="totalData.totalmoney"></span></p>
            <p class="detail_time">更新时间：<span v-text="time">loading...</span></p>
            <div class="income_fans_total">
              <div>
                <p>新增用户</p>
                <p v-text="totalData.user_new"></p>
              </div>
              <div>
                <p>活跃用户</p>
                <p v-text="totalData.user_act"></p>
              </div>
              <p>
                本数据更新于<span v-text="time">loading...</span><br>
                高峰期间数据展示会有延迟，但不影响佣金统计
              </p>
            </div>
            <div class="top_info" id="top_info">
              <router-link :to="{ name: 'user.Profile'}">
                <div>
                  <img v-lazy="userData.user_picture" alt="">
                  <span v-text="userData.user_name"></span>
                </div>
              </router-link>
              <router-link :to="{ name: 'user.IncomeList'}" tag="button">
                收益明细
              </router-link>
            </div>
          </div>
          <div class="detail_data">
            <ul class="clearfix">
              <li>
                <router-link tag="div" :to="{name: 'user.MicroShare'}" class="first_div">
                  <p><i class="detail_week"></i>新人微共享</p>
                  <p>易购豆 : {{totalData.new}}</p>
                </router-link>
              </li>
              <li>
                <router-link tag="div" :to="{name: 'user.IncomeDirect'}" class="sec_div">
                  <p><i class="detail_mounth"></i>团队直推收益</p>
                  <p>余额 : ¥{{totalData.spread}}</p>
                </router-link>
              </li>
              <li>
                <router-link tag="div" :to="{name: 'user.IncomeShare'}" class="third_div">
                  <p><i class="detail_settled"></i>团队共享收益</p>
                  <p>易购豆 : {{totalData.team}}</p>
                </router-link>
              </li>
              <li>
                <router-link tag="div" :to="{name: 'user.IncomeShop'}" class="forth_div">
                  <p><i class="detail_unsettled"></i>店铺收益</p>
                  <p>易购豆 : {{totalData.shop}}</p>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="income_con_bot">
            <router-link tag="div" :to="{name: 'user.IncomeConsume'}">
              <p><i class="detail_team"></i>团队消费收益</p>
              <p>易购豆 : {{totalData.team_shopping}}</p>
            </router-link>
            <router-link tag="div" :to="{name: 'user.BalanceDetail'}">
              <p><i class="detail_count"></i>帐户余额</p>
              <p>¥{{totalData.account}}</p>
            </router-link>
          </div>
        </div>
        <ul class="detail_menu_list">
          <router-link :to="{ name: 'user.Account' }" tag="li" class="list_li">
            <a href="#">
              <img src="~assets/images/icon/icon_wallet.png" alt="#"><span>我的钱包</span>
            </a>
          </router-link>
          <router-link :to="{ name: 'user.Home' }" tag="li" class="list_li">
            <a href="#">
              <img src="~assets/images/icon/icon_shop.png" alt="#"><span>卖家中心</span>
            </a>
          </router-link>
          <router-link :to="{ name: 'user.Team' }" tag="li" class="list_li">
            <a href="#">
              <img src="~assets/images/icon/icon_team.png" alt="#"><span>我的团队</span>
            </a>
          </router-link>
          <router-link :to="{ name: 'user.ExtendCode' }" tag="li" class="list_li">
            <a href="#">
              <img src="~assets/images/icon/icon_code.png" alt="#"><span>推广二维码</span>
            </a>
          </router-link>
          <router-link :to="{ name: 'user.Help' }" tag="li" class="list_li">
            <a href="#">
              <img src="~assets/images/icon/icon_help.png" alt="#"><span>帮助中心</span>
            </a>
          </router-link>
          <router-link :to="{ name: 'user.Profile' }" tag="li" class="list_li">
            <a href="#">
              <img src="~assets/images/icon/icon_setting.png" alt="#"><span>设置</span>
            </a>
          </router-link>
        </ul>
      </scroller>
    </div>
    <audio id="detail_video" src="././assets/images/pulse.mp3" type="audio/mpeg" autoplay preload ></audio>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>