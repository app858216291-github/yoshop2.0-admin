import api from '../api.config'
import { axios } from '@/utils/request'

/**
 * 获取超管用户信息
 */
export function info () {
  return axios({
    url: api.admin.user.detail,
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

/**
 * 更新当前管理员信息api
 * @param {*} data
 */
export function renew (data = {}) {
  return axios({
    url: api.admin.user.renew,
    method: 'post',
    data: data
  })
}
