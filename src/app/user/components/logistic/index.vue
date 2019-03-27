<template>
  <div class="pLogistic">
    <app-title title="物流跟踪"></app-title>
    <div class="express">
      <img src="~assets/images/logistics_logo.png" alt="快递"/>
      <p>京东快递：60061152680</p>
    </div>
    <div class="track">
      <h5>物流跟踪信息</h5>
      <ul>
        <li>
          <i></i>
          <p>
            <time>2017-01-01 01:01:01</time>
            <span>配送员开始配送，请您准备收货，配送员，魏向全，手机号，15612667904</span>
          </p>
        </li>
        <li>
          <i></i>
          <p>
            <time>2017-01-01 01:01:01</time>
            <span>货物已完成分拣，离开【廊坊固安分拣中心】</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>