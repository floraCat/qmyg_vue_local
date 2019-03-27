import Vue  from 'vue';

/*时间戳转换成格式："2017-08-05"*/
Vue.filter('date', function (val) {
  let now = new Date(val);
  let year = now.getYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  return year + '-' + month + '-' + date;
});

/*时间戳转换成格式："2017-08-05 01:29:36"*/
Vue.filter('time', function (val) {
  let now = new Date(val);
  let year = now.getYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second;
});