import Vue from 'vue'
import Router from 'vue-router'
import WorkHoursList from '@/pages/work-hours-list'
import workHoursListDetail from '@/pages/work-hours-list/workHoursListDetail'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'work-hours-list',
      component: WorkHoursList
    },
    {
      path: '/workHoursListDetail',
      name: 'WorkHoursListDetail',
      component: workHoursListDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
