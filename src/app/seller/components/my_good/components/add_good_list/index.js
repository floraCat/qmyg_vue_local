import './index.scss';

export default {
  name: 'img_list',
  data () {
    return {};
  },
  computed: {
    items () {
      return this.$store.get.state.AddGoodList.items;
    },
    agentArr () {
      return this.$store.get.state.AddGoodList.agentArr;
    },
    curSelects () {
      return this.$store.get.state.AddGoodList.curSelects;
    }
  },
  props: ['api'],
  mounted () {
    let self = this;
    this.$store.get.commit({ type: 'api_list', api_list: self.api});
    this.$store.get.commit({ type: 'catId', catId: self.$route.query.cat_id});
    // 搜索列表
    if (this.$route.query.search) {
      this.$store.get.commit({ type: 'getAddGoodList', keyword: this.$route.query.search});
    }
    // 初始加载第一页
    else {
      this.$store.get.dispatch({
        type: 'getAddGoodList',
        curPage : 1
      });
    }
  },
  methods:{

    /*添加单个代理*/
    addAgent (index) {
      let self = this;
      let _AddGoodList = this.$store.get.state.AddGoodList;
      this.$store.get.commit({ type: 'openHandle', openHandle: true});
      let curSelects = _AddGoodList.curSelects;
      curSelects.splice(index, 1, !curSelects[index]);
      this.$store.get.commit({ type: 'curSelects', curSelects: curSelects });
      // 选中
      if (_AddGoodList.curSelects[index]) {
        let agentArr = _AddGoodList.agentArr;
        agentArr.push(this.items[index].goods_id);
        this.$store.get.commit({ type: 'agentArr', agentArr: agentArr});
        this.$store.get.commit({ type: 'numSelected', numSelected: agentArr.length});
      }
      // 取消选中
      else {
        let agentArr = _AddGoodList.agentArr;
        let arr = [];
        for (let i = 0; i < agentArr.length; i ++) {
          if (agentArr[i] !== self.items[index].goods_id) {
            arr.push(agentArr[i]);
          }
        }
        this.$store.get.commit({ type: 'agentArr', agentArr: arr});
        this.$store.get.commit({ type: 'numSelected', numSelected: arr.length});
      }
      this.selectAllTest(index);
    },
    selectAllTest (index) {
      if (this.curSelects[index]) {
        let flag = true;
        for (let i = 0; i < this.curSelects.length; i ++) {
          if (!this.curSelects[i]) {
            flag = false;
            break;
          }
        }
        let allSelected = flag ? true : false;
        this.$store.get.commit({ type: 'allSelected', allSelected: allSelected});
      }
      else {
        this.$store.get.commit({ type: 'allSelected', allSelected: false});
      }
    }
  }
};