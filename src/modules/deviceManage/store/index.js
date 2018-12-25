import getters from './getter/index'
import actions from './action/index'
import mutations from './mutation/index'

let state = {
  totalNum: 0,
  onlineNum: 0,
  deviceLineData : {
    xDataList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yDataList: [10, 52, 200, 334, 390, 330, 220]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}