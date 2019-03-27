<template>
  <!--用户中心右栏-->
	<div class="eSidebar" @touchmove="noScroll">
		<div class="head">
			<div class="img">
				<img v-lazy="userInfo.user_picture" />
			</div>
			<ol>
				<span v-text="userInfo.user_name"></span>
				<p><i class="icon-user2"></i><label>{{userInfo.is_activate | userLabel}}</label></p>
			</ol>
		</div>
		<ul class="labels1">
			<router-link :to="{name: 'user.Team'}">
				<i class="icon-person"></i>
				<span>大创客视频</span>
			</router-link>
			<router-link :to="{name: 'user.Team'}">
				<i class="icon-gong"></i>
				<span>供应商视频</span>
			</router-link>
			<router-link :to="{name: 'user.IncomeDetail'}">
				<i class="txt">0.00</i>
				<span>我的收益</span>
			</router-link>
			<router-link :to="{name: 'user.Team'}">
				<i class="txt">0</i>
				<span>我的团队</span>
			</router-link>
		</ul>
		<ul class="labels2">
			<router-link :to="{name: 'user.Profile'}">
				<span class="icon-order3"></span>
				<label>完善资料</label>
				<i class="icon-enter"></i>
			</router-link>
			<router-link :to="{name: 'user.Home'}">
				<span class="icon-shop"></span>
				<label>大创客开店</label>
				<i class="icon-enter"></i>
			</router-link>
			<router-link :to="{name: 'user.Home'}">
				<span class="icon-follow"></span>
				<label>关注公众号</label>
				<i class="icon-enter"></i>
			</router-link>
			<router-link :to="{name: 'activity.Recruit'}">
				<span class="icon-fly"></span>
				<label>我要加入</label>
				<i class="icon-enter"></i>
			</router-link>
			<a href="http://www.eggou.com/mobile/index.php?r=user/index/merchants">
				<span class="icon-flag"></span>
				<label>商家入驻</label>
				<i class="icon-enter"></i>
			</a>
		</ul>
		<div class="goBtns">
			<a class="return" @click="closeSidebar">
				<i class="icon-arr_lt"></i>
				<span>返回</span>
			</a>
			<router-link :to="{name: 'user.Home'}" class="enter">
				<i class="icon-arr_rt"></i>
				<span>进入</span>
			</router-link>
		</div>
		<router-link :to="{name:'user.Service'}" class="service">联系客服</router-link>
	</div>
</template>
<script>
  import Index from './index.js';
  export default Index;
</script>