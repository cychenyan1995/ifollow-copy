import { tableList } from '../mock/data/tableList'
import { numInfo, deviceLineData } from '../mock/data/deviceData'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// 私有变量
const _tableList = tableList
const _numInfo = numInfo
const _deviceLineData = deviceLineData

export default {
  mockData () {
    let mock = new MockAdapter(axios)
    console.log('mock:' + mock)
    mock.onGet('/remindMessage/getTableList').reply(config => {
      let tableList = _tableList
      console.log(tableList)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tableData: tableList
          }])
        }, 1000)
      })
    })
    mock.onGet('/remindMessage/getTableListByPage').reply(config => {
      // 页码信息
      console.log(config.params)
      let {currPage, pageSize, deviceNo} = config.params
      // 查询
      let mockTableList = _tableList
      if (deviceNo !== '') {
        mockTableList = _tableList.filter(tableInfo => tableInfo.deviceNo.indexOf(deviceNo) !== -1)
      }
      // 条数
      const pageTotal = mockTableList.length
      let tableList = mockTableList.filter((tableInfo, index) => {
        return index >= pageSize * (currPage - 1) && index < pageSize * currPage
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tableData: tableList,
            pageTotal: pageTotal
          }])
        })
      })
    })
    mock.onGet('/remindMessage/deleteRow').reply(config => {
      let mockTableList = _tableList
      let { currPage, pageSize, id } = config.params
      // 删除
      mockTableList = mockTableList.filter(tableInfo => tableInfo.id !== id)
      const pageTotal = mockTableList.length
      // 分页展示
      let tableList = mockTableList.filter((tableInfo, index) => {
        return index >= pageSize * (currPage - 1) && index < pageSize * currPage
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tableData: tableList,
            pageTotal: pageTotal
          }])
        }, 1000)
      })
    })
    mock.onPost('/remindMessage/editRow').reply(config => {
      let mockTableList = _tableList
      let { currPage, pageSize, currIndex, record } = JSON.parse(config.data)
      mockTableList.splice(currIndex, 1, record) // splice函数返回的是被删除的集合
      const pageTotal = mockTableList.length
      let tableList = mockTableList.filter((tableInfo, index) => {
        return index >= pageSize * (currPage - 1) && index < pageSize * currPage
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            tableData: tableList,
            pageTotal: pageTotal
          }])
        }, 1000)
      })
    })

    // 设备管理
    mock.onGet('/deviceManage/getOnlineNum').reply(config => {
      const numInfo = _numInfo
      const deviceLineData = _deviceLineData
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve([200, {
            totalNum: numInfo.totalNum,
            onlineNum: numInfo.onlineNum,
            deviceLineData: deviceLineData
          }])
        })
      })
    })

  }
}
