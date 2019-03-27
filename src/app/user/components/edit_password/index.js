import './index.scss';

import Title        from '~common/components/title';

export default {
	name: 'editpassword',
	data () {
		return {
      closeflag: [false, false, false],
      placeholder: ['请输入旧密码', '请输入新密码', '确认输入新密码'],
      value: ['', '', ''],
      eye: [false, false, false],
    };
	},
	mounted () {},
  components: {
    'app-title':      Title,
  },
	methods: {
    input (index) {
      0 < this.value[index].length ? this.$set(this.closeflag, index, true) : this.$set(this.closeflag, index, false);
    },
    close (index) {
      this.$set(this.value, index, '');
      this.$set(this.closeflag, index, false);
    },
    see (index) {
      this.$set(this.eye, index, !this.eye[index]);
    },
    submit () {},
  },
	computed: {},
};