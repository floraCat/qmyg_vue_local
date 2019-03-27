
/**
 * 异步按需加载模块
 */
const Register      = resolve => require(['./components/register'], resolve);
const Share         = resolve => require(['./components/share'], resolve);


/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 协议路由
    {
      path: '/agreement',
      component: {
        template: '<router-view></router-view>',
      },
      children: [

        // 用户注册协议
        {
          path: 'register',
          name: 'agreement.Register',
          component: Register,
          meta: {
            title: '注册协议',
          },
        },

        // 创客协议
        {
          path: 'share',
          name: 'agreement.Share',
          component: Share,
          meta: {
            title: '创客协议',
          },
        },
      ]
    },

  ]
};

export default router;