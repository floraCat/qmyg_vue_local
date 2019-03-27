<template>
  <div class="winFilter" :class="{open:openFilter}">
    <div class="main">
      <section class="mode">
          <h5>自营产品</h5>
            <div class="btnSwitch" @click="filterSelf = !filterSelf;">
              <div class="slider" :class="{on:filterSelf}"></div>
            </div>
      </section>
      <section class="select">
        <a class="key" @click="addrSel">
          <h5>配送城市</h5>
          <p>{{ address }}<i class="icon-enter"></i></p>
        </a>
        <app-address-select></app-address-select>
      </section>
      <section class="tab tab1">
        <ul>
          <li :class="{on:filterHasGoods}">
            <a data-filter="inStock" :class="{'icon-selected':filterHasGoods}" @click="filterHasGoods=!filterHasGoods">仅看有货</a>
          </li>
          <li :class="{on:filterPromotion}">
            <a data-filter="onSale" :class="{'icon-selected':filterPromotion}" @click="filterPromotion=!filterPromotion">促销</a>
          </li>
        </ul>
      </section>
      <section class="slide">
        <h5>价格区间</h5>
        <div class="range">
          <input type="number" placeholder="￥" v-model="filterPriceMin" />
          <span>-</span>
          <input type="number" placeholder="￥" v-model="filterPriceMax" />
        </div>
      </section>
      <section class="select" :class="{open:openBrand}">
        <a class="key" @click="getBrands">
          <h5>品牌</h5>
          <p>{{filterBrandTxt}}<i class="icon-enter"></i></p>
        </a>
        <ol class="pBrand">
          <li class="all" :class="{'on':filterBrand===-1}" @click="brandSel(-1);">全部<i class="icon-right"></i></li>
          <ul>
            <li v-for="(brand,index) in brands" v-bind:key="index" @click="brandSel(index);" :class="{'on':filterBrand===index}">
              {{brand.name}}
              <i class="icon-right"></i>
            </li>
          </ul>
        </ol>
      </section>
      <section class="tab tab2">
        <ul>
          <li><a class="jsClear" @click="cancelFilter">清空选项</a></li>
          <li><a class="jsConfirm" @click="confirmFilter">确定</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>