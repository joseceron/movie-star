import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import HomeView from '../views/HomeView.vue'

import TheContainer from '../containers/TheContainer.vue'
import { MovieShowcaseIndex } from '../views/MovieShowCaseIndex/index'

import { UserAuth } from '../pages/auth/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'dashboard',
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          component: MovieShowcaseIndex,
          meta: {
            requiresAuth: true
          },  
        },
      ]
    },
    {
      path: '/pages',
      name: 'pages',
      meta: {
        label: 'General',
        requiresAuth: false
      },
      component: TheContainer,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: UserAuth,
          meta: {
            requiresUnauth: true
          }
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta!.requiresAuth && !store.getters.isAuthenticated) {
    next({path: '/pages/login', replace: true})
  } else if (to.meta!.requiresUnauth && store.getters.isAuthenticated) {
    next({path: '/', replace: true})
  } else {
    next()
  }
})

export default router
