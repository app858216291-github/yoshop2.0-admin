import { login } from '@/api/login'
import { info as getInfo } from '@/api/admin/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import Vue from 'vue'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    // roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {

    // 用户登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          // 记录token, 保存7天
          Vue.ls.set(ACCESS_TOKEN, data.token, 7 * (60 * 60 * 24) * 1000)
          // 设置登录状态
          commit('SET_TOKEN', data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_INFO', data['userInfo'])
          commit('SET_NAME', { name: data['userInfo']['user_name'], welcome: welcome() })
          // commit('SET_ROLES', data.roles)
          // commit('SET_AVATAR', data.avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      })
      // return new Promise((resolve) => {
      //   logout(state.token).then(() => {
      //     resolve()
      //   }).catch(() => {
      //     resolve()
      //   }).finally(() => {
      //     commit('SET_TOKEN', '')
      //     // commit('SET_ROLES', [])
      //     Vue.ls.remove(ACCESS_TOKEN)
      //   })
      // })
    }

  }
}

export default user
