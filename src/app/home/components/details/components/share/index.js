import './index.scss';

export default {
  name: 'share',
  data () {
    return {};
  },
  props:['close'],
  methods: {
    /*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    closeShare () {
      this.close();
    }
  }
};