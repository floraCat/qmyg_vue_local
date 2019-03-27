<template>
  <div class="selectCats">
		<header class="hdAddGood">
			<i class="return icon icon-back" @click="close_selectCat"></i>
			<h1>选择分类</h1>
    </header>
    <div class="add">
			<a @click="pop_edit('add')">+ 添加分类</a>
    </div>
    <div class="catlist" ref="swiperCat">
    	<div class="swiper-wrapper">
	    	<div class="swiper-slide">
					<li v-for="(cat,index) in customCats" v-bind:key="index" :data-txt="cat.cat_id" :data-cus="curCatCustom" :class="{active:index===curCatCustom}">
						<div class="check" @click="selectCat(index)">
							<span>
								<i class="icon icon-right"></i>
							</span>
						</div>
						<!-- <input class="check" type="radio" /> -->
						<ol>
							<label v-text="cat.cat_name"></label>
							<div class="links">
								<a @click="pop_edit('mod',cat,index)">编辑</a>
								<a @click="delCat(cat.cat_id,index)">删除</a>
							</div>
						</ol>
					</li>
				</div>
			</div>
    </div>
    <ul class="noCats">
    </ul>
    <div class="submitAdd" @click="confirmCat">
			<a class="btn">确定</a>
		</div>
		<!--弹窗-添加/编辑-->
		<div class="popEdit" :class="{show:show_edit}">
			<div class="mask"></div>
			<div class="main">
				<input class="txt" type="text" v-if="action === 'add'" v-model="editTxt" placeholder="请输入要添加的分类名称" />
				<input class="txt" type="text" v-if="action === 'mod'" v-model="editTxt" />
				<a class="submit" v-if="action === 'add'" @click="addCat">确定添加</a>
				<a class="submit" v-if="action === 'mod'" @click="modCat">确定修改</a>
				<i class="quit icon-close" @click="closeEdit"></i>
			</div>
		</div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>