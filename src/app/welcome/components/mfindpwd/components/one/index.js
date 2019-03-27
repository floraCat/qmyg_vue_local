import './index.scss';

import Title  from '~common/components/title';


export default {
  name: 'mfindpwdOne',
  data () {
    return {
      username  : '',
      verify    : '',
      captchaUrl: 'https://www.eggou.com/mobile/index.php?r=captcha',
    };
  },
  components: {
    'app-title': Title,
  },
  computed: {
  },

  methods: {
    handleNextSubmit () {
      let self = this;
      let item = self.$refs.form;
      let res = self.$validator(item);

      if (0 !== res.code) {
        self.$toast(res.data.msg);
        return;
      }

      this.axios.post('/index/v100/index/tt', {
        params: {
          Aa: 123456,
        }
      })
      .then(() => {
      });
    },

    handleClean (elem) {
      if (elem && this.$refs[elem].value) {
        this[elem] = '';
      }
    },

    getCaptcha () {
      this.$refs.captcha.src = this.captchaUrl;
    }
  }
};