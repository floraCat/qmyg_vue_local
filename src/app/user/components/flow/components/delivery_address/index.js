import './index.scss';

import Title        from '~common/components/title';

export default {
	name: 'delivery_address',
	data () {
		return {
			checkOn : 0
		};
	},
	components: {
    'app-title':      Title,
  },
	computed: {},
	props : ['items', 'finish'],
	watch: {
		items () {
			for (let i in this.items) {
				if (this.items[i].is_default) {
					this.checkOn = i * 1;
				}
			}
		}
	},
	methods: {
		check (index) {
			let self = this;
			this.checkOn = index;
			setTimeout(function () {
				self.finish(index);
			}, 500);
		},
		goBack () {
			this.finish('');
		}
	}
};