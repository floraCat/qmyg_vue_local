import './index.scss';

import Scroller      from '~common/components/scroller';

export default {
  name: 'settleList',
  components: {
    Scroller
  },
  data () {
    return {
      items : [],
      curPage : 1,
      pageCount : 0,
      listRows : 10,
      noContent : false,
      action : 'refresh'
    };
  },
  props: ['api'],
  mounted () {
    this.ajax();
  },
  methods: {
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api,
        params: {
          store_id:self.$user.get().data.store_info.id,
          page:self.curPage,
          list_rows:self.listRows
        }
      }).then((res) => {
        // console.log(res);
        if ('success' === res.state) {
          if (0 >= res.data.data.length) {
            self.noContent = true;
          }
          else {
            self.noContent = false;
          }
          if ('refresh' === self.action) {
            self.items = res.data.data;
          }
          if ('infinite' === self.action) {
            self.items = self.items.concat(res.data.data);
          }
          // 总页数
          self.pageCount = res.data.last_page;
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
  }
};