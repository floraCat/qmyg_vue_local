import './index.scss';

export default {
  name: 'img_list',
  data () {
    return {};
  },
  computed: {
    items () {
      return this.$store.get.state.Imglist.items;
    },
    curPage () {
      return this.$store.get.state.Imglist.curPage;
    },
  },
  props: ['api', 'catId'],
  mounted () {
    let self = this;
    this.$store.get.commit({ type: 'api_list', api_list: self.api});
    if (this.catId) {
      this.$store.get.commit({ type: 'catId', catId: self.catId});
    }
    // 搜索列表
    if (this.$route.query.search) {
      this.$store.get.commit({ type: 'getImglist', keyword: this.$route.query.search});
    }
    // 初始加载第一页
    this.$store.get.dispatch({
      type: 'getImglist',
      curPage : 1,
      action : 'refresh'
    });
  },
  methods:{}
};