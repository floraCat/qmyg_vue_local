<template>
  <div class="sex-wrapper">
  	<div class="header">
  		<i @click="switchSex"></i>
	  	<div class="title">
	  		<span>修改性别</span>
	  	</div>
  	</div>
  	<div class="content">
  		<ul class="sex-box">
  			<li :class="{ 'on' : 1 === selectSex }" @click="selectSex = 1">
  				<i class="icon-male"></i>
  				<span>男</span>
  			</li>
  			<li :class="{ 'on' : 2 === selectSex }" @click="selectSex = 2">
  				<i class="icon-female"></i>
  				<span>女</span>
  			</li>
  		</ul>
  		<div class="btn">
	  		<a href="javascript:" @click="handleSubmit">确认</a>
	  		<a href="javascript:" @click="switchSex">取消</a>
	  	</div>
  	</div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>