import constants from '../../config/constants'
import http from '../http'

export function queryOnlineNum (params) {
  return http.get(`${constants.httpApi}/deviceManage/getOnlineNum`, params)
}