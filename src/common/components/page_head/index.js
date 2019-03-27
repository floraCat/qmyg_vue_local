
import './index.scss';

import NavBack from '~common/components/nav_back';

export default {
  name: 'navBack',
  components: {
    'app-nav-back': NavBack,
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
  }
};