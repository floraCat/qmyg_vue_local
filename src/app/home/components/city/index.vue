<template>
  <section class="city-page">
    <app-title title="城市"></app-title>
    <div class="scroller">
      <div class="scroller-inner">
        <div class="point">#</div>
        <div class="point">热门</div>
        <div class="point" v-for="(item, index) in cityKeys" v-bind:key="index">{{ item }}</div>
      </div>
    </div>
    <div class="body">
      <div class="city-search">
        <label class="sea-link" @click="handleSearchState">城市关键词</label>
        <div class="search-main" :class="{ in: searchState }">
          <div class="search-close" @click="closeSearch"></div>
          <div class="search-body">
            <input type="text"
              v-model.trim="keyword"
              class="keyword"
              ref="keyword"
              placeholder="城市关键字">
            <button class="btn-submit" @click="handleSearch">搜索</button>
          </div>
        </div>
      </div>

      <div class="header">当前: {{ current.name }}
        <a class="closelist" v-on:click="locationSelecterClose">关闭</a>
      </div>
      <div class="inner">
        <div class="wrap">
          <div class="list-wrap">
            <div class="hot-list">
              <div class="caption">定位城市</div>
              <div class="list-inner">
                <div class="item">
                  <a @click="handleHotClick(location)">{{ location.name }}</a>
                </div>
              </div>
            </div>

            <div v-show="0 < lastCitys.length" class="hot-list">
              <div class="caption">最近访问城市</div>
              <div class="list-inner">
                <div class="item" v-for="(item, index) in lastCitys" :key="index">
                  <a @click="handleHotClick(item)">{{ item.name }}</a>
                </div>
              </div>
            </div>

            <div class="hot-list">
              <div class="caption">热门城市</div>
              <div class="list-inner">
                <div class="item" v-for="(item, index) in hotList" :key="index">
                  <a @click="handleHotClick(item)">{{ item.name }}</a>
                </div>
              </div>
            </div>
          </div>


          <div class="list" v-for="char in cityKeys">
            <div class="caption">{{ char }}</div>
            <div class="list-inner">
              <a v-for="city in cityInChar[char]"
                key="{{ city.id }}"
                @click="handleHotClick(city)"
                class="item">{{ city.name }}</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Index from './index.js';
  export default Index;
</script>