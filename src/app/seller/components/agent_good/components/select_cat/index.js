import './index.scss';
import Swiper       from 'swiper';

export default {
  name: 'unSettled',
  data () {
    return {
      /*已请求数据，后面不再请求*/
      hasGetData: false,
      /*当前自定义分类*/
      curCatCustom : -1,
      /*自定义数组*/
      customCats: [],
      /*弹窗-添加/编辑*/
      show_edit: false,
      /*添加/编辑*/
      action: 'add',
      /*当前编辑*/
      editTxt: '',
      editId: 0,
      editIndex: 0,
      /*分类列表以外的高度(rem)*/
      offHeight: 10.07
    };
  },
  computed: {
    /*分类接口*/
    api_cat_custom () {
      //return `${this.API_DOMAIN}/xxx.json`;
      return '/user/v100/Seller/getAgentCategories';
    },
    /*添加分类*/
    api_add_cat () {
      return '/user/v100/Seller/addAgentCategory';
    },
    /*编辑分类*/
    api_add_edit () {
      return '/user/v100/Seller/editAgentCategory';
    },
    /*删除分类*/
    api_add_del () {
      return '/user/v100/Seller/delAgentCategory';
    },
    show_selectCat () {
      return this.$store.get.state.SelectCat.show_selectCat;
    },
    selectedCat () {
      return this.$store.get.state.SelectCat.selectedCat;
    },
  },
  watch: {
    show_selectCat () {
      if (!this.hasGetData) {
        this.hasGetData = true;
        this.getcustomCats();
      }
    }
  },
  methods: {
    /*请求自定义分类*/
    getcustomCats () {
      let self = this;
      self.axios({
        method: 'GET',
        url: self.api_cat_custom,
        params: {
          store_id: self.$user.get().data.store_info.id
        }
      }).then((res) => {
        // console.log('自定义分类');
        // console.log(res);
        if ('success' === res.state) {
          self.customCats = res.data;
          this.newSwiper();
        }
      });
    },

    /*实例化*/
    newSwiper () {
      this.$nextTick(function () {
        // 外容器高度
        let clientHeight = document.documentElement.clientHeight;
        let remBase = parseInt(document.documentElement.style.fontSize);
        this.$refs.swiperCat.style.height = (clientHeight / remBase - this.offHeight) * remBase + 'px';
        /* eslint-disable */
        new Swiper(this.$refs.swiperCat, {
          direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: !0,
          freeMode: !0,
          observer:true,
        });
        /* eslint-disable */
      });
    },

    /*关闭弹窗*/
    close_selectCat () {
      this.$store.get.commit({
        type:'show_selectCat',
        show_selectCat : false

      });
    },

    selectCat (index) {
      this.curCatCustom = index;
    },

    /*打开弹窗-添加/编辑*/
    pop_edit (act, cat, index) {
      this.show_edit = true;
      if ('add' === act) {
        this.action = 'add';
      }
      if ('mod' === act) {
        this.action = 'mod';
        this.editTxt = cat.cat_name;
        this.editId = cat.cat_id;
        this.editIndex = index;
      }
    },

    /*关闭弹窗-添加/编辑*/
    closeEdit () {
      this.show_edit = false;
      this.editTxt = '';
      this.editId = 0;
    },

    /*添加分类*/
    addCat () {
      let self = this;
      if ('' !== self.editTxt) {
        self.axios({
          method: 'POST',
          url: self.api_add_cat,
          data: {
            cat_name: self.editTxt,
            store_id: self.$user.get().data.store_info.id
          }
        }).then((res) => {
          console.log(res);
          if ('success' === res.state) {
            let obj = {
              cat_id : res.data,
              cat_name : self.editTxt
            };
            if (0 === self.customCats.length) {
              self.customCats = [];
            }
            self.customCats.push(obj);
            self.show_edit = false;
            self.editTxt = '';
            self.editId = 0;
            self.$toast('添加成功');
            }
        });
      }
      else {
        self.$store.get.dispatch({
          type        : 'handleChangeDialog',
          customClass : 'dialog_addGood',
          active      : true,
          title       : '提示',
          msg         : '分类名称不能为空',
          lists       : [
            {
              msg: '确认',
            },
          ]
        });
      }
    },

    /*编辑分类*/
    modCat () {
      let self = this;
      let newName = self.editTxt;
      if ('' === newName) {
        self.$store.get.dispatch({
          type        : 'handleChangeDialog',
          customClass : 'dialog_addGood',
          active      : true,
          title       : '提示',
          msg         : '分类名称不能为空',
          lists       : [
            {
              msg: '确认',
            },
          ]
        });
      }
      else if (newName !== self.customCats[self.editIndex].cat_name) {
        self.axios({
          method: 'POST',
          url: self.api_add_edit,
          data: {
            cat_id: self.customCats[self.editIndex].cat_id,
            cat_name: self.editTxt
          }
        }).then((res) => {
          // console.log(res);
          if ('success' === res.state) {
            self.customCats[self.editIndex].cat_name = self.editTxt;
            self.show_edit = false;
            self.editTxt = '';
            self.editId = 0;
            self.editIndex = 0;
            self.$toast('修改成功');
          }
          else {
            self.$toast('修改失败');
          }
        });
      }
      else {
        self.$store.get.dispatch({
          type        : 'handleChangeDialog',
          customClass : 'dialog_addGood',
          active      : true,
          title       : '提示',
          msg         : '名称不能与之前的相同，请重新输入',
          lists       : [
            {
              msg: '确认',
            },
          ]
        });
      }
    },

    /*删除分类*/
    delCat (id, index) {
      let self = this;
      self.$store.get.dispatch({
        type        : 'handleChangeDialog',
        customClass : 'dialog_addGood',
        active      : true,
        title       : '提示',
        msg         : '确定删除此分类？',
        lists       : [
          {
            msg: '取消',
          },
          {
            msg: '确定',
            func () {
              self.axios({
                method: 'POST',
                url: self.api_add_del,
                data: {
                  cat_id: id
                }
              }).then((res) => {
                if ('success' === res.state) {
                  // console.log(res);
                  self.$delete(self.customCats, index);
                  self.$toast('删除成功');
                }
              });
            }
          },
        ]
      });
    },

    /*确定分类*/
    confirmCat () {
      this.$store.get.commit({ type: 'selectedCat', selectedCat: this.customCats[this.curCatCustom]});
      this.$store.get.commit({ type:'show_selectCat', show_selectCat : false});
    }

  }
};