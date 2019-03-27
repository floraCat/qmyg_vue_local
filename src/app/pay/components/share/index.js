import './index.scss';

export default {
  name: 'payShare',
  data () {
    return {
      checked: true,
      referer: '',
    };
  },
  components: {
  },
  mounted () {
    this.referer = this.$route.name;
  },
  computed: {
  },
  methods: {
    hanldeCheck () {
      this.checked = !this.checked;
    },
  }
};