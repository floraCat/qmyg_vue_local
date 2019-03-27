import './index.scss';

export default {
  name: 'dropdown',
  data () {
    return {
    };
  },
  props:{
    menu: {
      type: Array,
      default: [],
    },
    icon: {
      type: String,
      default: '',
    }
  },
  computed: {
    toggle () {
      return this.$store.get.state.Dropdown.toggle;
    },
    curSelect () {
      return this.$store.get.state.Dropdown.item;
    }
  },
  mounted () {
    this.$store.get.dispatch({
      type  : 'toggle',
      toggle: false,
      item  : this.curSelect
    });

  },
  components: {
  },
  methods: {
    handleToggle () {
      this.$store.get.dispatch({
        type: 'toggle',
        toggle: !this.toggle,
      });
    },
    handleSelect (item) {
      this.$store.get.dispatch({
        type  : 'toggle',
        toggle: false,
        item  : item
      });
    }
  }
};