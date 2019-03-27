import './index.scss';

import _          from 'lodash';
import Title      from '~common/components/title';
import PhoneCode  from '~common/components/phone_code';


export default {
  name: 'mfindpwdTwo',
  data () {
    return {
      username: '测试用户名',
      phone: '13800138000',
      code    : '',
    };
  },
  components: {
    'app-title': Title,
    PhoneCode,
  },
  computed: {
  },

  methods: {
    handleSubmit () {
      if (_.isEmpty(this.username)) {
        this.$toast('请输入用户名');
        return;
      }

      else if (_.isEmpty(this.phone)) {
        this.$toast('手机号码为空');
        return;
      }

      else if (_.isEmpty(this.code)) {
        this.$toast('请输入验证码');
        this.$refs.code.focus();
        return;
      }

      this.axios.post('/index/v100/index/tt', JSON.stringify({
        // params: {
          Aa: 123456,
        // }
      }))
      .then(() => {
      });
    },

  }
};