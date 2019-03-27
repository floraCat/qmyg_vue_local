<template>
  <div class="eCounts">
    <app-title title="访客"></app-title>
    <app-echarts nameL="访客人数" nameR="浏览次数" :api="api_visit" type="visit"></app-echarts>
    <ol class="enters">
			<li>
				<i class="label icon icon-logo"></i>
				<label>7天销量排行榜</label>
				<p>统计时间: <span>07/05 11:30:07</span></p>
			</li>
    </ol>
    <p class="note">
			注：营收数据仅截至到07/05 11:30:07，包含今日数据
    </p>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>