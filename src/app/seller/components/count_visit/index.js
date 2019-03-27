import './index.scss';

import Title   from '~common/components/title';
import Echarts from '~common/components/echarts';

export default {
  name: 'count_visit',
  data () {
    return {};
  },
  components: {
    'app-title': Title,
    'app-echarts': Echarts,
  },
  computed: {
    api_visit () {
      return '/user/v100/Seller/getStoreViewCharts';
    }
  },
  mounted () {
  },
  methods: {
  }
};