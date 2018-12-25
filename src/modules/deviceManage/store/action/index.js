import { queryOnlineNum } from '../../../../api/deviceManage/index'
const actions = {
  fetchOnlineNum ({ dispatch }, payload) {
    queryOnlineNum(payload.params).then((res) => {
      dispatch('setOnlineNum', {totalNum: res.data.totalNum, onlineNum: res.data.onlineNum, deviceLineData: res.data.deviceLineData})
    })
  },
  setOnlineNum({ commit }, payload){
    commit('setOnlineNum',payload)
  }
}

export default actions
