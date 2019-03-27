
/**
 * 异步按需加载模块
 */
const Home   = resolve => require(['./components/home'], resolve);

/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 首页
    {
      path: '/im',
      name: 'im.Home',
      component: Home,
      meta: {
        title: '在线聊天',
      },
    },

  ]
};

export default router;