import './index.scss';

import _            from 'lodash';
import Services     from '~common/services';

import Title from '~common/components/title';

export default {
  name: 'city',
  data () {
    return {
      cityKeys      : [],
      cityInChar    : {},
      cityList      : [],
      keyword       : '',
      oldCityInChar : '',
      oldCityKeys   : '',
    };
  },

  created () {
    const API_DOMAIN  = this.API_DOMAIN;
    let newData       = {};

    /**
    * 所有地区列表
    */
    let cityListData = Services.SessionStorage.get('cityList');

    /**
    * 当前选中
    */
    let currentData = Services.SessionStorage.get('current');

    /**
      * 判断SessionStorage缓存是否存在
      */
    if (_.isEmpty(cityListData) || _.isEmpty(currentData)) {
      this.axios.get(`${window.API_DOMAIN}/citys.json`)
      .then((res) => {
        if (0 === res.code && !_.isEmpty(res.data)) {
          cityListData = res.data;
          currentData = _.get(cityListData, 'current');

          newData = _.assign({}, cityListData, { location: currentData });
          Services.SessionStorage.set('cityList', newData);
          Services.SessionStorage.set('current', currentData);
          this.dispatchActions(newData);
        }
      });
    }
    else {
      newData = _.assign({}, _.get(cityListData, 'data'), { current: _.get(currentData, 'data') });
      this.dispatchActions(newData);
    }
  },
  computed: {
    // 当前
    current () {
      return this.$store.get.state.City.current;
    },

    // 定位
    location () {
      return this.$store.get.state.City.location;
    },

    // 火热
    hotList () {
      return this.$store.get.state.City.hotList;
    },

    // 最近访问
    lastCitys () {
      let lastCityData  = Services.SessionStorage.get('lastCity');
      return lastCityData.data || [];
    },

    searchState () {
      return this.$store.get.state.City.searchState;
    },
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

    // 关闭
    locationSelecterClose () {
      this.$router.go(-1);
    },

    //  切换地区
    handleHotClick (item) {
      this.$store.get.dispatch({
        type: 'current',
        current: item,
      });

      this.lastCitys.push(item);

      Services.SessionStorage.set('lastCity', _.uniqBy(_.reverse(this.lastCitys), 'name'));
      Services.SessionStorage.set('current', item);

      this.$router.go(-1);

    },
    getCityList (obj) {
      /* eslint-disable */
      let _this = this;
      /* eslint-enable */

      _.forEach( _.get(obj, 'cityList'), function (city) {

        _this.cityList.push(city);
        /**
         * 组合所有的拼音首字母
         */
        let char = city.pinyin.charAt(0).toUpperCase();

        _this.cityKeys.push(char);
        _this.cityKeys = _.uniq(_this.cityKeys);

        /**
         * 以拼音首字母开头的城市结合
         * cities = {
         *   char => [city, city...]
         * }
         */
        if (!_.isArray(_this.cityInChar[char])) {
          _this.cityInChar[char] = [];
        }

        _this.cityInChar[char].push(city);
        _this.cityInChar[char] = _.uniqBy(_this.cityInChar[char], 'id');
      });
    },
    dispatchActions (obj) {
      this.getCityList(obj);
      // 当前
      this.$store.get.dispatch({
        type: 'current',
        current: obj.current,
      });

      // 定位
      this.$store.get.dispatch({
        type: 'location',
        location: obj.location,
      });

      // 火热
      this.$store.get.dispatch({
        type: 'hotList',
        hotList: obj.hotList,
      });
    }
  },
  components: {
    'app-title': Title
  }
};