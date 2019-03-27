import './index.scss';

export default {
  name: 'act',
  data () {
    return {
      items: [],
      items2: []
    };
  },
  computed: {
    api1 () {
      return `${window.API_DOMAIN}/api/show/v100/Index/getNavBelowShow.json`;
    },
    api2 () {
      return `${window.API_DOMAIN}/api/show/v100/Index/getFourGridShow.json`;
    }
  },
  mounted () {
    this.ajax1();
    this.ajax2();
  },
  methods: {
    ajax1 () {
      let self = this;
      self.axios({
        method: 'GET',
        url:self.api1,
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items = res.data;
        }
      });
    },
    ajax2 () {
      let self = this;
      self.axios({
        method: 'GET',
        url:self.api2,
      })
      .then((res) => {
        if ('success' === res.state) {
          self.items2 = res.data;
        }
      });
    }
  }
};