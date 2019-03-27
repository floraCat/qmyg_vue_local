import './index.scss';

export default {
	name: 'classList',
	props: ['goodData'],
	computed: {
		goodsData () {
			return this.goodData || {};
		},
		routerTo () {
			let rs;
			let routerName = this.$route.name;
			if ('seller.AddGoodCat' === routerName) {
				rs = 'seller.AddGood';
			}
			if ('seller.InSaleCat' === routerName) {
				rs = 'seller.InSale';
			}
			if ('home.Class' === routerName) {
				rs = 'home.List';
			}
			return rs;
		}
	},
};