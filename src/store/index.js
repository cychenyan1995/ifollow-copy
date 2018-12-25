import Vue from 'vue'
import Vuex from 'vuex'
import remindMessage from '../modules/remindMessage/store'
import deviceManage from '../modules/deviceManage/store'

Vue.use(Vuex)
const debug = false
export default new Vuex.Store({
  modules: {
    remindMessage,
    deviceManage
  },
  strict: debug
})
