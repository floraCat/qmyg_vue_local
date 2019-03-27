<template>
  <div class="refound-detail-page">
    <app-title title="退换货详情"></app-title>
    <div class="content">
      <div class="goods-info">
        <div class="item">
          <div class="head">
            <div class="shop">商品列表</div>
          </div>
          <div class="main">
            <div class="info">
              <a href="#" class="pic">
                <img src="http://eggou.oss-cn-shenzhen.aliyuncs.com/images/201703/66/thumb_img/0_thumb_G_1490860476262.jpg" alt="">
              </a>
              <div class="text">
                <a href="#">
                  <h2 class="title">芒不讲礼海南芒果台农号精品小台装10斤装(20-30个)</h2>
                  <p class="price"><span>￥98.00</span>×2</p>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="block">
        <div class="item">
          <span>详细信息</span>
        </div>
      </div>

      <div class="block">
        <div class="item">
          <span>退换货单号：</span>
          <span class="tips money">￥79.00</span>
        </div>
        <div class="item">
          <span>申请时间：</span>
          <span class="tips" v-text="items.apply_time"></span>
        </div>
        <div class="item">
          <span>服务类型：</span>
          <span class="tips">-￥79.00</span>
        </div>
        <div class="item">
          <span>订单状态：</span>
          <span class="tips" v-text="items.order_status"></span>
        </div>
        <div class="item">
          <span>退货原因：</span>
          <span class="tips">-￥79.00</span>
        </div>

        <div class="item">
          <span>退款金额：</span>
          <span class="tips">-￥79.00</span>
        </div>
      </div>

      <div class="block">
        <div class="item">
          <span>联系人：</span>
          <span class="tips">￥79.00</span>
        </div>
        <div class="item">
          <span>联系电话：</span>
          <span class="tips">-￥79.00</span>
        </div>
        <div class="item">
          <span>联系地址：</span>
          <span class="tips">-￥79.00</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>