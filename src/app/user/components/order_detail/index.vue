<template>
  <div class="order-detail-page">
    <app-title title="订单详情"></app-title>
    <div class="content">
      <div class="user-info">
        <p>测试人<span>15010971469</span></p>
        <p class="addr">中国北京北京东城区测试地址</p>
      </div>
      <div class="goods-info">
        <div class="item">
          <div class="head">
            <i class="icon"></i>
            <a href="#" class="shop">深圳全民易购</a>
          </div>
          <div class="main">
            <p>订单号：2017061713119006477</p>
            <p>下单时间：2017-06-17 13:11:39</p>
            <div class="info">
              <a href="#" class="pic">
                <img src="http://eggou.oss-cn-shenzhen.aliyuncs.com/images/201703/66/thumb_img/0_thumb_G_1490860476262.jpg" alt="">
              </a>
              <div class="text">
                <a href="#">
                  <h2 class="title">芒不讲礼海南芒果台农号精品小台装10斤装(20-30个)</h2>
                  <p class="price"><span>￥98.00</span>×2</p>
                </a>

                <div class="obtain">
                  <span class="box">易购豆</span>
                  本次获易购豆：<span class="num">28</span>
                </div>

                <div class="remark">
                  颜色
                  <span>珊瑚粉[￥0.00]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="block">
        <div class="item">
          <span>配送方式</span>
          <span class="tips">快递</span>
        </div>
      </div>

      <div class="block">
        <div class="item">
          <span>商品金额</span>
          <span class="tips money">￥79.00</span>
        </div>
        <div class="item">
          <span>使用易购豆</span>
          <span class="tips money">-￥79.00</span>
        </div>
        <div class="item item-right">
          <button type="button" class="button success">取消订单</button>
        </div>
      </div>

      <div class="footer">
        <p>应付金额：<em class="money">￥79.00</em></p>
        <p>
          <span>快递运费：<em>包邮</em></span>
          <span>获易购豆：<em class="money">2.45</em></span>
        </p>
        <router-link :to="{name: 'user.Pay', params:{id: $route.params.id}}" class="link">立即支付</router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>