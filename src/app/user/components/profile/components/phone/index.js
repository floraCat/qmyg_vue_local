import './index.scss';

import _          from 'lodash';

import PhoneCode  from '~common/components/phone_code';

export default {
	data () {
		return {
			phone: '',
			valiCode: '',
		};
	},
	props: ['phoneFlag'],
  computed: {},
  components: {
    PhoneCode,
  },
	methods: {
		switchPhone () {
			this.phoneFlag.pf = false;
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

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return false;
      }

      self.loading = true;

      let uid = _.get(self.$user.get(), 'data.user_id');

      let data = _.assign({}, _.get(self.$user.get(), 'data'), { mobile_phone: self.phone });

      self.axios
      .post('/user/v100/Profile/modifyUserInfo', {
        user_id: uid,
        mobile_phone: self.phone,
        verify_code: self.valiCode,
      })
      .then((res) => {

        if ('success' === res.state) {
          self.$user.set(data);
          self.$store.get.dispatch({
            type: 'userInfo',
            user: data
          });

          self.phoneFlag.pf = false;

        }

        self.$toast(res.desc);
        self.loading      = false;
      });
    }
	},

};