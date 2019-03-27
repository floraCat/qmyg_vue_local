import './index.scss';

export default {
  data () {
    return {
      items   : [],
      refreshCls : false
    };
  },
  computed: {
    api () {
      return `${window.API_DOMAIN}/api/index/v100/index/getNavs.json`;
    }
  },
  mounted () {
    this.ajax();
  },
  methods: {
    ajax () {
      let self = this;
      self.axios({
        method : 'GET',
        url    :self.api,
        params :{}
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items = res.data;
        }
        this.refreshCls = false;
      });
    },
    refresh () {
      this.refreshCls = true;
      this.ajax();
    }
  }
};