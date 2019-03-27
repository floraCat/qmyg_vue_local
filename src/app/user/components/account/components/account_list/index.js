import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';
import Waiting  from '~common/components/waiting';

export default {
	name: 'account_list',
  data () {
    return {
      items     : [],
      showPage  : false,
      waite     : true
    };
  },

  computed: {


    title () {
      return 0 === this.$route.query.type * 1 ? '余额明细' : '易购豆明细';
    }
  },
  mounted () {
    this.getData();
  },
  methods: {

    //初始化数据
    getData () {
      let self = this;
      let uid  = _.get(self.$user.get(), 'data.user_id');
      self.axios({
        method: 'GET',
        url: '/user/v100/Account/getSurplusList',
        params: {
          user_id: uid,
          type: 0 === this.$route.query.type * 1 ? 0 : 1,
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items = res.data;
        }
        self.showPage = true;
        self.waite = false;
      });
    },

  },
  components: {
    'app-title'     : Title,
    'app-wait'      : Waiting,
  }
};