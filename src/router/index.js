import Vue from 'vue'
import Router from 'vue-router'
import WorkHoursList from '@/pages/work-hours-list'
import workHoursListDetail from '@/pages/work-hours-list/workHoursListDetail'
import WorkHoursConfirm from '@/pages/work-hours-confirm'
import upcomingList from '@/pages/upcoming/list'
import upcomingDetail from '@/pages/upcoming/detail'
import upcomingOther from '@/pages/upcoming/other'
import Login from '@/pages/login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
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
      path: '/work-hours-confirm',
      name: 'work-hours-confirm',
      component: WorkHoursConfirm
    },
    {
      path: '/upcoming/list',
      name: 'UpcomingList',
      component: upcomingList
    },
    {
      path: '/upcoming/detail',
      name: 'UpcomingDetail',
      component: upcomingDetail
    },
    {
      path: '/upcoming/other',
      name: 'UpcomingOther',
      component: upcomingOther
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = localStorage && localStorage.getItem('user')
  if (JSON.parse(user)) {
    if (to.name === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') {
      if (user) {
        next({
          path: '/'
        })
      } else {
        next()
      }
    } else {
      next({
        path: '/login'
      })
    }
  }
})

export default router
