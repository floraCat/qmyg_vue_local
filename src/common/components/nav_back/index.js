
import './index.scss';

export default {
  name: 'navBack',
  methods: {
    goBack () {
      this.$router.go(-1);
    },
  }
};