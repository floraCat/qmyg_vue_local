import './index.scss';

import Title        from '~common/components/title';
import Gotop        from '~common/components/gotop';
import Scroller     from '~common/components/scroller';

export default {
  name: 'myGood',
  data () {
    return {
      /*是否显示公告*/
      openNote: true,
      /*商品数组*/
      items: [],
      /*要取消的商品数组*/
      itemsCancel: {
        ids   : [],
        indexs: []
      },
      /*当前选中*/
      curChecks: [],
      /*是否全选*/
      allChecked: false,
      /*当前分页*/
      curPage: 1,
      /*总页数*/
      pageCount: 0,
      /*弹窗-取消代理*/
      openHandle: false,
      /*弹窗-添加新商品*/
      openAddGood: true,
      /*刷新 or 加载*/
      action: '',
      /*swiper实例*/
      swiperObj: {}
    };
  },
  computed: {
    /*商品列表接口*/
    api_list () {
      //return `${this.API_DOMAIN}/my_good.json`;
      return '/user/v100/Seller/getSoldGoods';
    },
    /*取消代理接口*/
    api_cancel_agent () {
      //return `${this.API_DOMAIN}/test.json`;
      return '/user/v100/Seller/cancelAgentGoods';
    },
    catId () {
      return this.$route.query.cat_id;
    },
  },
  components: {
    'app-title': Title,
    'app-gotop': Gotop,
    Scroller
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
    this.action = 'refresh';
    this.ajax();
  },
  watch: {
    openNote () {
      this.$nextTick(function () {
        this.swiperObj.update();
      });
    }
  },
  methods: {
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_list,
        params: {
          store_id   : self.$user.get().data.store_info.id,
          user_id    : self.$user.get().data.user_id,
          category_id: self.catId,
          page       : self.curPage,
        }
      }).then((res) => {
        if ('success' === res.state) {
          // console.log('在售商品');
          // console.log(res);
          if ('refresh' === self.action) {
            self.items = res.data.data;
            for (let i in self.items) {
              self.curChecks[i] = false;
            }
          }
          if ('infinite' === self.action) {
            self.items = self.items.concat(res.data.data);
            self.curChecks.length = self.items.length;
          }
          self.pageCount = res.data.last_page;
          self.allChecked = false;
        }
      });
    },
    /*上拉刷新*/
    refresh (done) {
      this.action = 'refresh';
      this.curPage = 1;
      this.ajax();
      done();
    },
    /*下拉加载*/
    infinite (done) {
      this.action = 'infinite';
      if (this.curPage >= this.pageCount) {
        done(true);
      }
      else {
        this.curPage += 1;
        this.ajax();
        done();
      }
    },

    /*关闭公告*/
    closeNote () {
      this.openNote = false;
    },
    /*选中商品*/
    checkGood (index) {
      let self = this;
      if (!this.openHandle) {
        this.openHandle = true;
        this.openAddGood = false;
      }
      this.allChecked = false;
      this.curChecks.splice(index, 1, !this.curChecks[index]);
      this.checkAllTest(index);
      if (this.curChecks[index]) {
        this.itemsCancel.ids.push(this.items[index].agent_id);
        this.itemsCancel.indexs.push(index);
      }
      else {
        let arr = [];
        for (let i in this.itemsCancel.ids) {
          if (self.itemsCancel.ids[i] !== self.items[index].agent_id) {
            arr.push(self.itemsCancel.ids[i]);
          }
        }
        self.itemsCancel.ids = arr;
      }
    },
    /*全选检测*/
    checkAllTest (index) {
      if (this.curChecks[index]) {
        let flag = true;
        for (let i = 0; i < this.curChecks.length; i ++) {
          if (!this.curChecks[i]) {
            flag = false;
            break;
          }
        }
        this.allChecked = flag ? true : false;
      }
      else {
        this.allChecked = false;
      }
    },
    /*全选*/
    checkAll () {
      let self = this;
      this.allChecked = !this.allChecked;
      let len = self.curChecks.length;
      if (this.allChecked) {
        self.itemsCancel.ids = [];
        self.itemsCancel.indexs = [];
        for (let i = 0; i < len; i ++) {
          self.curChecks.splice(i, 1, true);
          self.itemsCancel.ids.push(self.items[i].agent_id);
          self.itemsCancel.indexs.push(i);
        }
      }
      else {
        for (let i = 0; i <= len; i ++) {
          self.curChecks.splice(i, 1, false);
        }
        self.itemsCancel.ids = [];
        self.itemsCancel.indexs = [];
      }
    },
    /*取消代理*/
    cancelAgent () {
      let self = this;
      if (0 < self.itemsCancel.ids.length) {
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          customClass : 'DialogMgGood',
          active: true,
          msg   : '你是否确认取消代理？',
          lists : [
            {
              msg: '取消',
            },
            {
              msg: '确认',
              func () {
                self.axios({
                  method : 'POST',
                  url    : self.api_cancel_agent,
                  data : {
                    user_id : self.$user.get().data.user_id,
                    goods_ids : self.itemsCancel.ids.join(',')
                  }
                }).then((res) => {
                  // console.log(self.itemsCancel.ids.join(','));
                  // console.log(res);
                  if ('success' === res.state) {
                    self.$toast('取消代理成功');
                    let arr = [];
                    let arr2 = [];
                    for (let i in self.items) {
                      let flag = true;
                      for (let j in self.itemsCancel.indexs) {
                        if (i * 1 === self.itemsCancel.indexs[j]) {
                          flag = false;
                        }
                      }
                      if (flag) {
                        arr.push(self.items[i]);
                        arr2.push(false);
                      }
                    }
                    self.items = arr;
                    self.curChecks = arr2;
                    self.$nextTick(function () {
                      self.swiperObj.setWrapperTranslate(0);
                    });
                    self.itemsCancel.ids = [];
                    self.itemsCancel.indexs = [];
                  }
                });
              }
            },
          ]
        });
      }
      else {
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          customClass : 'DialogMgGood',
          active: true,
          msg   : '请选择要取消代理的商品',
          lists : [
            {
              msg: '确认',
            },
          ]
        });
      }
    },
    /*取消选取*/
    cancelSelect () {
      let self = this;
      self.allChecked = false;
      self.openHandle = false;
      self.openAddGood = true;
      let len = self.curChecks.length;
      for (let i = 0; i <= len; i ++) {
        self.curChecks.splice(i, 1, false);
      }
      self.itemsCancel = [];
    },
  }
};