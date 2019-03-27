import './index.scss';

export default {
  name: 'sidebar',
  data () {
    return {};
  },
  props:['close'],
  computed: {
    userInfo () {
      return this.$user.get().data;
    }
  },
  methods: {
    /*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    closeSidebar () {
      this.close();
    }
  },
  filters: {
    /*用户身份*/
    userLabel (val) {
      let rs;
      switch (val) {
        case 0:
          rs = '普通用户';
          break;
        case 1:
          rs = '大创客';
          break;
      }
      return rs;
    }
  }
};