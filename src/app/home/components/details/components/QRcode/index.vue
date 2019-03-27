<template>
  <div class="make_img">
    <div class="make_goodscode" v-show="creatQRcode">
      <div class="extend_show">
        <div class="show_spinner">
          <div class="spinner_bounce1"></div>
          <div class="spinner_bounce2"></div>
          <div class="spinner_bounce3"></div>
        </div>
        <p @click="getImg()">图片生成中...</p>
        <p @click="backTo()">点击此处返回</p>
      </div>
      <div v-if="showImg" class="extend_show">
        <img :src="imgSrc" alt="">
        <!-- <p @click="loadPage()">点击此处返回</p> -->
      </div>
    </div>
    <div class="goods_canvas_box">
      <qrcode-vue :value="url" :size="size" level="M" id="goods_qrcode"></qrcode-vue>
      <canvas id="goods_title_canvas"></canvas>
      <canvas id="goods_detail_canvas"></canvas>
      <canvas id="rmb_icon_cavas"></canvas>
      <canvas id="sale_price_canvas"></canvas>
      <canvas width="130" height="130" style="display: none;"></canvas>
      <canvas id="goods_canvas"></canvas>
    </div>
  </div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>