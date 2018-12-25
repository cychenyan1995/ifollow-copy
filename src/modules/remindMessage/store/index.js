import getters from './getter/index'
import actions from './action/index'
import mutations from './mutation/index'

var state = {
  tableData: [],
  pageTotal: 0,
  resStatus: 0
}

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
  state
}
