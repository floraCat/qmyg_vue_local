import './index.scss';

import Title        from '~common/components/title';
import SettleList   from '~common/components/settle_list';

export default {
  name: 'unSettled',
  data () {
    return {};
  },
  computed: {
    api_settleList () {
      //return `${this.API_DOMAIN}/list_settle.json`;
      return '/user/v100/Seller/getWaitBrokerageOrder';
    }
  },
  components: {
    'app-title': Title,
    'app-settle-list': SettleList,
  },
  mounted () {},
  methods: {}
};