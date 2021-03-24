import api from '../api.config'
import { axios } from '@/utils/request'

/**
 * 获取列表
 * @param {*} params
 */
export function list (params) {
  return axios({
    url: api.store.menu.list,
    method: 'get',
    params
  })
}

/**
 * 获取单条记录信息
 * @param {*} params
 */
export function info (params) {
  return axios({
    url: api.store.menu.info,
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
    url: api.store.menu.add,
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
    url: api.store.menu.edit,
    method: 'post',
    data: data
  })
}

/**
 * 编辑记录
 * @param {*} data
 */
export function setApis (data) {
  return axios({
    url: api.store.menu.setApis,
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
    url: api.store.menu.delete,
    method: 'post',
    data: data
  })
}
