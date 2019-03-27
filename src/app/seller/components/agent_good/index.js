import './index.scss';

import Swiper from 'swiper';

export default {
  name: 'unSettled',
  data () {
    return {
      /*分类数组*/
      itemCats : [],
    };
  },
  computed: {
    /*分类接口*/
    api_cat () {
      //return `${this.API_DOMAIN}/xxx.json`;
      return '/user/v100/Seller/getTopCategories';
    },
    agentTitle () {
      return this.$store.get.state.AgentGood.agentTitle;
    },
    curCat () {
      return this.$store.get.state.AgentGood.curCat;
    },
  },
  mounted () {
    // console.log(sessionStorage);
    // console.log(this.$user.get('user_id').data);
    this.getCats();
  },
  methods: {

    /*请求分类*/
    getCats () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_cat,
        parame: {}
      }).then((res) => {
        if ('success' === res.state) {
          self.itemCats = res.data;
          self.$nextTick(function () {
            /* eslint-disable */
            new Swiper(this.$refs.swiperCats, {
              slidesPerView: 4.5,
              resistanceRatio: 0
            });
            /* eslint-disable */
          });
        };
      });
    },

    /*返回*/
    agentBack () {
      if ('seller.SelectGood' === this.$route.name) {
        this.$router.replace({name: 'seller.RecomGood'});
      }
      else {
        this.$router.go(-1);
      }
    }

  }
};