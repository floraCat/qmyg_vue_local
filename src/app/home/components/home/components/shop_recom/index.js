import './index.scss';

import Swiper from 'swiper';
export default {
  name: 'shopRecom',
  data () {
    return {};
  },
  computed: {},
  mounted () {
/* eslint-disable */
  	new Swiper(this.$refs.shopRecomList, {
  		slidesPerView: 3
  	});
  	/* eslint-disable */
  },
  methods: {}
};