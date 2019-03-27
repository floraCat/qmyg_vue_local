import './index.scss';

import Title  from '~common/components/title';

export default {
  name: 'mfindpwdThree',
  data () {
    return {
      password  : '',
      password1 : '',
      passType  : true,
      showpass1 : false,
      showpass2 : false,
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

    showpass (item) {
      'password' === item ? this.showpass1 = this.passType : this.showpass2 = this.passType;
      this.passType = !this.passType;
      this.$refs[item].type = this.passType ? 'password' : 'text';

    }
  }
};