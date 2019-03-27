import './index.scss';

import _            from 'lodash';
import Swiper       from 'swiper';
import Services     from '~common/services';
import Title        from '~common/components/title';
import SwiperPage   from '~common/components/swiper';

export default {
  name: 'locationSelecter',
  data () {
    return {
      cityKeys      : [],
      cityInChar    : {},
      cityList      : [],
      keyword       : '',
      oldCityInChar : '',
      oldCityKeys   : '',
      tempData      :'',
      isUpdated     : false,
      swiperOption: {
        scrollbar         : false,
        direction         : 'vertical',
        slidesPerView     : 'auto',
      },
    };
  },
  created () {
    let self = this;
    /**
    * 当前选中
    */
    let currentData = Services.SessionStorage.get('current');
    let locationData = Services.SessionStorage.get('location');

    /**
      * 判断SessionStorage缓存是否存在
      */
    if (_.isEmpty(currentData.data) || _.isEmpty(locationData.data)) {

      async function asyncAjaxData () {
        currentData = await self.axios
        .get(`${window.API_DOMAIN}/api/region/v100/index/location.json`)
        .then(res => res.data)
        .catch(() => {
          return {};
        });

        self.tempData = _.assign({}, { current: currentData }, { location: currentData });

        Services.SessionStorage.set('current', currentData);
        Services.SessionStorage.set('location', currentData);

        self.dispatchActions(self.tempData);
      }

      asyncAjaxData();
    }
    else {
      self.tempData = _.assign({}, { current: _.get(currentData, 'data') }, { location: _.get(locationData, 'data') });
      this.dispatchActions(self.tempData);
    }
  },
  computed: {
    locationSelecterIsOpen () {
      return this.$store.get.state.Header.locationSelecterIsOpen;
    },

    // 当前
    current () {
      return this.$store.get.state.LocationSelecter.current;
    },

    // 定位
    location () {
      return this.$store.get.state.LocationSelecter.location;
    },

    // 火热
    hotList () {
      return this.$store.get.state.LocationSelecter.hotList;
    },

    // 最近访问
    lastCitys () {
      let lastCityData  = Services.SessionStorage.get('lastCity');
      return lastCityData.data || [];
    },

    searchState () {
      return this.$store.get.state.LocationSelecter.searchState;
    },

  },

  updated () {
    /**
     * 为了首页加载速度
     * 渲染地区列表放到这里来
     */
    if (false === this.isUpdated) {

      /**
      * 所有地区列表
      */
      let self = this;
      let cityListData = Services.SessionStorage.get('cityList');

      if (_.isEmpty(_.get(cityListData, 'data.cityList'))) {
        async function asyncAjaxData () {
          cityListData = await self.axios
          .get(`${window.API_DOMAIN}/api/region/v100/index/getRegions.json?regionId=0`)
          .then(res => res.data)
          .catch(() => {
            return {};
          });
          self.tempData = _.assign({}, { cityList: cityListData });
          Services.SessionStorage.set('cityList', self.tempData);
          self.getCityList(self.tempData);
          self.isUpdated = true;
        }
        asyncAjaxData();
      }
      else {
        self.tempData = _.assign({}, _.get(cityListData, 'data'));
        self.getCityList(self.tempData);
        self.isUpdated = true;
      }

    }

    /* eslint-disable */
    new Swiper(document.querySelectorAll('.swiper-scroll'), this.swiperOption);
    /* eslint-enable */
  },
  methods: {

    // 弹出搜索
    handleSearchState () {
      this.$store.get.commit({
        type: 'appFixed',
        appFixed: true
      });
      this.$refs.keyword.focus();
      this.$store.get.dispatch({
        type        : 'searchState',
        searchState : true,
      });
    },

    // 点击搜索
    handleSearch () {
      const keyword       = this.keyword;

      this.oldCityInChar  = this.oldCityInChar ? this.oldCityInChar : this.cityInChar;
      this.oldCityKeys    = this.oldCityKeys ? this.oldCityKeys : this.cityKeys;

      let newCityInChar   = {};
      let cityKeys        = [];

      /**
      * 在原来的结果中查找
      */
      _.forEach(this.oldCityInChar, function (value, key) {
        _.filter(value, function (item) {
          if (-1 !== item.name.indexOf(keyword)) {
            newCityInChar[key] = [];
            newCityInChar[key].push(item);
            cityKeys.push(key);
          }
        });
      });

      /**
      * this.cityInChar this.cityKeys
      * 搜索结果
      */
      if (_.isEmpty(newCityInChar)) {
        this.cityInChar = this.oldCityInChar;
        this.cityKeys   = this.oldCityKeys;
      }
      else {
        this.cityInChar = newCityInChar;
        this.cityKeys   = _.uniq(cityKeys);
      }

      this.keyword = '';
      this.closeSearch();
    },

    // 关闭搜索
    closeSearch () {
      this.$store.get.dispatch({
        type        : 'searchState',
        searchState : false,
      });
    },

    // 关闭城市选择框
    locationSelecterClose () {
      this.$store.get.commit({
        type: 'appFixed',
        appFixed: false
      });

      if (!_.isEmpty(this.oldCityInChar)) {
        this.cityInChar = this.oldCityInChar;
        this.cityKeys   = this.oldCityKeys;
      }

      this.$store.get.dispatch('locationSelecterClose');
    },

    //  切换地区
    handleHotClick (item) {
      this.$store.get.dispatch({
        type: 'current',
        current: item,
      });

      item = _.assign({}, item, { city_name: item.region_name });

      this.lastCitys.push(item);

      Services.SessionStorage.set('lastCity', _.uniqBy(_.reverse(this.lastCitys), 'name'));
      Services.SessionStorage.set('current', item);

      this.dispatchActions({ current: item });
      this.locationSelecterClose();

    },
    getCityList (obj) {
      let arr = _.get(obj, 'cityList') || {};
      if (0 < arr.length) {
        this.forEacChildren(arr);
      }
    },
    forEacChildren (citys) {
      let self = this;
      _.forEach(citys, function (city) {
        self.mergeCity(city);
      });
    },
    mergeCity (city) {
      // if (!_.isEmpty(city.children)) {
      //   this.forEacChildren(city.children);
      // }
      this.cityList.push(city);
      /**
       * 组合所有的拼音首字母
       */
      let char = city.py.charAt(0).toUpperCase();

      this.cityKeys.push(char);
      this.cityKeys = _.uniq(this.cityKeys);

      /**
       * 以拼音首字母开头的城市结合
       * cities = {
       *   char => [city, city...]
       * }
       */

      if (!_.isArray(this.cityInChar[char])) {
        this.cityInChar[char] = [];
      }

      this.cityInChar[char].push(city);
      this.cityInChar[char] = _.uniqBy(this.cityInChar[char], 'py');

    },
    dispatchActions (obj) {
      this.getCityList(obj);

      // 当前
      if (obj.current) {
        this.$store.get.dispatch({
          type: 'current',
          current: obj.current,
        });
      }

      // 定位
      if (obj.location) {
        this.$store.get.dispatch({
          type: 'location',
          location: obj.location,
        });
      }

      // 火热
      if (obj.hotList) {
        this.$store.get.dispatch({
          type: 'hotList',
          hotList: obj.hotList,
        });
      }
    },
    /*返回*/
    goBack () {
      this.$store.get.commit('locationSelecterClose');
    }
  },
  components: {
    'app-title' : Title,
    'app-swiper': SwiperPage,
  }
};