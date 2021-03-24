import api from './api.config'
import { axios } from '@/utils/request'

/**
 * 获取列表
 * @param {*} params
 */
export function list (params) {
  return axios({
    url: api.store.list,
    method: 'get',
    params
  })
}

/**
 * 回收站列表
 * @param {*} params
 */
export function recycle (params) {
  return axios({
    url: api.store.recycle,
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
    url: api.store.add,
    method: 'post',
    data: data
  })
}

/**
 * 移入回收站
 * @param {*} data
 */
export function recovery (data) {
  return axios({
    url: api.store.recovery,
    method: 'post',
    data: data
  })
}

/**
 * 移出回收站
 * @param {*} data
 */
export function move (data) {
  return axios({
    url: api.store.move,
    method: 'post',
    data: data
  })
}
