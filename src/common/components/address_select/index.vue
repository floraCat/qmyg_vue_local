<template>
  <div class="pAddr" v-show="openAddr" :class="{ open: openAddr }">
    <div class="head">
      <span @click="cancelAddr"><i class="icon-back"></i>返回</span>
    </div>
    <div class="Lt swiper-scroll">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <ul ref="swiperLt">
            <li v-for="(item, index) in provs"
              :key="index"
              v-text="item.region_name"
              :class="{on:item.region_id === location.region_id}"
              @click="changeSelect(item)"></li>

          </ul>
        </div>
      </div>
    </div>
    <div class="Rt swiper-scroll">
      <div class="swiper-wrapper">
        <div class="swiper-slide" ref="swiperRt">
          <dl v-for="(city, index) in citys"
            :key="index"
            :class="{ open: index === selectIndex }">

            <dt @click="handleSelect(city, index)">
              {{city.region_name}}
              <i class="icon-enter"></i>
            </dt>

            <dd>
              <p v-for="(area, index) in city.children"
                :key="index"
                :class="{on: area.region_id === location.area }"
                :t="area.region_id"
                @click="townSel(area)">
                {{ area.region_name }}
                <i class="icon-right"></i>
              </p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>