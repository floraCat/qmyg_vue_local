import './index.scss';

// import _            from 'lodash';
import Title        from '~common/components/title';
import ProfitList   from '~common/components/profit_list';

export default {
	name: 'income_list',
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

	// methods: {
 //    getItems () {
 //      let self = this;
 //      self.page ++;

 //      self.loading = true;

 //      let data = {
 //        params: {
 //          user_id: _.get(self.$user.get(), 'data.user_id'),
 //          page: self.page
 //        }
 //      };


 //      self.axios.get('/user/v100/Account/getYgcoinList', data)
 //      .then((res) => {
 //        self.loading = false;

 //        if ('success' === res.state) {

 //          let data = res.data;

 //          if (1 !== self.page) {
 //            for (let i in data) {
 //              self.items.push(data[i]);
 //            }

 //          }
 //          else {
 //            self.items = data;
 //          }

 //          self.total        = data.total * 1;
 //          self.per_page     = data.per_page * 1;
 //          self.current_page = data.current_page * 1;
 //          self.last_page    = data.last_page * 1;
 //        }


 //      });

 //    },

 //    refresh (done) {
 //      let self = this;
 //      self.page = 0;
 //      self.loading = false;
 //      self.getItems();
 //      done();
 //    },

 //    infinite (done) {
 //      let self = this;
 //      if (false === self.loading) {
 //        if (self.current_page >= self.last_page) {
 //          done(true);
 //          return;
 //        }
 //        self.getItems();
 //        done();
 //      }
 //    }
	// }
};