import './index.scss';

import Title from '~common/components/title';


export default {
  name: 'voucher',
  data () {
    return {
      items: [],
      state: false,
    };
  },
  computed: {
    api () {
      return `${this.API_DOMAIN}/msg_box_act.json`;
    }
  },
  mounted () {
    this.getItems();
  },
  components: {
    'app-title': Title,
  },
  methods: {
    getItems () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api,
      })
      .then((res) => {
        if (0 === res.code) {
          if (true === self.state) {
            self.items = res.data;
          }
          else {
            for (let i in res.data) {
              self.items.push(res.data[i]);
            }
          }
        }
      });
    },
    refresh (done) {
      let self = this;
      setTimeout(function () {
        self.state = true;
        self.getItems();
        done();
      }, 1500);
    },

    infinite (done) {
      let self = this;
      if (1 <= self.items.length) {
        setTimeout(() => {
          done(true);
        }, 1500);
        return;
      }

      setTimeout(function () {
        self.state = false;
        self.getItems();
        done();
      }, 1500);
    }
  }
};