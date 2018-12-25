const mutations = {
  setTableList (state, payload) {
    state.tableData = payload.tableData
    state.pageTotal = payload.pageTotal
  },
  setTableListByPage (state, payload) {
    state.tableData = payload.tableData
    state.pageTotal = payload.pageTotal
  }
  // setDelStatus (state, payload) {
  //   // state.resStatus = payload.resStatus
  //   let tableList = state.tableData
  //   let id = payload.params.id
  //   tableList = tableList.filter(row => row.id !== id)
  //   state.tableData = tableList
  //   state.pageTotal = tableList.length
  // }
}

export default mutations
