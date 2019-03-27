
/**
 * 异步按需加载模块
 */
const Share   = resolve => require(['./components/share'], resolve);
const Team    = resolve => require(['./components/team'], resolve);


/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 在线支付
    {
      path: '/pay',
      component: {
        template: '<router-view></router-view>',
      },
      meta: {
        authorization: true,
      },
      children: [

        // 共享助力
        {
          path: 'share',
          name: 'pay.Share',
          component: Share,
          meta: {
            title: '在线支付',
          },
        },

        // 团队收益
        {
          path: 'team',
          name: 'pay.Team',
          component: Team,
          meta: {
            title: '在线支付',
          },
        },
      ]
    },

  ]
};

export default router;