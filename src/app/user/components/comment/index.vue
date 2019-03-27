<template>
  <div class="comment-list-page">
    <app-title title="待评价列表"></app-title>
    <div class="comment-box">
      <ul class="comment-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite">
          <li class="item">
            <div class="bot">
              <div class="item-left">
                <img src="http://res.eggou.com/images/201703/66/thumb_img/0_thumb_G_1490860476262.jpg" alt="">
              </div>
              <div class="item-right">
                <div class="title">测试商品请勿购买测试商品请勿购买测试商品请勿购买测试商品请勿购买</div>
                <div class="btn">
                  <router-link :to="{ name: 'user.OrderDetail', params: { id: 123 } }" class="detail">
                    查看订单
                  </router-link>
                  <router-link :to="{ name: 'user.CommentDetail', params: { id: 123 } }" class="comment">
                    评价晒单
                  </router-link>
                </div>
              </div>
            </div>
          </li>

          <li class="item">
            <div class="bot">
              <div class="item-left">
                <img src="http://res.eggou.com/images/201703/66/thumb_img/0_thumb_G_1490860476262.jpg" alt="">
              </div>
              <div class="item-right">
                <div class="title">测试商品请勿购买测试商品请勿购买测试商品请勿购买测试商品请勿购买</div>
                <div class="btn">
                  <router-link :to="{ name: 'user.OrderDetail', params: { id: 123 } }" class="detail">
                    查看订单
                  </router-link>
                  <router-link :to="{ name: 'user.CommentDetail', params: { id: 123 } }" class="comment">
                    评价晒单
                  </router-link>
                </div>
              </div>
            </div>
          </li>

        </scroller>
      </ul>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>