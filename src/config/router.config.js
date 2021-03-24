// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import * as Icon from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '超级管理后台' },
    redirect: '/store/index',
    children: [
      {
        name: 'Store',
        path: 'store',
        redirect: '/store/index',
        component: PageView,
        meta: { title: '商城管理', keepAlive: true, icon: Icon['shop'], permission: ['store'] },
        children: [
          {
            path: 'index',
            component: () => import(/* webpackChunkName: "store" */ '@/views/store/index'),
            meta: { title: '商城列表', keepAlive: true, hiddenHeaderContent: false, permission: ['store'] }
          },
          {
            path: '/store/recycle',
            component: () => import(/* webpackChunkName: "store" */ '@/views/store/recycle'),
            meta: { title: '回收站', keepAlive: true, permission: ['store'] }
          }
        ]
      },

      {
        name: 'Menu',
        path: 'menu',
        redirect: '/menu/index',
        component: PageView,
        meta: { title: '菜单管理', keepAlive: true, icon: Icon['menu'], permission: ['access'] },
        children: [
          {
            path: '/menu/index',
            component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/index'),
            meta: { title: '菜单列表', keepAlive: true, permission: ['access'] }
          },
          {
            path: '/menu/access/index',
            component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/access/index'),
            meta: { title: 'API权限', keepAlive: true, permission: ['access'] }
          }
        ]
      },

      {
        name: 'Setting',
        path: 'setting',
        redirect: '/setting/cache/clear',
        component: PageView,
        meta: { title: '系统设置', keepAlive: false, icon: Icon['setting'], permission: ['setting'] },
        children: [
          {
            path: '/setting/cache',
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/cache'),
            meta: { title: '清理缓存', keepAlive: false, permission: ['setting'] }
          },
          {
            path: '/setting/science',
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/science'),
            meta: { title: '环境检测', keepAlive: false, permission: ['setting'] }
          }
        ]
      },

      {
        name: 'Manage',
        path: '/manage',
        redirect: '/manage/renew',
        component: PageView,
        hidden: true,
        meta: { title: '管理员设置', keepAlive: false, permission: ['manage'] },
        children: [
          {
            // name: 'Renew',
            path: 'renew',
            component: () => import(/* webpackChunkName: "user" */ '@/views/manage/renew')
          }
        ]
      }

    ]
  },

  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        // name: 'Login',
        path: 'login',
        meta: { title: '超级管理后台' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
