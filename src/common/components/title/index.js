import './index.scss';

export default {
  props: ['title', 'undefined'],
  data () {
    return {
      flag: false
    };
  },
  methods: {
    toggle () {
      this.flag = !this.flag;
    },
    goBack () {
      if ('undefined' === typeof this.undefined) {
        this.$router.go(-1);
      }
      else {
        this.$emit('goBack');
      }
    },
    logout () {
      let self = this;
      self.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        title : '温馨提示',
        msg   : '是否退出登录？',
        lists : [
          {
            msg: '取消',
          },
          {
            msg: '确认',
            func () {
              self.$toast('退出成功');
              sessionStorage.removeItem('userInfo');
              self.$store.get.dispatch({
                type: 'userInfo',
                userInfo: {},
              });
              self.$router.push({
                name: 'home.Home',
              });
            }
          },
        ]
      });
    }
  }
};