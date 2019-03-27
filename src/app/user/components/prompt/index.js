import './index.scss';

import Title    from '~common/components/title';

export default {
	name: 'prompt',
  data () {
    return {
      title : '操作成功',
      items : [
        {
          txt    : '返回首页',
          linkTo : { name: 'home.Home'}
        }
      ]
    };
  },
  mounted () {
    switch (this.$route.query.handle) {
      // 取消订单
      case 'order_cancel':
        this.title = '订单取消成功';
        this.items = [
          {
            txt    : '查看该订单',
            linkTo : { name: 'user.OrderDetail', params: {id : this.$route.query.id}}
          }
        ];
        break;
      // 删除订单
      case 'order_del':
        this.title = '订单删除成功';
        this.items = [
          {
            txt    : '返回订单列表',
            linkTo : { name: 'user.Order'}
          }
        ];
        break;
      // 取消退换货
      case 'cancel_refound':
        this.title = '取消成功';
        this.items = [
          {
            txt    : '退换货列表',
            linkTo : { name: 'user.Refound'}
          }
        ];
        break;
      // 售后申请
      case 'refound_apply':
        this.title = '申请提交成功，工作人员将尽快审核！';
        this.items = [
          {
            txt    : '查看退换货列表',
            linkTo : { name: 'user.Refound'}
          }
        ];
        break;
      default :
        // console.log('default');
    }
  },
  components: {
    'app-title': Title,
  },
	methods: {

  }
};