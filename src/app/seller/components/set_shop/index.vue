<template>
  <div class="eSetShop">
    <app-title title="修改店铺信息"></app-title>
    <section class="name">
			<label>店铺名称</label>
			<input type="text" v-model="modifyName" value="modifyName" ref="shopName" />
    </section>
    <section class="head">
			<label>店铺头像</label>
			<ol>
				<span>点击上传图片</span>
				<div class="upload">
					<cropper :cropImg="shopInfo.shop_logo" :cropAlt="shopInfo.shop_name" cropType="shop"></cropper>
				</div>
			</ol>
    </section>
    <!-- <section class="notice">
			<a class="enter tb" @click="showNotice">
				<label>店铺公告</label>
				<span v-text="modifyNotice"></span>
				<i class="go icon icon-enter"></i>
			</a>
			<div class="shopNotice" :class="{show:openNotice}">
				<div class="hd">
					<i class="return icon icon-return" @click="closeNotice"></i>
					<h5>店铺留言</h5>
				</div>
				<textarea class="txt" v-model="tempNotice" val="tempNotice"></textarea>
				<a class="btn" @click="confirmNotice">确定</a>
				<a class="btn" @click="closeNotice">取消</a>
			</div>
    </section> -->
    <section class="time">
    	<div class="tb">
				<label>开店时间</label>
				<span>2017.01.01</span>
			</div>
    </section>
    <a class="btn2" @click="confirmModify">确认修改</a>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>