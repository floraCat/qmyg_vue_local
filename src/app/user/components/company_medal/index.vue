<template>
  <div class="company-medal-page">
    <app-title title="深圳全民易购-创业+创富平台"></app-title>
    <div class="company">
      <div v-show="'' != active" class="mask" v-on:click="active = ''"></div>
      <div class="img-list">
        <div class="list"><img src="~assets/images/company/meadel11.jpg" v-on:click="handleImgClick(11)" :class="{ active: 11 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel12.jpg" v-on:click="handleImgClick(12)" :class="{ active: 12 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel13.jpg" v-on:click="handleImgClick(13)" :class="{ active: 13 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel14.jpg" v-on:click="handleImgClick(14)" :class="{ active: 14 === active }"></div>

        <div class="list"><img src="~assets/images/company/meadel21.jpg" v-on:click="handleImgClick(21)" :class="{ active: 21 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel22.jpg" v-on:click="handleImgClick(22)" :class="{ active: 22 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel23.jpg" v-on:click="handleImgClick(23)" :class="{ active: 23 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel24.jpg" v-on:click="handleImgClick(24)" :class="{ active: 24 === active }"></div>

        <div class="list"><img src="~assets/images/company/meadel31.jpg" v-on:click="handleImgClick(31)" :class="{ active: 31 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel32.jpg" v-on:click="handleImgClick(32)" :class="{ active: 32 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel33.jpg" v-on:click="handleImgClick(33)" :class="{ active: 33 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel34.jpg" v-on:click="handleImgClick(34)" :class="{ active: 34 === active }"></div>

        <div class="list"><img src="~assets/images/company/meadel41.jpg" v-on:click="handleImgClick(41)" :class="{ active: 41 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel42.jpg" v-on:click="handleImgClick(42)" :class="{ active: 42 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel43.jpg" v-on:click="handleImgClick(43)" :class="{ active: 43 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel44.jpg" v-on:click="handleImgClick(44)" :class="{ active: 44 === active }"></div>

        <div class="list"><img src="~assets/images/company/meadel51.jpg" v-on:click="handleImgClick(51)" :class="{ active: 51 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel52.jpg" v-on:click="handleImgClick(52)" :class="{ active: 52 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel53.jpg" v-on:click="handleImgClick(53)" :class="{ active: 53 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel54.jpg" v-on:click="handleImgClick(54)" :class="{ active: 54 === active }"></div>

        <div class="list"><img src="~assets/images/company/meadel61.jpg" v-on:click="handleImgClick(61)" :class="{ active: 61 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel62.jpg" v-on:click="handleImgClick(62)" :class="{ active: 62 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel63.jpg" v-on:click="handleImgClick(63)" :class="{ active: 63 === active }"></div>
        <div class="list"><img src="~assets/images/company/meadel64.jpg" v-on:click="handleImgClick(64)" :class="{ active: 64 === active }"></div>
      </div>

      <copy-right></copy-right>

    </div>


  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>