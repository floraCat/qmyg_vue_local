
/**
 * 异步按需加载模块
 */
const Recruit = resolve => require(['./components/recruit'], resolve);


/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 专题活动路由
    {
      path: '/activity',
      component: {
        template: '<router-view></router-view>',
      },
      meta: {
        authorization: true,
      },
      children: [

        // 深圳全民易购火热招商
        {
          path: 'recruit',
          name: 'activity.Recruit',
          component: Recruit,
          meta: {
            title: '深圳全民易购火热招商',
          },
        },
      ]
    },

  ]
};

export default router;