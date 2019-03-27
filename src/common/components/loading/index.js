import './index.scss';

export default {
  name: 'Loding',
  computed: {
    text () {
      return this.$store.get.state.Loading.Text;
    }
  },
  components: {
  },
  methods: {

  }
};