import './index.scss';

import PageHead     from '~common/components/page_head';
import Footer       from '~common/components/footer';
import Classify     from '~common/components/classify';


export default {
  name: 'class',
  data () {
    return {
      api: `${window.API_DOMAIN}/api/goods/v100/index/getGoodsCategories.json?categoryId=0.json`
    };
  },
  computed: {
  },
  mounted () {
  },

  components: {
    'app-page-head' : PageHead,
    'app-footer'    : Footer,
    'app-classify'  : Classify,
  },
  methods: {
  }
};