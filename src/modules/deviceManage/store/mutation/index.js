const mutations = {
  setOnlineNum (state, payload) {
    state.totalNum = payload.totalNum
    state.onlineNum = payload.onlineNum
    state.deviceLineData = payload.deviceLineData
  }
}

export default mutations
