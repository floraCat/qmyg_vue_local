import './index.scss';

import Title          from '~common/components/title';
import PhoneCode      from '~common/components/phone_code';

export default {
  name: 'agreementRegister',
  data () {
    return {
    };
  },
  components: {
    'app-title': Title,
    PhoneCode,
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    handleClose () {
      this.$router.push({
        name: 'welcome.Register',
      });
    }

  }
};