export default {

  // 用户认证
  passport: {
    login: '/passport/login'
    // logout: '/passport/logout'
  },

  // 超管模块
  admin: {
    user: {
      detail: '/admin.user/detail',
      renew: 'admin.user/renew'
    }
  },

  // 商家模块
  store: {
    list: 'store/index',
    superLogin: 'store/superLogin',
    recycle: 'store/recycle',
    add: 'store/add',
    recovery: 'store/recovery',
    delete: 'store/delete',
    move: 'store/move',

    // 商家后台api权限
    api: {
      list: 'store.api/index',
      add: 'store.api/add',
      edit: 'store.api/edit',
      delete: 'store.api/delete'
    },

    // 商家后台菜单
    menu: {
      list: 'store.menu/index',
      info: 'store.menu/info',
      add: 'store.menu/add',
      edit: 'store.menu/edit',
      delete: 'store.menu/delete',
      setApis: 'store.menu/setApis',

      // 商家后台菜单操作权限
      action: {
        list: 'store.menu.action/index',
        add: 'store.menu.action/add',
        edit: 'store.menu.action/edit',
        delete: 'store.menu.action/delete'
      }
    },

    // 系统设置
    setting: {
      cache: {
        clear: 'setting.cache/clear'
      },
      science: 'setting.science/info'
    }
  }

}
