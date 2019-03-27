import './index.scss';

import _       from 'lodash';
import Title   from '~common/components/title';
import Waiting from '~common/components/waiting';
import Gotop   from '~common/components/gotop';

export default {
	name: 'user_team',
  data () {
    return {
      loading : true,
      type    : 1,
      teamList: [],
    };
  },
  computed: {
    api_team () {
      return '/user/v100/Team/getTeamList';
    }
  },
  mounted () {
    this.getTeamList();
  },
  methods: {
    getTeamList () {
      let self = this;
      self.loading = true;
      let data = {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id'),
          type: self.type
        }
      };

      self.axios.get(self.api_team, data)
      .then((res) => {
        self.loading = false;
        if ('success' === res.state) {
          self.teamList = res.data;
        }
        if ('fail' === res.state) {
          self.teamList = [];
        }
      });
    },

    handleChangeType (type) {
      this.type = type;
      this.getTeamList();
    }
  },
  components: {
    'app-title': Title,
    'app-wait' : Waiting,
    'app-gotop': Gotop
  }
};