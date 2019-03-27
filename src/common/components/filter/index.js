import './index.scss';

import AddressSelect from '~common/components/address_select';

export default {
  components: {
    'app-address-select' : AddressSelect,
  },
  data () {
    return {
      /*筛选-所有品牌*/
      brands: [],
      /*筛选-自营*/
      filterSelf : null,
      /*是否有货*/
      filterHasGoods : null,
      /*是否促销*/
      filterPromotion : null,
      /*筛选-价格min*/
      filterPriceMin : null,
      /*筛选-价格max*/
      filterPriceMax : null,
      /*筛选-选中品牌下标，-1为全部*/
      filterBrand: null,
      /*筛选-选中品牌*/
      filterBrandTxt:'全部',
      /*筛选-是否显示品牌下拉*/
      openBrand : false,
      /*是否定位的默认地址*/
      addrChangeFirst : false,
      /*默认地址*/
      defAddr : []
    };
  },
  computed: {
    api_brand () {
      return `${window.API_DOMAIN}/api/brand/list.json`;
    },
    /*是否显示筛选弹窗*/
    openFilter () {
      return this.$store.get.state.Filter.openFilter;
    },
    prov () {
      return {
        id: this.$store.get.state.AddressSelect.filterAddr.province || '',
        name: this.$store.get.state.AddressSelect.filterAddr.prov_name || '',
      };
    },
    city () {
      return {
        id: this.$store.get.state.AddressSelect.filterAddr.city || '',
        name: this.$store.get.state.AddressSelect.filterAddr.city_name || '',
      };
    },
    area () {
      return {
        id: this.$store.get.state.AddressSelect.filterAddr.district || '',
        name: this.$store.get.state.AddressSelect.filterAddr.district_name || '',
      };
    },
    address () {
      return `${this.prov.name}${this.city.name}${this.area.name}` || '请选择所在地区';
    }
  },
  watch: {
    address () {
      // 第一次的地址就是默认地址，方便后面的清空操作
      if (!this.addrChangeFirst) {
        this.addrChangeFirst = true;
        this.defAddr = this.$store.get.state.AddressSelect.filterAddr;
      }
    }
  },
  methods: {
    /*地址选择*/
    addrSel () {
      this.$store.get.commit({
        stateKey: 'AddressSelect',
        type: 'openAddr',
        openAddr: true
      });
    },
    /*品牌下拉*/
    getBrands () {
      let self = this;
      self.axios({
        method   : 'GET',
        url      : self.api_brand,
        data     : null
      }).then((res) => {
        if ('success' === res.state) {
          self.brands = res.data.brands;
          self.openBrand = !self.openBrand;
        }
      });
    },
    /*选中品牌*/
    brandSel (index) {
      this.filterBrand = index;
      let txt;
      if (-1 === index) {
        txt = '全部';
      }
      else {
        txt = this.brands[index].name;
      }
      this.filterBrandTxt = txt;
      this.openBrand = false;
    },
    /*清空选项*/
    cancelFilter () {
      this.filterSelf = false;
      this.filterHasGoods = null;
      this.filterPromotion = null;
      this.filterPriceMin = null;
      this.filterPriceMax = null;
      this.filterBrand = null;
      this.filterBrandTxt = '全部';
      this.$store.get.commit({ type: 'filterAddr', filterAddr: this.defAddr});
    },
    /*筛选确定*/
    confirmFilter () {
      let filterAddr = this.$store.get.state.AddressSelect.filterAddr;
      let filterProv = filterAddr.prov;
      let filterCity = filterAddr.city;
      let filterTown = filterAddr.district;
      this.$store.get.dispatch({
        type: 'getImglist',
        curPage: 1,
        filterSelf: this.filterSelf ? 1 : 0,
        filterHasGoods: this.filterHasGoods ? 1 : 0,
        filterPromotion: this.filterPromotion ? 1 : 0,
        filterPriceMin: this.filterPriceMin,
        filterPriceMax: this.filterPriceMax,
        filterBrand: this.filterBrand,
        filterProv: filterProv,
        filterCity: filterCity,
        filterTown: filterTown,
      });
      // this.$store.get.commit({ type: 'appFixed', appFixed: false, stateKey: 'App'});
      this.openAddr = false;
      this.openBrand = false;
      this.curSort = 'sort_mult',
      this.sort_mult_up = false,
      this.sort_price_up = false,
      this.$store.get.commit({ type: 'openFilter', openFilter: false});
      this.$store.get.commit({ type: 'showMask', showMask: false, stateKey: 'MaskClose'});
      this.$store.get.commit({ type: 'sortStyle', sortStyle: null, stateKey: 'Imglist'});
      this.$store.get.commit({ type: 'orderBy', orderBy: 'desc', stateKey: 'Imglist'});
    },
  },
};