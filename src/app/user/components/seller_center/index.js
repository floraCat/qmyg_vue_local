import './index.scss';

import Title from '~common/components/title';


export default {
	name: 'user_help',
  data () {
    return {
      items: [
        {
          text: '客服服务',
          link: '#',
        },
        {
          text: '公司荣誉',
          link: '#',
        },
        {
          text: '自由合伙人',
          link: 'http://e.eqxiu.com/s/3OVvkPCL?eqrcode=1&from=timeline&isappinstalled=0',
        },
        {
          text: '媒体报道',
          link: '#',
        }
      ]
    };
  },
  components: {
    'app-title': Title,
  }
};