import './index.scss';

import _              from 'lodash';
import Title          from '~common/components/title';
import PhoneCode      from '~common/components/phone_code';
import Gotop          from '~common/components/gotop';

export default {
  name: 'agreementShare',
  data () {
    return {
    };
  },
  components: {
    'app-title': Title,
    'app-gotop': Gotop,
    PhoneCode,
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    handleClose () {
      let self = this;
      self.$router.push({
        name: _.get(self.$route, 'query.dt') || 'pay.Share',
      });
    }

  }
};