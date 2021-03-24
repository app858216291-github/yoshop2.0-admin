import api from '../api.config'
import { axios } from '@/utils/request'

/**
 * 清理缓存api
 * @param {*} data
 */
export function clear (data) {
  return axios({
    url: api.store.setting.cache.clear,
    method: 'post',
    data: data
  })
}
