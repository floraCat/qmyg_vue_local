
/**
 * 异步按需加载模块
 */
const Home    = resolve => require(['./components/home'], resolve);
const Search  = resolve => require(['./components/search'], resolve);
const Class   = resolve => require(['./components/class'], resolve);
const List    = resolve => require(['./components/list'], resolve);
const Cart    = resolve => require(['./components/cart'], resolve);
const Details = resolve => require(['./components/details'], resolve);
const Info    = resolve => require(['./components/details/pages/info'], resolve);
const Content = resolve => require(['./components/details/pages/content'], resolve);
const Comment = resolve => require(['./components/details/pages/comment'], resolve);
const Supplychain = resolve => require(['./components/supply_chain'], resolve);
// const City    = resolve => require(['./components/city'], resolve);

/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [
    // 首页
    {
      path: '/',
      name: 'home.Home',
      component: Home,
      meta: {
        title: '全民易购首页',
      }
    },

    // 搜索页
    {
      path: '/search',
      name: 'home.Search',
      component: Search,
      meta: {
        title: '搜索页'
      }
    },

    // 分类页
    {
      path: '/class',
      name: 'home.Class',
      component: Class,
      meta: {
        title: '分类页'
      }
    },

    // 列表页
    {
      path: '/list',
      name: 'home.List',
      component: List,
      meta: {
        title: '列表页'
      }
    },

    // 购物车
    {
      path: '/cart',
      name: 'home.Cart',
      component: Cart,
      meta: {
        title: '购物车'
      }
    },

    //详情页
    {
      path: '/details/:id',
      component: Details,
      children:[
        {
          path: '',
          name: 'home.Info',
          component:Info
        },
        {
          path: 'content',
          name: 'home.Content',
          component:Content
        },
        {
          path: 'comment',
          name: 'home.Comment',
          component:Comment
        }
      ]
    },

    // 城市选择页
    // {
    //   path: '/city',
    //   name: 'home.City',
    //   component: City,
    //   meta: {
    //     title: '城市选择'
    //   }
    // },

    // 超级供应链
    {
      path: '/supply_chain',
      name: 'home.Supplychain',
      component: Supplychain,
      meta: {
        title: '超级供应链'
      }
    },
  ]
};

export default router;