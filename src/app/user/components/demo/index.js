import './index.scss';

import cropper from '~common/components/cropper';

export default {
	name: 'demo',
	mounted () {
	},
  components: {
    cropper
  },
	computed: {},
	methods: {
		submit () {
			/**
			 * $validator 验证插件 ~common/services/validator
			 * 0 返回正常，1 空值，2 验证不通过，3 正则组找不到
			 *
			 * $toast 弹出框插件   ~common/services/toast
			 */
			let item = this.$refs.form;
			let res = this.$validator(item);
			if (0 !== res.code) {
				this.$toast(res.data.msg);
			}
			return false;
		},


		/**
		 * Dialog弹窗例子
		 * func回调函数可省略
		 * lists最多放2组
		 */
		handleDialog () {
			this.$store.get.dispatch({
				type 	: 'handleChangeDialog',
				active: true,
				title : '警告',
				msg   : '测试内容',
				lists : [
					{
						msg: '取消',
						func () {
							/* eslint-disable */
							console.log('取消');
							/* eslint-enable */
						}
					},
					{
						msg: '确认',
					},
				]
			});
		}
	}
};