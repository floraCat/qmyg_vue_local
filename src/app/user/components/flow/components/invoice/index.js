import './index.scss';

export default {
	name: 'invoice',
	props: ['bflag'],
	data () {
		return {
			riseText: '',
			invoice: [
				{
					id: 0,
					name: '不开发票',
					flag: true
				},
				{
					id: 1,
					name: '明细',
					flag: false
				},
				{
					id: 2,
					name: '办公用品',
					flag: false
				},
				{
					id: 3,
					name: '电脑配件',
					flag: false
				},
				{
					id: 4,
					name: '耗材',
					flag: false
				},
				{
					id: 5,
					name: '增值税',
					flag: false
				}
			],
		};
	},
	computed: {},
	methods: {
		select (index) {
			for (let i = 0; i < this.invoice.length; i ++ ) {
				this.invoice[i].flag = false;
			}
			this.invoice[index].flag = true;
		},
		confirm () {
			let self = this;
			let invoice = {id: 0, name: '', rise: self.riseText};
			for (let i = 0; i < this.invoice.length; i ++ ) {
				if (true === this.invoice[i].flag) {
					invoice.id = this.invoice[i].id;
					invoice.name = this.invoice[i].name;
				}
			}
			this.bflag.iflag = false;
			this.$emit('confirm', invoice);
		},
	}
};