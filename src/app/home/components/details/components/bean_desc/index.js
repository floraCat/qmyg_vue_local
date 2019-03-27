import './index.scss';

export default {
  name: 'beanDesc',
  data () {
    return {};
  },
  methods: {
		/*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
  }
};