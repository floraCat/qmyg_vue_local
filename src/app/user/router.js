
/**
 * 异步按需加载模块
 */
const temp             = '<router-view></router-view>';
const Demo             = resolve => require(['./components/demo'], resolve);

const Home             = resolve => require(['./components/home'], resolve);
const Flow             = resolve => require(['./components/flow'], resolve);
const MsgLists         = resolve => require(['./components/msglists'], resolve);
const Express          = resolve => require(['./components/express'], resolve);
const Activity         = resolve => require(['./components/activity'], resolve);
const Notice           = resolve => require(['./components/notice'], resolve);
const Service          = resolve => require(['./components/service'], resolve);
const Income           = resolve => require(['./components/income'], resolve);
const Voucher          = resolve => require(['./components/voucher'], resolve);
const Help             = resolve => require(['./components/help'], resolve);
const ExtendCode       = resolve => require(['./components/extend_code'], resolve);
const IncomeDetail     = resolve => require(['./components/income_detail'], resolve);
const IncomeList       = resolve => require(['./components/income_list'], resolve);
const IncomeDirect     = resolve => require(['./components/income_direct'], resolve);
const IncomeShare      = resolve => require(['./components/income_share'], resolve);
const IncomeShop       = resolve => require(['./components/income_shop'], resolve);
const IncomeConsume    = resolve => require(['./components/income_consume'], resolve);
const BalanceDetail    = resolve => require(['./components/balance_detail'], resolve);
const Account          = resolve => require(['./components/account'], resolve);
const Raply            = resolve => require(['./components/account/components/raply'], resolve);
const CardList         = resolve => require(['./components/account/components/card_list'], resolve);
const AddCard          = resolve => require(['./components/account/components/add_card'], resolve);
const AccountList      = resolve => require(['./components/account/components/account_list'], resolve);
const ApplyRecord      = resolve => require(['./components/account/components/apply_record'], resolve);
const AccountDetail    = resolve => require(['./components/account/components/detail'], resolve);
const ParentList       = resolve => require(['./components/account/components/parent_list'], resolve);
const SendPoints       = resolve => require(['./components/account/components/send_points'], resolve);
const ActiveFriend       = resolve => require(['./components/account/components/active_friend'], resolve);

const Team             = resolve => require(['./components/team'], resolve);
const Order            = resolve => require(['./components/order'], resolve);
const OrderDetail      = resolve => require(['./components/order_detail'], resolve);
const Pay              = resolve => require(['./components/pay'], resolve);
const Logistic         = resolve => require(['./components/logistic'], resolve);
const Profile          = resolve => require(['./components/profile'], resolve);
const EditPassword     = resolve => require(['./components/edit_password'], resolve);
const Realname         = resolve => require(['./components/realname'], resolve);
const RealnameSuccess  = resolve => require(['./components/realnamesuccess'], resolve);
const Address          = resolve => require(['./components/address'], resolve);
const AddAddress       = resolve => require(['./components/add_address'], resolve);
const EditAddress      = resolve => require(['./components/edit_address'], resolve);
const Merchants        = resolve => require(['./components/merchants'], resolve);
const Refound          = resolve => require(['./components/refound'], resolve);
const RefoundApply     = resolve => require(['./components/refound_apply'], resolve);
const RefoundDetail    = resolve => require(['./components/refound_detail'], resolve);
const CompanyMedal     = resolve => require(['./components/company_medal'], resolve);
const VideoExplain     = resolve => require(['./components/video_explain'], resolve);
const Comment          = resolve => require(['./components/comment'], resolve);
const CommentDetail    = resolve => require(['./components/comment_detail'], resolve);
const Prompt           = resolve => require(['./components/prompt'], resolve);

const MicroShare       = resolve => require(['./components/micro_share'], resolve);

/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 重定向到首页
    {
      path: '/',
      name: 'user',
      redirect: {
        name: 'user.Home'
      }
    },

    /**
     * 路由都放在children里面
     */
    {
      path: '/user',
      component: {
        template: temp,
      },
      meta: {
        authorization: true,
      },
      children: [
        // 测试页面
        {
          path: 'demo',
          name: 'user.Demo',
          component: Demo,
          meta: {
            title: '测试页面',
          },
        },

        // 用户中心
        {
          path: '/',
          name: 'user.Home',
          component: Home,
          meta: {
            title: '用户中心',
          },
        },

        // 消息中心
        {
          path: 'msglists',
          name: 'user.Msglists',
          component: MsgLists,
          meta: {
            title: '消息中心',
          },
        },

        // 确认订单
        {
          path: 'flow',
          name: 'user.Flow',
          component: Flow,
          meta: {
            title: '确认订单',
          },
        },

        // 物流信息
        {
          path: 'express',
          name: 'user.Express',
          component: Express,
          meta: {
            title: '物流信息',
          },
        },

        // 促销活动
        {
          path: 'activity',
          name: 'user.Activity',
          component: Activity,
          meta: {
            title: '促销活动',
          },
        },

        // 商城公告
        {
          path: 'notice',
          name: 'user.Notice',
          component: Notice,
          meta: {
            title: '商城公告',
          },
        },

        // 客服咨询
        {
          path: 'service',
          name: 'user.Service',
          component: Service,
          meta: {
            title: '客服咨询',
          },
        },

        // 我的收益列表
        {
          path: 'income',
          name: 'user.Income',
          component: Income,
          meta: {
            title: '我的收益',
          },
        },

        // 支付凭证
        {
          path: 'voucher',
          name: 'user.Voucher',
          component: Voucher,
          meta: {
            title: '支付凭证',
          },
        },

        // 帮助中心
        {
          path: 'help',
          name: 'user.Help',
          component: Help,
          meta: {
            title: '帮助中心',
          },
        },

        // 订单
        {
          path: 'order',
          component: {
            template: temp,
          },
          children: [

            // 订单列表
            {
              path: '/',
              name: 'user.Order',
              component: Order,
              meta: {
                title: '订单列表',
              },
            },

            // 订单详情
            {
              path: 'detail/:id',
              name: 'user.OrderDetail',
              component: OrderDetail,
              meta: {
                title: '订单详情',
              },
            },
          ]
        },



        // 资金管理
        {
          path: 'account',
          component: {
            template: temp,
          },
          children: [
            {
              path: '/',
              name: 'user.Account',
              component: Account,
              meta: {
                title: '资金管理',
              },
            },
            {
              path: 'raply',
              name: 'user.Raply',
              component: Raply,
              meta: {
                title: '提现',
              },
            },
            {
              path: 'cardlist',
              name: 'user.CardList',
              component: CardList,
              meta: {
                title: '提现账号列表',
              },
            },
            {
              path: 'addcard',
              name: 'user.AddCard',
              component: AddCard,
              meta: {
                title: '添加卡号/账号',
              },
            },
            {
              path: 'list',
              name: 'user.AccountList',
              component: AccountList,
              meta: {
                title: '查看明细',
              },
            },
            {
              path: 'applyrecord',
              name: 'user.ApplyRecord',
              component: ApplyRecord,
              meta: {
                title: '提现申请记录',
              },
            },
            {
              path: 'detail/:id',
              name: 'user.AccountDetail',
              component: AccountDetail,
              meta: {
                title: '提现记录详情',
              },
            },

            {
              path: 'parent_list',
              name: 'user.ParentList',
              component: ParentList,
              meta: {
                title: '团队代付申请',
              },
            },

            {
              path: 'send_points',
              name: 'user.SendPoints',
              component: SendPoints,
              meta: {
                title: '易购豆互转',
              },
            },

            {
              path: 'active_friend',
              name: 'user.ActiveFriend',
              component: ActiveFriend,
              meta: {
                title: '代开通共享助力',
              },
            },
          ]

        },

        // 推广二维码
        {
          path: 'extend_code',
          name: 'user.ExtendCode',
          component: ExtendCode,
          meta: {
            title: '推广二维码',
          },
        },

        // 易购收银台
        {
          path: 'pay/:id',
          name: 'user.Pay',
          component: Pay,
          meta: {
            title: '易购收银台',
          },
        },

        // 物流跟踪
        {
          path: 'logistic',
          name: 'user.Logistic',
          component: Logistic,
          meta: {
            title: '物流跟踪'
          }
        },

        // 用户资料
        {
          path: 'profile',
          name: 'user.Profile',
          component: Profile,
          meta: {
            title: '用户资料',
          },
        },

        // 我的团队
        {
          path: 'team',
          name: 'user.Team',
          component: Team,
          meta: {
            title: '我的团队',
          },
        },

        // 我的收益
        {
          path: 'income_detail',
          name: 'user.IncomeDetail',
          component: IncomeDetail,
          meta: {
            title: '我的收益',
          },
        },

        // 收益明细
        {
          path: 'income_list',
          name: 'user.IncomeList',
          component: IncomeList,
          meta: {
            title: '收益明细',
          },
        },

        // 团队直推收益
        {
          path: 'income_direct',
          name: 'user.IncomeDirect',
          component: IncomeDirect,
          meta: {
            title: '团队直推收益',
          },
        },

        // 团队共享收益
        {
          path: 'income_share',
          name: 'user.IncomeShare',
          component: IncomeShare,
          meta: {
            title: '团队直推收益',
          },
        },

        // 店铺收益
        {
          path: 'income_shop',
          name: 'user.IncomeShop',
          component: IncomeShop,
          meta: {
            title: '团队直推收益',
          },
        },

        // 团队消费收益
        {
          path: 'income_consume',
          name: 'user.IncomeConsume',
          component: IncomeConsume,
          meta: {
            title: '团队直推收益',
          },
        },

        // 余额明细
        {
          path: 'balance_detail',
          name: 'user.BalanceDetail',
          component: BalanceDetail,
          meta: {
            title: '余额明细',
          },
        },

        // 修改密码
        {
          path: 'edit_password',
          name: 'user.EditPassword',
          component: EditPassword,
          meta: {
            title: '修改密码',
          },
        },

        // 实名认证
        {
          path: 'realname',
          name: 'user.Realname',
          component: Realname,
          meta: {
            title: '实名认证',
          },
        },

        // 实名认证成功
        {
          path: 'realnamesuccess',
          name: 'user.RealnameSuccess',
          component: RealnameSuccess,
          meta: {
            title: '实名认证成功',
          },
        },

        // 商家入驻
        {
          path: 'merchants',
          name: 'user.Merchants',
          component: Merchants,
          meta: {
            title: '商家入驻',
          },
        },

        // 收货地址
        {
          path: 'address',
          component: {
            template: temp,
          },
          children: [

            // 地址列表
            {
              path: '/',
              name: 'user.Address',
              component: Address,
              meta: {
                title: '地址列表',
              },
            },

            // 添加地址
            {
              path: 'add',
              name: 'user.AddAddress',
              component: AddAddress,
              meta: {
                title: '添加地址',
              },
            },

            // 编辑地址
            {
              path: 'edit/:id',
              name: 'user.EditAddress',
              component: EditAddress,
              meta: {
                title: '编辑地址',
              },
            },
          ],
        },

        // 退换货申请
        {
          path: 'refound_apply',
          name: 'user.RefoundApply',
          component: RefoundApply,
          meta: {
            title: '退换货申请',
          },
        },

        // 退换货列表
        {
          path: 'refound',
          name: 'user.Refound',
          component: Refound,
          meta: {
            title: '退换货列表',
          },
        },

        // 退换货详情
        {
          path: 'refound/:id',
          name: 'user.RefoundDetail',
          component: RefoundDetail,
          meta: {
            title: '退换货详情',
          },
        },

        // 公司荣誉
        {
          path: 'video_explain',
          name: 'user.VideoExplain',
          component: VideoExplain,
          meta: {
            title: '公司荣誉',
          },
        },

        // 视频讲解
        {
          path: 'company_medal',
          name: 'user.CompanyMedal',
          component: CompanyMedal,
          meta: {
            title: '视频讲解',
          },
        },

        // 待评价列表（晒图评价）
        {
          path: 'order/comment',
          name: 'user.Comment',
          component: Comment,
          meta: {
            title: '待评价列表',
          },
        },

        // 商品评论
        {
          path: 'order/comment/:id',
          name: 'user.CommentDetail',
          component: CommentDetail,
          meta: {
            title: '商品评论',
          },
        },

        // 系统提示
        {
          path: 'prompt',
          name: 'user.Prompt',
          component: Prompt,
          meta: {
            title: '系统提示',
          },
        },

        // 新人微共享
        {
          path: 'micro_share',
          name: 'user.MicroShare',
          component: MicroShare,
          meta: {
            title: '新人微共享',
          },
        },

      ]
    }

  ]
};

export default router;