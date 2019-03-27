<template>
  <div class="nickname-wrapper">
  	<div class="header">
  		<i @click="switchNick"></i>
	  	<div class="title">
	  		<span>修改昵称</span>
	  	</div>
  	</div>
  	<div class="content">
      <form class="form" ref="form" @submit.prevent="submit">
  			<div class="title">昵称：</div>
  			<div class="input">
          <input vd-required
            v-model="nickname"
            type="text"
            vd-notify='{
              "text": "昵称不能为空",
              "patt": "昵称格式不正确"
            }'
            placeholder="请输入用户昵称">
  			</div>
  			<div class="btn">
  	  		<button type="submit">确认</button>
  	  		<button type="button" @click="switchNick">取消</button>
  	  	</div>
      </form>
  	</div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>