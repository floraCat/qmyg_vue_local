
/**
 * 异步按需加载模块
 */
const Home        = resolve => require(['./components/home'], resolve);
const CountVisit  = resolve => require(['./components/count_visit'], resolve);
const CountOrder  = resolve => require(['./components/count_order'], resolve);
const CountSale   = resolve => require(['./components/count_sale'], resolve);
const MyShop      = resolve => require(['./components/my_shop'], resolve);
const InSale      = resolve => require(['./components/my_good/pages/in_sale'], resolve);
const InSaleCat   = resolve => require(['./components/my_good/pages/in_sale_cat'], resolve);
const AddGood     = resolve => require(['./components/my_good/pages/add_good'], resolve);
const AddGoodCat  = resolve => require(['./components/my_good/pages/add_good_cat'], resolve);
const AgentGood   = resolve => require(['./components/agent_good'], resolve);
const RecomGood   = resolve => require(['./components/agent_good/pages/recom_good'], resolve);
const SelectGood  = resolve => require(['./components/agent_good/pages/select_good'], resolve);
const SetShop     = resolve => require(['./components/set_shop'], resolve);
const Order       = resolve => require(['./components/order'], resolve);
const Profit      = resolve => require(['./components/profit'], resolve);
const Settled     = resolve => require(['./components/settled'], resolve);
const Unsettled   = resolve => require(['./components/unsettled'], resolve);
const Account     = resolve => require(['./components/account'], resolve);
const ShopList     = resolve => require(['./components/shop_list'], resolve);
const ShopIndex     = resolve => require(['./components/shop_index'], resolve);


/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

   routes: [

    // 重定向到首页
    {
      path: '/',
      name: 'seller',
      redirect: {
        name: 'seller.Home'
      }
    },

    /**
     * 路由都放在children里面
     */
    {
      path: '/seller',
      component: {
        template: '<router-view></router-view>',
      },
      meta: {
        authorization: true,
      },
      children: [

        // 卖家中心首页
        {
          path: '/',
          name: 'seller.Home',
          component: Home,
          meta: {
            title: '卖家中心',
          },
        },

        // 今日访客
        {
          path: 'count_visit',
          name: 'seller.CountVisit',
          component: CountVisit,
          meta: {
            title: '今日访客',
          },
        },

        // 七日订单
        {
          path: 'count_order',
          name: 'seller.CountOrder',
          component: CountOrder,
          meta: {
            title: '七日订单',
          },
        },

        // 七日销售
        {
          path: 'count_sale',
          name: 'seller.CountSale',
          component: CountSale,
          meta: {
            title: '七日销售',
          },
        },

        // 我的店铺
        {
          path: 'my_shop',
          name: 'seller.MyShop',
          component: MyShop,
          meta: {
            title: '我的店铺',
          },
        },

        // 我的商品
        {
          path: 'my_good',
          component: {
            template: '<router-view></router-view>',
          },
          children:[

            // 出售中
            {
              path: 'in_sale',
              name: 'seller.InSale',
              component: InSale,
              meta: {
                title: '出售中',
              },
            },

            // 分类-出售中
            {
              path: 'in_sale_cat',
              name: 'seller.InSaleCat',
              component: InSaleCat,
              meta: {
                title: '出售中分类',
              },
            },

            // 选择新产品
            {
              path: 'add_good',
              name: 'seller.AddGood',
              component: AddGood,
              meta: {
                title: '选择新产品',
              },
            },

            // 分类-选择新产品
            {
              path: 'add_good_cat',
              name: 'seller.AddGoodCat',
              component: AddGoodCat,
              meta: {
                title: '选择新产品分类',
              },
            },

          ],
        },

        // 代理商品
        {
          path: 'agent_good',
          component: AgentGood,
          children:[

            // 超级精选
            {
              path: '/',
              name: 'seller.RecomGood',
              component: RecomGood,
              meta: {
                title: '超级精选',
              },
            },

            // 市场选货
            {
              path: 'select_good/:id',
              name: 'seller.SelectGood',
              component: SelectGood,
              meta: {
                title: '市场选货',
              },
            },

          ]
        },

        // 店铺设置
        {
          path: 'set_shop',
          name: 'seller.SetShop',
          component: SetShop,
          meta: {
            title: '店铺设置',
          },
        },

        // 我的订单
        {
          path: 'order',
          name: 'seller.Order',
          component: Order,
          meta: {
            title: '我的订单',
          },
        },

        // 收益明细
        {
          path: 'profit',
          component: {
            template: '<router-view></router-view>',
          },
          children:[

            // 我的奖励
            {
              path: '/',
              name: 'seller.Profit',
              component: Profit,
              meta: {
                title: '收益明细',
              },
            },

            // 已结算收入
            {
              path: 'settled',
              name: 'seller.Settled',
              component: Settled,
              meta: {
                title: '收益明细',
              },
            },

            // 未结算收入
            {
              path: 'unsettled',
              name: 'seller.Unsettled',
              component: Unsettled,
              meta: {
                title: '收益明细',
              },
            },

            // 到账明细
            {
              path: 'account',
              name: 'seller.Account',
              component: Account,
              meta: {
                title: '收益明细',
              },
            },
          ]
        },

        // 店铺的搜索列表
        {
          path: 'shop_list',
          name: 'seller.ShopList',
          component: ShopList,
          meta: {
            title: '店铺的搜索列表',
          },
        },

        // 商家店铺首页
        {
          path: 'shop_index',
          name: 'seller.ShopIndex',
          component: ShopIndex,
          meta: {
            title: '商家店铺首页',
          },
        },

      ]
    }
  ]
};

export default router;