<template>
  <div class="comment-detail-page">
    <app-title title="商品评论"></app-title>
    <div class="content">

      <div class="order-info">
        <div class="item-left">
          <img src="http://res.eggou.com/images/201703/66/thumb_img/0_thumb_G_1490860476262.jpg" alt="">
        </div>
        <div class="item-right">
          <div class="title">测试商品请勿购买测试商品请勿购买测试商品请勿购买测试商品请勿购买</div>
        </div>
      </div>

      <div class="comment">
        <div class="comment-main">
          <div class="comment-head">
            <div class="tit">评价</div>
            <div class="level">
              <i v-for="(item, index) in 5" :key="index" v-on:click="handleSelect(item)"
              class="icon icon-star1"
              :class="{ on: item <= star }"></i>
            </div>
          </div>

          <div class="comment-input">
            <textarea v-model="comment" rows="4" placeholder="填写评论内容 (0-100字)"></textarea>
            <span v-text="maxValue">100</span>
          </div>

          <div class="comment-photo">
            <div class="tit">晒图</div>
            <div class="photo">
              <i class="icon icon-photo"></i>
              <input type="file" name="file" accept="image/gif, image/jpg, image/jpeg, image/png">
            </div>
          </div>
        </div>

        <div class="button">
          <button type="button">提交评论</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>