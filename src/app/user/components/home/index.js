import './index.scss';

import _            from 'lodash';
import Header       from './components/header';
import Tips         from './components/tips';

import Gotop        from '~common/components/gotop';
import Footer       from '~common/components/footer';
import LayoutTopic  from '~common/components/layout_topic';

export default {
	name: 'home',
  data () {
    return {
      /*专题数组*/
      items_topics: [],
      referer: '',
      formTemp: {},
    };
  },
	mounted () {
    this.referer = this.$route.name;
    this.getLayoutTopic();
    this.getUserTotal();
	},
	computed: {
  },
  components: {
    'app-header' 			: Header,
    'app-layout-topic': LayoutTopic,
    'app-gotop'       : Gotop,
    'app-footer'      : Footer,
    'app-tips'        : Tips,
  },
	methods: {
    getUserTotal () {
      let self = this;
      self.axios.get('/user/v100/Profile/getUserTotal', {
        params: {
          user_id: _.get(self.$user.get(), 'data.user_id')
        }
      })
      .then((res) => {
        if ('success' === res.state) {
          _.assign(self.formTemp, res.data);
        }
      });
    },
    /*请求专题数据*/
    getLayoutTopic () {
      let self = this;
      self.axios.get('/show/v100/Index/getTopicGoods')
      .then((res) => {
        if ('success' === res.state) {
          /*接口问题，修复后删除 start*/
          for (let i in res.data) {
            if (!res.data[i].title) {
              res.data[i].title = {
                href: '',
                img:''
              };
            }
          }
          /*接口问题，修复后删除 end*/
          self.items_topics = res.data;
        }
      });
    },
	}
};