<template>
  <div class="order-page">
    <app-title title="我的订单列表"></app-title>
    <div class="order-nav">
      <div class="nav-search">
        <div class="sea">
          <i class="icon icon-search2"></i>
          <input v-model="keyword" class="keyword" type="text" name="keyword" placeholder="商品名称/商品编号/订单号">
          <button class="button" type="button" v-on:click="handleSearch">搜索</button>
        </div>
      </div>

      <div class="nav-link">
        <a href="javascript:;" class="item" :class="{ active: '' == status }" v-on:click="handleStatus()">全部订单</a>
        <a href="javascript:;" class="item" :class="{ active: 100 == status }" v-on:click="handleStatus(100)">待付款</a>
        <a href="javascript:;" class="item" :class="{ active: 101 == status }" v-on:click="handleStatus(101)">待发货</a>
        <a href="javascript:;" class="item" :class="{ active: 105 == status }" v-on:click="handleStatus(105)">待收货</a>
        <a href="javascript:;" class="item" :class="{ active: 102 == status }" v-on:click="handleStatus(102)">待评价</a>
      </div>

    </div>
    <div class="content">
      <ul class="order-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" :active="items.data" class="scroller" ref="swiperObj" off-height="10.75">
          <li v-for="(item, index) in items.data" class="item">
            <div class="head">
              <i class="icon"></i>
              <router-link :to="{ name: 'user.OrderDetail', params: { id: item.order_id } }" class="shop">{{ item.shop_name }}</router-link>
              <span class="no-pay">{{ item.order_state }}</span>
            </div>
            <div class="main">
              <p>订单号：{{ item.order_sn }}</p>
              <p v-text="item.add_time"></p>
              <div v-for="(child, key) in item.goods_list" class="info">
                <router-link :to="{ name: 'user.OrderDetail', params: { id: child.goods_id } }" class="pic">
                  <img :src="child.goods_thumb" :alt="child.goods_name">
                </router-link>
                <div class="text">
                  <router-link :to="{ name: 'user.OrderDetail', params: { id: child.goods_id } }">
                    <h2 class="title">{{ child.goods_name }}</h2>
                    <p class="price"><span>￥{{ child.goods_price }}</span>×{{ child.goods_number }}</p>
                  </router-link>

                  <div class="obtain">
                    <span class="box" v-on:click="isDummy = true">易购豆</span>
                    本次获易购豆：<span class="num" v-text="child.brokerage"></span>
                  </div>

                  <div class="handle">
                    立即返豆
                    <span v-on:click="isExplain = true">提现/使用说明</span>
                  </div>
                </div>
              </div>

            </div>

            <div class="foot">
              实付款：<span class="money">￥{{ item.total }}</span>
              <div class="bot-group" v-if="'待付款' == item.order_state">
                <!-- <router-link :to="{name: 'user.Refound', query:{ id: 1473}}">申请售后test</router-link>
                <a href="javascript:;" @click="confirmGet(index)">确认收货test</a> -->
                <a href="javascript:;" @click="orderDel(index)">删除</a>
                <a href="javascript:;" @click="isCancel=!isCancel; curIndex=index; cancelType=null">取消订单</a>
                <router-link :to="{name: 'user.OrderDetail', params: {id: item.order_id}}">去支付</router-link>
              </div>
              <div class="bot-group" v-if="'待发货' == item.order_state">
                <router-link :to="{name: 'user.Comment', query:{ id: item.order_id}}">晒单评价test</router-link>
                <a href="javascript:;" @click="remindSend(index)">提醒发货</a>
                <a href="javascript:;" @click="isCancel=!isCancel; curIndex=index; cancelType='apply'">申请取消</a>
              </div>
              <div class="bot-group" v-if="'待收货' == item.order_state">
                <router-link :to="{name: 'user.Refound', query:{ id: item.order_id}}">申请售后</router-link>
                <a href="javascript:;" @click="confirmGet(index)">确认收货</a>
              </div>
              <div class="bot-group" v-if="'待评价' == item.order_state">
                <a href="javascript:;" @click="orderDel(index)">删除</a>
                <router-link :to="{name: 'user.Refound', query:{ id: item.order_id}}">申请售后</router-link>
                <router-link :to="{name: 'user.Comment', query:{ id: item.order_id}}">晒单评价</router-link>
              </div>
              <div class="bot-group" v-if="'已完成' == item.order_state">
                <a href="javascript:;" @click="orderDel(index)">删除</a>
                <router-link :to="{name: 'user.Refound', query:{ id: item.order_id}}">申请售后</router-link>
              </div>
              <div class="bot-group" v-if="'已取消' == item.order_state">
                <a href="javascript:;" @click="orderDel(index)">删除</a>
              </div>
              <div class="bot-group" v-if="'已退货' == item.order_state">
                <a href="javascript:;" @click="orderDel(index)">删除</a>
              </div>
            </div>
          </li>

        </scroller>
      </ul>
    </div>

    <!--弹窗：取消原因-->
    <transition name="winSelect">
      <div class="winSelect" v-show="isCancel">
        <h5>请选择取消订单的原因</h5>
        <ol>
          <li v-for="(item,index) in itemsReason" v-bind:key="index" :class="{active: curReason === index}" @click="orderCancel(index, item.cause_id, cancelType)">
            <p v-text="item.cause_name"></p>
            <i class="icon-right"></i>
          </li>
        </ol>
        <i class="quit icon-close3" @click="isCancel = false"></i>
      </div>
    </transition>

    <!--覆盖层-->
    <div class="winMask" v-show="isCancel" @click="isCancel = false"></div>

    <!-- 易购豆 -->
    <div v-show="isDummy" class="modal dummy">
      <div class="handle-context"></div>
      <div class="body">
        <div class="section">
          <div class="text">
            <div class="main">
              <i class="close icon-close" v-on:click="isDummy = false"></i>
              <img src="~assets/images/TCBG.png" alt="">
              <ol>
                <p>1. 易购豆为深圳全民易购平台内部结算虚拟货币。</p>
                <p>2. 易购豆可在本商城等值抵扣消费，大创客更可以等值提现。</p>
              </ol>
              <div class="power">解释权归深圳全民易购贸易有限公司所有</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明弹出框 -->
    <div v-show="isExplain" class="modal explain">
      <div class="handle-context"></div>
      <div class="body">
        <div class="section" v-on:click="isExplain = false">
          <div class="text">
            <h2>使用/提现说明</h2>
            <div class="main">
              <h3 class="title">1、易购豆在哪里查看？</h3>
              <p><span>手机APP：</span>在商城底部栏目条，点击“我”，进入“我的钱包”进行查看；</p>
              <p><span>PC商城：</span>点击商城顶部您的用户名，进入个人主页，在“帐户中心”查看“我的易购豆”</p>

              <h3 class="title">2、易购豆使用/提现说明：</h3>
              <p>(1)平台支持7天无理由退货，奖励的易购豆最长7+8天到达用户后台账户；</p>
              <p>(2)普通用户：只可用于平台内购物等值抵扣消费。</p>
              <p>(3)大创客、自由合伙人：可用于平台内购物等值抵扣消费或全额兑换现金并提现。</p>
              <p>(4)提现手续费：自由合伙人1%，大创客5%</p>

            </div>
          </div>
        </div>
      </div>
    </div>

    <app-gotop :swiperObj="swiperObj" :watch="items"></app-gotop>

  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>