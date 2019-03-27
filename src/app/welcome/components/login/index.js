import './index.scss';

import _              from 'lodash';
import Title          from '~common/components/title';
import SessionStorage from '~common/services/sessionStorage.cookie';

export default {
  name: 'welcome',
  data () {
    return {
      username: '',
      password: '',
      passType: true,
      loading : false,
    };
  },
  components: {
    'app-title': Title,
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    handleSubmit () {
      let self = this;
      if (true === self.loading) {
        self.$toast('正在为您提交');
        return false;
      }

      if (_.isEmpty(self.username)) {
        self.$toast('请输入用户名');
        self.$refs.username.focus();
        return;
      }

      else if (_.isEmpty(self.password)) {
        self.$toast('请输入登录密码');
        self.$refs.password.focus();
        return;
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
    },

    handleClean (elem) {
      if (elem && this.$refs[elem].value) {
        this[elem] = '';
      }
    },

    showpass () {
      this.passType = !this.passType;
      this.$refs.password.type = this.passType ? 'password' : 'text';
    }
  }
};