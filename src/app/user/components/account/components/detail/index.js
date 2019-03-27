import './index.scss';

import _        from 'lodash';
import Title    from '~common/components/title';
import Waiting  from '~common/components/waiting';

export default {
	name: 'user_withdtawals_detail',
  data () {
    return {
      detail  : [],
      showPage : false,
      waite    : true
    };
  },
  computed: {

  },
  mounted () {
    this.ajax();
  },
  methods: {
    //初始化数据
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url: '/user/v100/Account/getWithdrawById',
        params: {
          id: _.get(self.$route, 'params.id'),
        }
      })
      .then((res) => {
        self.detail = res.data;
        self.showPage = true;
        self.waite = false;
      });
    }
  },
  components: {
    'app-title' : Title,
    'app-wait'  : Waiting,
  }
};