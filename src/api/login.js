import api from './api.config'
import { axios } from '@/utils/request'

/**
 * 超管用户登录
 * @param {*} parameter
 */
export function login (parameter) {
  return axios({
    url: api.passport.login,
    method: 'post',
    data: parameter
  })
}

/**
 * 超管用户退出登录
 */
// export function logout () {
//   return axios({
//     url: api.passport.logout,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8'
//     }
//   })
// }
