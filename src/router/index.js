import Vue from 'vue'
import Router from 'vue-router'
import remindMessage from '../modules/remindMessage/page/remindMeaage'
import deviceManage from '../modules/deviceManage/page/deviceManage'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/remindMessage',
    //   component: remindMessage,
    //   children: [
    //     {path: '/remindMessage', component: remindMessage, name: '提醒消息', class: 'el-icon-message'},
    //     {path: '/deviceManage', component: deviceManage, name: '设备管理', class: 'el-icon-menu'}
    //   ]
    // },
    {
      path: '/remindMessage',
      component: remindMessage,
      name: 'remind',
      class: 'el-icon-menu'
    },
    {
      path: '/deviceManage',
      component: deviceManage,
      name: 'device',
      class: 'el-icon-message'
    }
  ]
})
