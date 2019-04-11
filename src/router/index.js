import Vue from 'vue'
import Router from 'vue-router'
import WorkHoursList from '@/pages/work-hours-list'
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
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
