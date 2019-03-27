import './index.scss';

import Title   from '~common/components/title';
import Echarts from '~common/components/echarts';

export default {
  name: 'count_sale',
  data () {
    return {};
  },
  components: {
    'app-title': Title,
    'app-echarts': Echarts,
  },
  computed: {
    api_sale () {
      return '/user/v100/Seller/getStoreRevenueCharts';
    }
  },
  mounted () {
  },
  methods: {
  }
};