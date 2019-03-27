
import _    from 'lodash';
import Vue  from 'vue';

Vue.filter('money', function (val) {
  let data = val * 1;
  return true === _.isNaN(data) ?  0 : data.toFixed(2);
});