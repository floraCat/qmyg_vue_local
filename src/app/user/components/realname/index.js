import './index.scss';

import _              from 'lodash';
import Title          from '~common/components/title';
import AddressSelect  from '~common/components/address_select';
import PhoneCode      from '~common/components/phone_code';

export default {
	name: 'getpassword',
	data () {
		return {
      userName: '',
      idNumber: '',
      phone: '',
      valiCode: '',
    };
	},
  mounted () {
  },
  computed: {
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
        id: this.$store.get.state.AddressSelect.filterAddr.area || '',
        name: this.$store.get.state.AddressSelect.filterAddr.area_name || '',
      };
    },
    address () {
      return `${this.prov.name}${this.city.name}${this.area.name}` || '请选择所在地区';
    }
  },
  components: {
    'app-title': Title,
    'app-address-select' :  AddressSelect,
    PhoneCode,
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

    close (item) {
      this[item] = '';
    },

    submit () {
      let self = this;

      let item = self.$refs.form;
      let res  = self.$validator(item);
      if (0 !== res.code) {
        self.$toast(res.data.msg);
        return;
      }

      if (!_.isNumber(self.prov.id) || !_.isNumber(self.city.id)) {
        self.$toast('请选择所在地区');
        return false;
      }

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return false;
      }

      self.loading = true;

      let uid = _.get(self.$user.get(), 'data.user_id');
      let data = {
        user_id  : uid,
        real_name: self.userName,
        self_num : self.idNumber,
        province : self.prov.id,
        city     : self.city.id,
        district : self.area.id,
        mobile_phone: self.phone,
        verify_code: self.valiCode,
      };

      self.axios
      .post('/user/v100/Profile/addUserCertification', data)
      .then((res) => {
        self.$toast(res.desc);
        self.loading = false;
        if ('success' === res.state) {
          self.$router.push({
            name: 'user.RealnameSuccess',
          });
        }
      });
    }
  },
};