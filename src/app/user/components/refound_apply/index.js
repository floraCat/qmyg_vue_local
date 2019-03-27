import './index.scss';

import Title         from '~common/components/title';
import SelectCtrl    from './components/select_control';
import AddressSelect from '~common/components/address_select';
import cropper       from '~common/components/cropper';

export default {
	name: 'apply_refound',
  data () {
    return {
      items: [],
      /*当前申请的服务类型*/
      curApply : 2,
      /*换货原因选项*/
      optsExchange: [],
      /*退货原因选项*/
      optsReturn: [],
      /*换货可选商品属性*/
      itemsAttr : [],
      /*换货当选属性*/
      curAttr : [],
      /*是否勾选质检报告*/
      hasReport : false,
    };
  },
  computed: {
    api () {
      return '';
    },
    api_submit () {
      return '';
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
  created () {
    /*--for test START--*/
    let data = [
      {
        name:'规格',
        list:['aaa', 'bbb']
      },
      {
        name:'图案',
        list:['AA', 'BB']
      }
    ];
    /*--for test END--*/
    this.itemsAttr = data;
    this.defaultAttr();
  },
  mounted () {
    this.getItems();
  },
  components: {
    'app-title': Title,
    'app-select-control': SelectCtrl,
    'app-address-select' : AddressSelect,
    cropper,
  },
	methods: {
    getItems () {
      let self = this;
      /*--for test START--*/
      self.optsExchange = [
        {txt:'Exchange1', val:1},
        {txt:'Exchange2', val:2}
      ];
      self.optsReturn = [
        {txt:'Return1', val:1},
        {txt:'Return2', val:2}
      ];
      /*--for test END--*/
    },
    /*换货默认选择各属性第一个*/
    defaultAttr () {
      let self = this;
      this.itemsAttr.forEach(function () {
        self.curAttr.push(0);
      });
    },
    /*换货切换属性*/
    switchAttr (index0, index) {
      this.curAttr.splice(index0, 1, index);
    },
    /*地址选择*/
    addrSel () {
      this.$store.get.commit({
        stateKey: 'AddressSelect',
        type: 'openAddr',
        openAddr: true
      });
    },
    /*提交申请*/
    submit () {
      let self = this;
      // self.axios({
      //   method : 'POST',
      //   url : self.api_submit,
      //   data : {
      //     user_id  : self.$user.get().data.user_id,
      //     order_id : self.$route.params.id
      //   }
      // }).then((res) => {
      //   console.log(res);
      //   if ('success' === res.state) {
        self.$router.push({ name: 'user.Prompt', query: {handle: 'refound_apply'}});
      //   }
      // });
    }
	}
};