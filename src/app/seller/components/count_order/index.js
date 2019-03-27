import './index.scss';

import Title   from '~common/components/title';
import Echarts from '~common/components/echarts';

export default {
  name: 'count_order',
  data () {
    return {};
  },
  components: {
    'app-title': Title,
    'app-echarts': Echarts,
  },
  computed: {
    api_order () {
      return '/user/v100/Seller/getStoreOrderCharts';
    }
  },
  mounted () {
  },
  methods: {
  }
};