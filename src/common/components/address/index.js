import './index.scss';

import _            from 'lodash';
import Swiper       from 'swiper';

import Services     from '~common/services';
import SwiperPage   from '~common/components/swiper';

export default {
  name: 'dialog',
  data () {
    return {
      swiperOption: {
        autoHeight: true,
        scrollbar: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
      },
      selectIndex: {},
      parentIndex: 1,
      swiper: null,
    };
  },
  mounted () {
    this.getCityList();
  },
  computed: {
    isShow () {
      return this.$store.get.state.Address.isShow;
    },
    cistyList () {
      return this.$store.get.state.Address.cityList;
    },
    prov () {
      return _.get(this.$store.get.state, 'Address.prov.region_name') || '请选择';
    },
    city () {
      return  _.get(this.$store.get.state, 'Address.city.region_name') || '请选择';
    },
    area () {
      return  _.get(this.$store.get.state, 'Address.area.region_name') || '请选择';
    },
    street () {
      return  _.get(this.$store.get.state, 'Address.street.region_name') || '请选择';
    },
  },
  components: {
    'app-swiper': SwiperPage,
  },
  updated () {
    // this.swiper.update();
  },
  methods: {

    /**
     * 通过异步方式获取城市列表
     * SessionStorage 存在直接返回，否则请求接口获取并保存到SessionStorage
     */
    async getCityList () {
      let self = this;
      let cityListData = Services.SessionStorage.get('cityList');

      let cityData = _.get(cityListData, 'data.cityList');

      // 为空请求接口
      if (_.isEmpty(_.get(cityListData, 'data.cityList'))) {
        cityListData = await self.axios
        .get(`${window.API_DOMAIN}/api/region/v100/index/getRegions.json?regionId=0`)
        .then(res => res.data)
        .catch(() => {
          return {};
        });

        cityData = cityListData;
        let tempData = _.assign({}, { cityList: cityListData });
        Services.SessionStorage.set('cityList', tempData);
      }

      // 把城市列表放到Store中
      self.$store.get.dispatch({
        type: 'cityList',
        cityList: cityData
      });

      self.selectIndex[1] = cityData;

      self.$nextTick(() => {
        /* eslint-disable */
        self.swiper = new Swiper(document.querySelectorAll('.swiper-scroll'), this.swiperOption);
        /* eslint-enable */
      });
    },

    // 地区列表选择
    handleSelect (item) {
      let self = this;

      // 把省市区街道信息放到Store里面，方便父组件使用
      self.$store.get.dispatch({
        type: 'switchParent',
        index: self.parentIndex,
        item: item,
      });

      // 判断是否有子级列表
      if (item.children && 0 < item.children.length) {
        self.$store.get.dispatch({
          type: 'cityList',
          cityList: item.children
        });

        self.parentIndex ++;
        self.selectIndex[self.parentIndex] = self.cistyList;
      }

      /**
       * 默认请求3级数据，这里手动请求第4级
       */
      else if (3 === self.parentIndex) {

        self.$store.get.dispatch({
          type: 'Loading',
          Text: '获取数据...',
          isShow: true
        });

        self.parentIndex ++;
        self.axios.get(`${window.API_DOMAIN}/api/region/v100/index/getRegions.json?regionId=0`)
        .then((res) => {

          self.$store.get.dispatch({
            type: 'cityList',
            cityList: res.data
          });

          self.selectIndex[self.parentIndex] = self.cistyList;
          self.$store.get.dispatch({
            type: 'Loading',
            isShow: false
          });

          self.update();

        });
      }

      // 第4级（街道信息）选中关闭页面
      else if (4 === self.parentIndex) {
        self.handleColse();
      }

      self.update();

    },

    // 重置swiper高度
    update () {
      this.$nextTick(function () {
        this.swiper.slideTo(0, 500, false);
        this.swiper.update();
      });
    },

    // 省市区Nav切换
    handleParent (id) {
      this.parentIndex = id;

      this.$store.get.dispatch({
        type: 'cityList',
        cityList: this.selectIndex[this.parentIndex]
      });
    },

    // 确定关闭
    handleColse () {
      this.parentIndex = 1;

      this.$store.get.dispatch({
        type: 'cityList',
        cityList: this.selectIndex[1]
      });

      this.$store.get.dispatch({
        type  : 'isShowActive',
        isShow: false,
      });
    },
  }
};