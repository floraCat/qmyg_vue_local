import './index.scss';

import _            from 'lodash';
import Title        from '~common/components/title';
import Address      from '~common/components/address';

export default {
	name: 'editaddress',
	data () {
		return {
      username: '',
      phone: '',
      region: '',
    };
	},
  mounted () {
    this.getUserAddress();
  },
  computed: {
    prov () {
      return this.$store.get.state.Address.prov;
    },
    city () {
      return this.$store.get.state.Address.city;
    },
    area () {
      return this.$store.get.state.Address.area;
    },
    street () {
      return this.$store.get.state.Address.street;
    },
    address () {
      return `${this.prov.region_name || ''}${this.city.region_name || ''}${this.area.region_name || ''}${this.street.region_name || ''}`;
    }
  },
  components: {
    'app-title'   :  Title,
    'app-address' :  Address,
  },
	methods: {
    close (item) {
      this[item] = '';
    },

    getUserAddress () {
      let self = this;

      let id = _.get(self.$route, 'params.id') * 1;

      self.axios
      .get('/user/v100/Profile/getUserAddressById', {
        params: {
          address_id: id
        }
      })
      .then((res) => {
        self.username = res.data.consignee;
        self.phone    = res.data.mobile;
        self.region   = res.data.address;
        let cityList = _.get(self.$store.get.state, 'Address.cityList');

        let prov = _.filter(cityList, { region_id: res.data.province * 1 });
        if (0 < prov.length) {
          prov = prov[0];
        }

        let city = _.filter(prov.children, { region_id: res.data.city * 1 });
        if (0 < city.length) {
          city = city[0];
        }

        let district = _.filter(city.children, { region_id: res.data.district * 1 });
        if (0 < district.length) {
          district = district[0];
        }

        // 把省市区街道信息放到Store里面，方便父组件使用
        self.$store.get.dispatch({
          type: 'switchParent',
          index: 1,
          item: prov,
        });

        self.$store.get.dispatch({
          type: 'switchParent',
          index: 2,
          item: city,
        });

        self.$store.get.dispatch({
          type: 'switchParent',
          index: 3,
          item: district,
        });

      });
    },
    submit () {
      let self = this;

      let item = self.$refs.form;
      let res = self.$validator(item);
      if (0 !== res.code) {
        self.$toast(res.data.msg);
        return;
      }

      if (_.isEmpty(self.address)) {
        self.$toast('请选择所在地区');
        return;
      }
      else if (_.isEmpty(self.prov)) {
        self.$toast('请选择省份');
        return;
      }
      else if (_.isEmpty(self.city)) {
        self.$toast('请选择城市');
        return;
      }

      let id = _.get(self.$route, 'params.id') * 1;

      if (!_.isNumber(id)) {
        self.$toast('非法请求');
        self.$router.push({
          name: 'user.Address',
        });
        return;
      }

      let data = {
        address_id: id,
        consignee : self.username,
        mobile    : self.phone,
        province  : self.prov.region_id,
        city      : self.city.region_id,
        district  : self.area.region_id || '',
        address   : self.region,
      };

      self.axios
      .post('/user/v100/Profile/modifyUserAddress', data)
      .then((res) => {
        self.$toast(res.desc);
        self.$router.push({
          name: 'user.Address'
        });
      });

    },
    handleSelectCity () {
      this.$store.get.dispatch({
        type  : 'isShowActive',
        isShow: true,
      });
    },
  },
};