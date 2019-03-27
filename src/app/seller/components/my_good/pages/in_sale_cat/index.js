import './index.scss';

import PageHead     from '~common/components/page_head';
import Footer       from '~common/components/footer';
import Classify     from '~common/components/classify';

export default {
  name: 'inSaleCat',
  data () {
    return {};
  },
  computed: {
    api () {
      //return '/goods/v100/index/getGoodsCategories?categoryId=0';
      return '/user/v100/Seller/getSoldCategory?store_id=142';
      // return '/user/v100/Seller/getSoldCategory?store_id=' + this.$user.get().data.shop_id;
    }
  },
  components: {
    'app-page-head' : PageHead,
    'app-footer'    : Footer,
    'app-classify'  : Classify,
  },
  mounted () {
  },
  methods: {}
};