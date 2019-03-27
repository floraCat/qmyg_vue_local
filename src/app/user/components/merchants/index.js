import './index.scss';

import Title        from '~common/components/title';
import Gotop        from '~common/components/gotop';

export default {
	name: 'user_merchants',
  data () {
    return {
    };
  },
  computed: {},
  created () {
  },
  mounted () {
    // let self = this;
    // document.querySelector('div._v-content').addEventListener('touchend', self.menu);
  },
  methods: {
  },
  components: {
    'app-title'  : Title,
    'app-gotop'  : Gotop,
  }
};