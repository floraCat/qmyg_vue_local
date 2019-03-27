import './index.scss';

import Swiper       from 'swiper';
import LocalStorage from '~common/services/localStorage.cookie';

import SwiperPage   from '~common/components/swiper';
import Footer       from '~common/components/footer';
import NavBack      from '~common/components/nav_back';
import Dropdown     from '~common/components/dropdown';

export default {
  name: 'search',
  data () {
    return {
      swiperOption: {
        scrollbar: false,
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
      },
      menus: [
        {
          id: 1,
          name: '店铺'
        },
        {
          id: 2,
          name: '商品'
        },
      ],
      keyword : '',
      /*热门搜索*/
      itemsHot : [],
      /*最新搜索*/
      itemsHistory : [{keyword:'aaa'}]
    };
  },
  computed: {
    api_hot_serach () {
      return `${window.API_DOMAIN}/api/search/hot.json`;
    }
  },
  mounted () {
    // localStorage.clear();
    this.hotSearch();
    this.historySearch();
    this.$nextTick(() => {
      /* eslint-disable */
      new Swiper(document.querySelectorAll('.swiper-scroll'), this.swiperOption);
      /* eslint-enable */
    });

    this.$store.get.dispatch({
      type: 'toggle',
      item: { id: 2, name: '商品' }
    });
  },
  components: {
    'app-swiper': SwiperPage,
    'app-footer': Footer,
    'app-nav-back': NavBack,
    Dropdown,
  },
  methods: {
    // 热门搜索
    hotSearch () {
      let self = this;
      self.axios({
        method: 'GET',
        url : self.api_hot_serach,
        // params : {
        //   user_id : self.$user.get().data.user_id
        // }
      }).then((res) => {
        self.itemsHot = res.data;
      });
    },
    // 最近搜索
    historySearch () {
      let storage = LocalStorage.get('search_history').data;
      if (storage) {
        let arr = storage.split('|');
        for (let i in arr) {
          arr[i] = JSON.parse(arr[i]);
        }
        this.itemsHistory = arr;
      }
    },
    // 搜索提交
    submitSearch () {
      if (this.keyword) {
        let curMenu = this.$refs.searchMenu.curSelect.id;
        let obj = {
          menu    : curMenu,
          keyword : this.keyword
        };
        let storage = LocalStorage.get('search_history').data;
        if (storage) {
          let arr = storage.split('|');
          for (let i in arr) {
            if (arr[i] === JSON.stringify(obj)) {
              arr.splice(i, 1);
            }
          }
          arr.unshift(JSON.stringify(obj));
          LocalStorage.set('search_history', arr.join('|'));
        }
        else {
          LocalStorage.set('search_history', JSON.stringify(obj));
        }
        if (1 === curMenu) {
          this.$router.push({name : 'seller.ShopList', query : {search : obj.keyword}});
        }
        if (2 === curMenu) {
          this.$router.push({name : 'home.List', query : {search : this.keyword}});
        }
      }
      else {
        this.$toast('搜索关键字不能为空');
      }
    },

    // 点击关键字搜索
    handleSearch (obj) {
      if (1 === obj.menu) {
        this.$router.push({name : 'seller.ShopList', query : {search : obj.keyword}});
      }
      if (2 === obj.menu) {
        this.$router.push({name : 'home.List', query : {search : obj.keyword}});
      }
    },

    // 清空搜索记录
    clearHistory () {
      if (!this.itemsHistory.length) {
        this.$toast('暂无搜索记录');
        return false;
      }
      let self = this;
      this.$store.get.dispatch({
        type  : 'handleChangeDialog',
        active: true,
        customClass : 'dialog_search',
        title : '',
        msg   : '确定要清空所有的搜索记录吗？',
        lists : [
          {
            msg: '取消',
          },
          {
            msg: '确认',
            func () {
              localStorage.removeItem('search_history');
              self.itemsHistory = [];
            }
          },
        ]
      });
    }
  }
};