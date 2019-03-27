import './index.scss';

import _ 						from 'lodash';
import Title        from '~common/components/title';
import Nickname     from './components/nickname';
import Sex          from './components/sex';
import Phone        from './components/phone';
import cropper 			from '~common/components/cropper';

export default {
	name: 'profile-wrapper',
	data () {
		return {
			bf: {
				nf: false,
				sf: false,
				pf: false,
				isLoading: false,
			},
		};
	},
	beforeCreate () {
		this.$store.get.dispatch({
			type: 'userInfo',
			user: _.get(this.$user.get(), 'data')
		});
	},

	computed: {
		user () {
			return _.get(this.$store.get.state, 'Profile.user') || {};
		},
		avatar () {
			return _.get(this.$store.get.state, 'Cropper.images') || {};
		}
	},
	watch: {
		avatar () {
			if (_.get(this.user, 'user_picture') !== _.get(this.avatar, 'url')) {
				this.updataAvatar();
			}
		}
	},
	mounted () {
	},
  components: {
    'app-title':      Title,
    'app-nickname':   Nickname,
    'app-sex':        Sex,
    'app-phone':      Phone,
    cropper,
  },
	methods: {
		switchNick () {
			this.bf.nf = true;
		},
		switchSex () {
			this.bf.sf = true;
		},
		switchPhone () {
			this.bf.pf = true;
		},

		// 更新头像
		updataAvatar () {
			let self = this;
			if (true === self.isLoading) {
        self.$toast('正在为您提交');
        return false;
      }
      self.isLoading = true;

			let data = _.assign({}, _.get(self.$user.get(), 'data'), { user_picture: self.avatar.url });

			self.axios
			.post('/user/v100/Profile/modifyUserInfo', {
				user_id: self.user.user_id,
				avatar: self.avatar.filename,
			})
			.then((res) => {
				if ('success' === res.state) {
					self.$user.set(data);
					self.$store.get.dispatch({
						type: 'userInfo',
						user: data
					});
				}
				self.isLoading = false;
			});
		},

		// 退出登录
		logout () {
			let self = this;
      self.$store.get.commit({
        stateKey: 'App',
        type: 'appFixed',
        appFixed: true
      });
			self.$store.get.dispatch({
				type 	: 'handleChangeDialog',
				active: true,
				title : '温馨提示',
				msg   : '是否退出登录？',
				lists : [
					{
						msg: '取消',
					},
					{
						msg: '确认',
						func () {
							self.$toast('退出成功');
							sessionStorage.removeItem('userInfo');
							self.$store.get.dispatch({
								type: 'userInfo',
								userInfo: {},
							});
							self.$router.push({
								name: 'home.Home',
							});
						}
					},
				]
			});

		}
	},
};