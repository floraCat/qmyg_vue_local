import './index.scss';

import locationSelecter from './components/location_selecter';

export default {
  data () {
    return {
      msg_nums : 0
    };
  },
  mounted () {
    this.$store.get.dispatch('locationSelecterClose');
    this.getMessage();
  },
  computed: {
    api_message () {
      return `${window.API_DOMAIN}/api/user/v100/Profile/getUserTotal.json`;
    },
    // 当前
    current () {
      return this.$store.get.state.LocationSelecter.current;
    },
  },
  components: {
    'location-selecter': locationSelecter,
  },
  methods: {
    locationSelecterOpen () {
      this.$store.get.dispatch('locationSelecterOpen');
    },
    /*消息数量*/
    getMessage () {
      let self = this;
      self.axios({
        method : 'GET',
        url    : self.api_message,
        params : {
          user_id : self.$user.get().data ? self.$user.get().data.user_id : 0
        }
      }).then((res) => {
        this.msg_nums = 99 >= res.data.message ? res.data.message : 99;
      });
    }
  }
};