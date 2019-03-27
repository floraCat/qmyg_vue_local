import './index.scss';

import Title        from '~common/components/title';
import ProfitList   from '~common/components/profit_list';

export default {
  name: 'income_shop',
  data () {
    return {};
  },
  computed: {
    api () {
      return '/user/v100/Account/getYgcoinList';
    }
  },
  mounted () {},
  components: {
    'app-title': Title,
    'app-profit-list': ProfitList,
  },
};