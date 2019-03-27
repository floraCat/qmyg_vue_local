import './index.scss';

import Title        from '~common/components/title';
import SettleList   from '~common/components/settle_list';

export default {
  name: 'account',
  data () {
    return {};
  },
  computed: {
    api_settleList () {
      return 'user/v100/Seller/getBrokerageList';
      //return `${this.API_DOMAIN}/list_settle0.json`;
    }
  },
  components: {
    'app-title': Title,
    'app-settle-list': SettleList,
  },
  mounted () {},
  methods: {}
};