<template>
  <div class="videoExplain">
    <header class="hdVexplain">
      <a class="return icon icon-back" @click="$router.go(-1)"></a>
      <h1>深圳全民易购视频讲解</h1>
    </header>
    <div class="ttl">
      <h2>视频讲解</h2>
      <p>Video Explanation</p>
    </div>
    <ul class="list">
      <a v-for="(item,index) in items" v-bind:key="index">
        <div class="img"><img src="https://www.eggou.com/mobile/statics/img/mvpage/gongying18.jpg" /></div>
        <ol>
          <h4>深圳全民易购核心收益问题篇</h4>
          <p class="desc">
            <span v-text="item.desc"></span>
            <i>详情</i>
          </p>
          <p class="info">
            <span>2017-06-22</span>
            <span>19206人观看</span>
            <span>15356人浏览</span>
          </p>
        </ol>
      </a>
    </ul>
    <div class="foot">
      <p>2017深圳全民易购 版权所有</p>
      <p>ICP许可证号 粤ICP备16096235号</p>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>