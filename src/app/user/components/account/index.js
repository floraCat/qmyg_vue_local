import './index.scss';

import Title    from '~common/components/title';
import Waiting  from '~common/components/waiting';

export default {
	name: 'user_account',
  data () {
    return {
      items    : [],
      msg      : 'this is account',
      showPage : false,
      waite     : true
    };
  },
  computed: {
    api () {
      return `${this.API_DOMAIN}/user_account.json`;
    },
  },
  mounted () {
    this.ajax();
  },
  methods: {
    //数据初始化
    ajax () {
      let self = this;
      self.axios({
        method: 'GET',
        url:self.api,
        data:{}
      })
      .then((res) => {
        self.items = res.pop();
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