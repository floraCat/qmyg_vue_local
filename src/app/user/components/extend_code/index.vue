<template>
  <div id="user_extend">
    <app-title title="推广二维码"></app-title>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in items" v-bind:key="index" v-bind:style="'background-image:url(' + item.src + ')'">
      </swiper-slide>
    </swiper>
    <div class="extend_main">
      <div>
        <p>
          请选择您喜欢的主题
        </p>
        <div class="extend_select"></div>
        <button class="extend_btn" @click="getNum()">
          生成图片
        </button>
      </div>
    </div>
    <div v-show="showBox" class="extend_show">
      <app-wait></app-wait>
      <p class="waiting">
        图片生成中...
      </p>
      <p @click="loadPage()">
        点击此处返回
      </p>
    </div>
    <div v-show="showImg" class="extend_show">
      <img :src="imgSrc" alt="">
      <p @click="loadPage()">
        点击此处返回
      </p>
    </div>
    <qrcode-vue v-for="(value, index) in received" v-bind:key="index" :value="value.url" :size="size" level="M" id="qr_canvas"></qrcode-vue>
    <canvas id="canvas"></canvas>
    <canvas id="head_canvas"></canvas>
    <canvas id="pic_canvas"></canvas>
    <canvas id="font_canvas"></canvas>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>