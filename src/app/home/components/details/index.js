import './index.scss';

import Title   from '~common/components/title';
import Gotop   from '~common/components/gotop';

export default {
  data () {
    return {
      // 用于手动重装组件
      updated : true,
      curId   : null,
      // router的active类名在添加query时无效，+自定义active状态
			active : null
    };
  },
  components: {
    'app-title' : Title,
    'app-gotop' : Gotop,
  },
  beforeRouteUpdate  (to, from, next) {
    // 路由切换时重置
    this.active = null;
    // 同页不同id重装组件
    if (to.name === from.name) {
      if (to.params.id !== from.params.id) {
        this.updated = false;
      }
      let self = this;
      setTimeout(function () {
        self.updated = true;
      }, 0);
    }
    next();
  },
  mounted () {
    this.curId = this.$route.params.id;
  },
  methods: {}
};