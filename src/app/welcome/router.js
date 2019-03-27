
/**
 * 异步按需加载模块
 */
const Login         = resolve => require(['./components/login'], resolve);
const Register      = resolve => require(['./components/register'], resolve);
const Mfindpwd      = resolve => require(['./components/mfindpwd'], resolve);
const MfindpwdOne   = resolve => require(['./components/mfindpwd/components/one'], resolve);
const MfindpwdTwo   = resolve => require(['./components/mfindpwd/components/two'], resolve);
const MfindpwdThree = resolve => require(['./components/mfindpwd/components/three'], resolve);

/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 用户登录
    {
      path: '/login',
      query: {
        dt: ''
      },
      name: 'welcome.Login',
      component: Login,
      meta: {
        title: '用户登录',
      },
    },

    {
      path: '/register',
      component: {
        template: '<router-view></router-view>',
      },
      children: [
        // 注册用户
        {
          path: '/',
          name: 'welcome.Register',
          component: Register,
          meta: {
            title: '注册用户',
          },
        },

      ]
    },

    // 找回密码
    {
      path: '/mfindpwd',
      component: Mfindpwd,
      redirect: {
        name: 'welcome.MfindpwdOne'
      },
      children: [

        // 找回密码第一步
        {
          path: 'one',
          name: 'welcome.MfindpwdOne',
          component: MfindpwdOne,
          meta: {
            title: '找回密码',
          },
        },

        // 找回密码第二步
        {
          path: 'two',
          name: 'welcome.MfindpwdTwo',
          component: MfindpwdTwo,
          meta: {
            title: '获取短信验证码',
          },
        },

        // 找回密码第三步
        {
          path: 'three',
          name: 'welcome.MfindpwdThree',
          component: MfindpwdThree,
          meta: {
            title: '输入新密码',
          },
        },
      ]
    },
  ]
};

export default router;