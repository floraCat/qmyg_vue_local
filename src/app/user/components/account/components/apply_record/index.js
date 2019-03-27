import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';
import Waiting  from '~common/components/waiting';
import Gotop    from '~common/components/gotop';
import Scroller from '~common/components/scroller';

export default {
	name: 'user_apply_record',
  data () {
    return {
      showPage   : false,
      waite      : true,
      page       : 0,
      formTemp   : {
        current_page: 1,
        last_page   : 1,
        per_page    : 1,
        total       : 1,
        data        : []
      },
      /*swiper对象*/
      swiperObj : {}
    };
  },
  computed: {
    api () {
      return `${this.API_DOMAIN}/user_applyData.json`;
    }
  },
  mounted () {
    this.swiperObj = this.$refs.swiperObj.swiper;
    this.getItems();
  },
  methods: {

    //初始化数据
    getItems () {
      let self = this;

      self.page ++;

      self.axios({
        method: 'GET',
        url: '/user/v100/Account/getWithdrawList',
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
          page: self.page,
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          let data = res.data;

          if (1 !== self.page) {
            for (let i in data.data) {
              self.formTemp.data.push(data.data[i]);
            }
          }
          else {
            self.formTemp.data = data.data;
          }

          self.formTemp = _.assign({}, self.formTemp, {
            current_page: res.data.current_page * 1,
            last_page   : res.data.last_page * 1,
            per_page    : res.data.per_page * 1,
            total       : res.data.total * 1,
          });
        }

        self.showPage = true;
        self.waite = false;
      });
    },


    refresh (done) {
      let self = this;
      self.page = 0;
      self.loading = false;
      self.getItems();
      done();
    },

    infinite (done) {
      let self = this;

      if (self.formTemp.current_page >= self.formTemp.last_page) {
        done(true);
        return;
      }
      self.getItems();
      done();

    }
  },
  components: {
    'app-title'  : Title,
    'app-wait'   : Waiting,
    'app-gotop'  : Gotop,
    Scroller
  }
};