import './index.scss';

export default {
	name: 'apply_refound',
  data () {
    return {
      isOpen : false,
      curIndex : null,
      defVal : null
    };
  },
  props: ['items', 'defaultVal'],
  mounted () {
    this.defVal = this.defaultVal || '请选择';
  },
	methods: {
    /*下拉选择*/
    handleSelect (index) {
      this.isOpen = false;
      if (null === index) {
        this.defVal = this.defaultVal || '请选择';
      }
      else {
        this.defVal = this.items[index].txt;
      }
      this.curIndex = index;
    }
	}
};