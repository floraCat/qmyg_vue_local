<template>
  <div class="swiper-scroll swiper-container-vertical swiper-container-free-mode">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>