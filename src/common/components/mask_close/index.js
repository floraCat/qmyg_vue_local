
import './index.scss';

export default {
  name: 'maskClose',
  computed: {
		showMask () {
			return this.$store.get.state.MaskClose.showMask;
		}
  },
  methods: {
		/*禁止滚动*/
    noScroll () {
      event.preventDefault();
    },
    /*关闭弹窗*/
    maskClose () {
      this.$store.get.commit({ type: 'showMask', showMask: false});
      this.$store.get.commit({ type: 'openAddr', openAddr: false, stateKey: 'AddressSelect'});
      if (this.$store.get._actions.closeMaskRelated) {
        this.$store.get.dispatch('closeMaskRelated');
      }
    }
  }
};