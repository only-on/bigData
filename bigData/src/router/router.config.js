// 路由配置
const router = [
  {
    path: '/home',
    component: resolve => require(['../pages/home.vue'], resolve),
    children: [
      {
        path: '/map_index',
        name: 'map_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/map/index.vue'], resolve)
      },
      {
        path: '/user_index',
        name: 'user_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/user.vue'], resolve)
      },
      {
        path: '/user_list',
        name: 'user_list',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/userList.vue'], resolve)
      },
      {
        path: '/user_detail',
        name: 'user_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/userDetail.vue'], resolve)
      },
      {
        path: '/trade_personal_detail',
        name: 'trade_personal_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/tradepersonal.vue'], resolve)
      },
      {
        path: '/trade_detail',
        name: 'trade_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/trade.vue'], resolve)
      },
      {
        path: '/manager_detail',
        name: 'manager_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/manager.vue'], resolve)
      },
      {
        path: '/expert_index',
        name: 'expert_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/expert/index.vue'], resolve)
      },
      {
        path: '/expert_list',
        name: 'expert_list',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/expert/expertList.vue'], resolve)
      },
      {
        path: '/mall_index',
        name: 'mall_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/mall/mall.vue'], resolve)
      },
      {
        path: '/monitor_index',
        name: 'monitor_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/monitor/overview.vue'], resolve)
      },
      {
        path: '/plot_data',
        name: 'plot_data',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/monitor/plotData.vue'], resolve)
      },
      {
        path: '/decision_index',
        name: 'decision_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/decision/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: resolve => require(['../view/index/monitor.vue'], resolve)
  },
  {
    path: '*',
    name: 'Page404',
    component: resolve => require(['../pages/404.vue'], resolve)
  },
  {
    path: '/',
    name: 'login',
    component: resolve => require(['../pages/login.vue'], resolve)
  }
]

export default router
