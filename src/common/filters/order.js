import _    from 'lodash';
import Vue  from 'vue';

/*订单确认状态*/
Vue.filter('statusOrder', function (key) {
  const dict = [
    {
      label: '未确认',
      value: 0,
    },
    {
      label: '已确认',
      value: 1,
    },
    {
      label: '已取消',
      value: 2,
    },
  ];

  if (_.isObject(key) || _.isArray(key)) {
    return dict;
  }

  const item = _.find(dict, { value: key });
  return item ? item.label : key;
});

/*订单付款状态*/
Vue.filter('statusPay', function (key) {
  const dict = [
    {
      label: '未付款',
      value: 0,
    },
    {
      label: '付款中',
      value: 1,
    },
    {
      label: '已付款',
      value: 2,
    },
  ];

  if (_.isObject(key) || _.isArray(key)) {
    return dict;
  }

  const item = _.find(dict, { value: key });
  return item ? item.label : key;
});

/*订单发货状态*/
Vue.filter('statusShipping', function (key) {
  const dict = [
    {
      label: '未发货',
      value: 0,
    },
    {
      label: '已发货',
      value: 1,
    },
    {
      label: '已收货',
      value: 2,
    },
  ];

  if (_.isObject(key) || _.isArray(key)) {
    return dict;
  }

  const item = _.find(dict, { value: key });
  return item ? item.label : key;
});