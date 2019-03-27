import './index.scss';

import _              from 'lodash';
import Title          from '~common/components/title';
import SessionStorage from '~common/services/sessionStorage.cookie';
import PhoneCode      from '~common/components/phone_code';

export default {
  name: 'welcome',
  data () {
    return {
      phone   : '',
      key     : '',
      password: '',
      qrcode  : '',
      passType: true,
      loading : false,
      checked : true,
      title: '注册用户',
      btnText: '闪电注册',
    };
  },
  components: {
    'app-title': Title,
    PhoneCode,
  },
  computed: {
  },
  mounted () {
    if ('bind' === _.get(this.$route, 'query.type')) {
      this.title    = '绑定手机号';
      this.btnText  = '绑定手机号';
    }
  },
  watch: {
    $route () {
      if ('bind' === _.get(this.$route, 'query.type')) {
        this.title    = '绑定手机号';
        this.btnText  = '绑定手机号';
      }
      else {
        this.title    = '注册用户';
        this.btnText  = '闪电注册';
      }
    }
  },

  methods: {

    submit () {
      let self = this;

      let item = self.$refs.form;
      let res = self.$validator(item);
      if (0 !== res.code) {
        self.$toast(res.data.msg);
        return false;
      }

      if (true === self.loading) {
        self.$toast('正在为您提交');
        return false;
      }

      if (false === self.checked) {
        self.$toast('请同意用户注册协议');
        return false;
      }

      self.loading = true;

      self.$store.get.dispatch({
        type: 'Loading',
        Text: '请求中...',
        isShow: true
      });

      self.axios.post('/user/v100/Login', {
        username: self.username,
        password: self.password,
      })
      .then((res) => {

        self.$store.get.dispatch({
          type: 'Loading',
          isShow: false
        });

        self.$toast(res.desc);
        if ('fail' === res.state) {
          self.loading = false;
        }
        else {
          SessionStorage.set('userInfo', res.data, 60 * 60);
          self.$router.push({
            name: _.get(self.$route, 'query.dt') || 'home.Home'
          });
        }
      });

      return false;

    },

    handleClean (elem) {
      if (elem && this.$refs[elem].value) {
        this[elem] = '';
      }
    },

    hanldeCheck () {
      this.checked = !this.checked;
    },

    showpass () {
      this.passType = !this.passType;
      this.$refs.password.type = this.passType ? 'password' : 'text';
    }
  }
};