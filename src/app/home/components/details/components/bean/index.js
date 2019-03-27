import './index.scss';

export default {
  name: 'bean',
  data () {
    return {};
  },
  props:['close'],
  methods: {
    /*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    closeBean () {
      this.close();
    }
  }
};