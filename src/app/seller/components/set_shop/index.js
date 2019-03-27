import './index.scss';

import Title        from '~common/components/title';
import cropper      from '~common/components/cropper';

export default {
  name: 'unSettled',
  data () {
    return {
      shopInfo: {},
      // openNotice : false,
      // tempNotice : '',
      // modifyNotice: '',
      beforeName:'',
      modifyName:'',
    };
  },
  computed: {
    api_shop () {
      //return `${this.API_DOMAIN}/xxx.json`;
      return '/user/v100/Seller/getStoreInfo';
    },
    api_shop_modify () {
      //return `${this.API_DOMAIN}/xxx.json`;
      return '/user/v100/Seller/modifyStoreInfo';
    }
  },
  components: {
    'app-title': Title,
    cropper,
  },
  mounted () {
    this.getShopInfo();
  },
  methods: {
    /*请求店铺信息*/
    getShopInfo () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_shop,
        params: {
          user_id:self.$user.get().data.user_id
        }
      }).then((res) => {
        // console.log(res);
        if ('success' === res.state) {
          self.shopInfo = res.data;
          this.beforeName = res.data.shop_name;
          self.modifyName = res.data.shop_name;
          //self.modifyNotice = info.notice;
          //self.tempNotice = info.notice;
        }
      });
    },
    /*显示留言修改*/
    // showNotice () {
    //   this.openNotice = true;
    // },
    /*关闭留言修改*/
    // closeNotice () {
    //   this.openNotice = false;
    // },
    /*确定留言*/
    // confirmNotice () {
    //   this.modifyNotice = this.tempNotice;
    //   this.openNotice = false;
    // },
    /*确认修改*/
    confirmModify () {
      let self = this;
      if ('' !== this.modifyName) {
        self.axios({
          method: 'POST',
          url: self.api_shop_modify,
          data: {
            store_id: self.$user.get().data.store_info.id,
            shop_name: self.modifyName,
            // shop_notice: self.modifyNotice,
            shop_logo: self.$store.get.state.Cropper.images.url,
          }
        }).then((res) => {
          // console.log(res);
          if ('success' === res.state) {
              self.$toast('修改成功');
          }
        });
      }
      else {
        this.$store.get.dispatch({
          type  : 'handleChangeDialog',
          active: true,
          customClass : 'dialog_seller',
          title : '',
          msg   : '店铺名称不能为空',
          lists : [
            {
              msg: '确认',
              func () {
                self.modifyName = self.beforeName;
                self.$refs.shopName.focus();
              }
            },
          ]
        });
      }
    }
  }
};