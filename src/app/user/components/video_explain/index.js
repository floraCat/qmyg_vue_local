import './index.scss';

export default {
  name: 'video_explain',
  data () {
    return {
      items : []
    };
  },
  computed: {},
  mounted () {
    this.getItems();
  },
  methods: {
    getItems () {
      let data = [
        {desc : '中国首家全开放共享型电商服务平台，以颠覆性反人类的利益共享体系中国首家全开放共享型电商服务平台，以颠覆性反人类的利益共享体系，开放平台'},
        {desc : '中国首家全开放共享型电商服务平台，以颠覆性反人类的利益共享体系中国首家全开放共享型电商服务平台，以颠覆性反人类的利益共享体系，开放平台'},
        {desc : '中国首家全开放共享型电商服务平台，以颠覆性反人类的利益共享体系中国首家全开放共享型电商服务平台，以颠覆性反人类的利益共享体系，开放平台'}
      ];
      // 描述指定字数后加省略号
      for (let i in data) {
        let str = data[i].desc;
        if (42 < str.length) {
          data[i].desc = str.substring(0, 42) + '......';
        }
      }
      this.items = data;
    }
  }
};