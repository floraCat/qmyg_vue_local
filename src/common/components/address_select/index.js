import './index.scss';

import _      from 'lodash';
import Swiper from 'swiper';

export default {
  name: 'address_select',
  data () {
    return {
      provs : [],
      /*选定省的所有市*/
      citys : [],
      /*选定市的所有区*/
      towns : [],
      /*未确定前选择的地址，含定位后的默认地址*/
      location : {},
      /*是否已加载全部省，防止二次触发*/
      hasGetData : false,
      /*for单例*/
      firstNewSwiper : true,
      /*右边swiper实例*/
      swiperRt : {},
      /*swiper初始参数*/
      swiperParams : {
        scrollbar: !1,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: !0,
        freeMode: !0
      },
      selectIndex : -1,
      locationData: {},
      cityListData: {},
      selectCity  : '',
    };
  },
  computed: {
    openAddr () {
      return this.$store.get.state.AddressSelect.openAddr;
    },
  },
  mounted () {
    this.getCitylist();
  },
  watch: {
    openAddr () {
      let self = this;
      self.selectCity = '';
      self.getProvs(() => {
        self.handleSelect();
      });
    }
  },
  methods: {

    // 获取定位、城市列表数据
    async getCitylist () {
      let self = this;
      let locationData = self.$session.get('location');
      let cityListData = self.$session.get('cityList');

      if (_.isEmpty(locationData.data) || _.isEmpty(cityListData.data)) {
          locationData = await self.axios
          .get(`${window.API_DOMAIN}/api/region/v100/index/location.json`)
          .then(res => res.data)
          .catch(() => {
            return {};
          });

          cityListData = await self.axios
          .get(`${window.API_DOMAIN}/api/region/v100/index/getRegions.json?regionId=0`)
          .then(res => res.data)
          .catch(() => {
            return {};
          });

          self.$session.set('location', locationData);
          self.$session.set('cityList', { cityList: cityListData});

          locationData = await self.$session.get('location');
          cityListData = await self.$session.get('cityList');
      }

      self.locationData = locationData;

      // 默认加省份
      self.provs = _.filter(_.get(cityListData, 'data.cityList'), { parent_id : 1 });

      self.location = _.assign({}, locationData.data, {
        region_id: locationData.data.province,
        prov: locationData.data.province,
        prov_name: _.get(_.filter(self.provs, { region_id: locationData.data.province }).pop(), 'region_name'),
      });

      self.citys    = _.get(_.filter(self.provs, { region_id: self.location.region_id }).pop(), 'children');
      console.log(2222);
      console.log(self.location.region_id);
      let city      = _.filter(self.citys, { region_id: self.location.city }).pop();
      self.location = _.assign({}, self.location, {
        city: _.get(city, 'region_id'),
        city_name: _.get(city, 'region_name'),
      });

      self.selectIndex = _.findIndex(self.citys, { region_id: self.location.city });

      // 返回默认定位地址
      self.$store.get.commit({ type: 'filterAddr', filterAddr: self.location});

      self.cityListData = {
        data: {
          locationData,
          cityListData
        }
      };
    },

    // 选择后进行的$nextTick操作
    handleSelect (city, index) {
      if (undefined !== index) {
        this.selectIndex = index;
      }

      if (undefined !== city) {
        this.location = _.assign({}, this.location, {
          city     : _.get(city, 'region_id'),
          city_name: _.get(city, 'region_name'),
          district     : '',
          district_name: '',
        });
        this.selectIndex = _.findIndex(this.citys, { region_id: this.location.city });
      }

      this.$nextTick(function () {

        if (this.firstNewSwiper) {
          this.firstNewSwiper = false;
          /* eslint-disable */
          this.swiperRt = new Swiper(document.querySelectorAll('.swiper-scroll'), this.swiperParams);
          /* eslint-enable */
        }
        else {
          for (let i in this.swiperRt) {
            this.swiperRt[i].update();
          }
          this.swiperRt[1].setWrapperTranslate(-this.$refs.swiperRt.children[0].clientHeight * index);
        }
        this.curProvTop();
      });

    },

    // 加载城市列表
    getProvs () {
      let self = this;

      if (0 < self.swiperRt.length) {
        self.swiperRt[1].slideTo(0, 500, false);
      }

      self.location = self.selectCity || self.location;

      // 切换选择
      if (_.get(self.location, 'region_name')) {
        self.location = _.assign({}, self.location, {
          prov: _.get(self.location, 'region_id'),
          prov_name: _.get(self.location, 'region_name'),
        });
      }

      // 城市列表
      self.citys = _.get(_.filter(self.provs, { region_id: self.location.region_id }).pop(), 'children');
      self.handleSelect();
    },

    // 省份切换
    changeSelect (item) {
      this.selectCity  = item;
      this.selectIndex = -1;
      this.getProvs();
    },

    commitAll () {
      this.$store.get.commit({ type: 'filterAddr', filterAddr: this.location});

      this.$store.get.commit({ type: 'openAddr', openAddr: false});

      if (this.$store.get._actions._maskClose) {
        this.$store.get.commit({ type: 'showMask', showMask: false});
      }
    },

    // 地区选中
    townSel (item) {
      let self = this;
      self.location = _.assign({}, self.location, {
        district: item.region_id,
        district_name: item.region_name,
      });

      self.commitAll();
    },

    // 返回
    cancelAddr () {
      this.commitAll();
    },

    // 当前省滑到顶部
    curProvTop () {
      let curProv;
      if (!this.selectCity) {
        curProv = this.locationData.data.province;
      }
      else {
        curProv = this.selectCity.region_id;
      }
      for (let i in this.provs) {
        if (this.provs[i].region_id === curProv) {
          this.swiperRt[0].setWrapperTranslate(-this.$refs.swiperLt.children[0].clientHeight * (i * 1));
        }
      }
    }

  }
};