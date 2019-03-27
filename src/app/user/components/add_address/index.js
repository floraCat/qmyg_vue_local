import './index.scss';

import _            from 'lodash';
import Title        from '~common/components/title';
import Address      from '~common/components/address';

export default {
	name: 'addaddress',
	data () {
		return {
      username: '',
      phone: '',
      region: '',
    };
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

      let data = {
        user_id   : _.get(self.$user.get(), 'data.user_id'),
        consignee : self.username,
        mobile    : self.phone,
        province  : self.prov.region_id,
        city      : self.city.region_id,
        district  : self.area.region_id || '',
        address   : self.region,
      };

      self.axios
      .post('/user/v100/Profile/addUserAddress', data)
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