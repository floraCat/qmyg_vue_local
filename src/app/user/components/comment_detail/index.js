import './index.scss';

import Title from '~common/components/title';


export default {
  name: 'voucher',
  data () {
    return {
      comment: '',
      star: 0,
      maxValue: 100,
    };
  },
  computed: {

  },
  watch: {
    comment () {
      this.maxValue = 100 - this.comment.length;
    }
  },
  mounted () {

  },
  components: {
    'app-title': Title,
  },
  methods: {
    handleSelect (index) {
      this.star = index;
    }
  }
};