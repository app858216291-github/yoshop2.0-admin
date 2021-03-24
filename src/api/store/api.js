import api from '../api.config'
import { axios } from '@/utils/request'

/**
 * 获取列表
 * @param {*} params
 */
export function list (params) {
  return axios({
    url: api.store.api.list,
    method: 'get',
    params
  })
}

/**
 * 新增记录
 * @param {*} data
 */
export function add (data) {
  return axios({
    url: api.store.api.add,
    method: 'post',
    data: data
  })
}

/**
 * 编辑记录
 * @param {*} data
 */
export function edit (data) {
  return axios({
    url: api.store.api.edit,
    method: 'post',
    data: data
  })
}

/**
 * 删除记录
 * @param {*} data
 */
export function deleted (data) {
  return axios({
    url: api.store.api.delete,
    method: 'post',
    data: data
  })
}
