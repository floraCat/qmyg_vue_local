import './index.scss';

import _              from 'lodash';
import Title          from '~common/components/title';
import AddressSelect  from '~common/components/address_select';

export default {
	name: 'user_add_card',
  data () {
    return {
      cardData: {
        name: '',
        bank_card: '',
        bankname: '',
        province: '',
        city: '',
      },
      aliData: {
        name: '',
        bank_card: ''
      },
      flag: true
    };
  },
  mounted () {
  },
  computed: {
    addType () {
      return 0 === this.$route.query.type * 1 ? 1 : 2;
    },
    addTitle () {
      return 1 === this.addType ? '添加银行卡' : '添加支付宝';
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
    'app-address-select' : AddressSelect,
  },
  methods: {

    //提交资料
    submit () {

      let self      = this;
      let bankType  = self.addType;
      let uid       = _.get(self.$user.get(), 'data.user_id');
      let name      = 1 === bankType ? self.cardData.name : self.aliData.name;
      let bankCard  = 1 === bankType ? self.cardData.bank_card : self.aliData.bank_card;


      let item = 1 === bankType ? self.$refs.form : self.$refs.form1;
      let res = self.$validator(item);
      if (0 !== res.code) {
        self.$toast(res.data.msg);
        return;
      }

      if (bankType && _.isNumber) {
        let data = {
          user_id   : uid,
          bank_type : bankType,
          name      : name,
          bank_card : bankCard,
          bank_name : self.cardData.bankname,
          province  : self.prov.id,
          city      : self.city.id,
        };

        self.axios.post('/user/v100/Account/addBankCard', data)
        .then((res) => {
          self.$toast(res.desc);
          if ('success' === res.state) {
            self.$router.push({
              name: 'user.CardList',
            });
          }
        });
      }
    },

    handleOpenCity () {
      /*地址选择*/
      this.$store.get.commit({
        stateKey: 'AddressSelect',
        type: 'openAddr',
        openAddr: true
      });
    }
  }
};