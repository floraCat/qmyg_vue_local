import './index.scss';

import Title        from '~common/components/title';

export default {
  name: 'unSettled',
  data () {
    return {};
  },
  computed: {
    api () {
      return `${this.API_DOMAIN}/xxx.json`;
    }
  },
  components: {
    'app-title': Title,
  },
  mounted () {},
  methods: {}
};