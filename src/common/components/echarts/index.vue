<template>
	<div class="pEcharts">
		<div class="switchs">
			<li :class="{on:curDaysOn===0}" @click="switchDays(0,7)">7天</li>
			<li :class="{on:curDaysOn===1}" @click="switchDays(1,30)">30天</li>
			<li :class="{on:curDaysOn===2}" @click="switchDays(2,90)">90天</li>
	  </div>
	  <div id="main"></div>
	  <div class="showDate">
			<span class="minDate" v-text="firstDate"></span>
	    <span class="maxDate" v-text="lastDate"></span>
	  </div>
	  <div class="tabs">
			<li class="li1">
				<i v-text="datas.totalL">loading...</i>
				<p v-text="nameL"></p>
			</li>
			<li class="li2">
				<i v-text="datas.totalR">loading...</i>
				<p v-text="nameR"></p>
			</li>
	  </div>
	</div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>