import constants from '../../config/constants'
import http from '../http'

export function queryTableList (params) {
  return http.get(`${constants.httpApi}/remindMessage/getTableList`, params)
}

export function queryTableListByPage (params) {
  return http.get(`${constants.httpApi}/remindMessage/getTableListByPage`, params)
}

export function deleteRow (params) {
  return http.get(`${constants.httpApi}/remindMessage/deleteRow`, params)
}

export function editRow (params) {
  return http.post(`${constants.httpApi}/remindMessage/editRow`, params)
}
