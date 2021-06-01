import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: to => {
      if (!window.localStorage.getItem('token')) {
        return '/Login'
      } else {
        return '/Home'
      }

    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../pages/Login')
  },
  {
    path: '/Home',
    component: () => import( /* webpackChunkName: "Home" */ '../pages/Home'),
    children: [{
        path: '/',
        name: 'Index',
        component: () => import( /* webpackChunkName: "Home" */ '../pages/Index/Index')
      },
      {
        path: '/lineList',
        name: 'lineList',
        component: () => import( /* webpackChunkName: "Line" */ '../pages/line/list')
      },
      {
        path: '/addLine',
        name: 'addLine',
        component: () => import( /* webpackChunkName: "Line" */ '../pages/line/add')
      },
      {
        path: '/signUpList',
        name: 'signUpList',
        component: () => import( /* webpackChunkName: "signUp" */ '../pages/signUp/list')
      },
      {
        path: '/signUpSettings',
        name: 'signUpSettings',
        component: () => import( /* webpackChunkName: "signUp" */ '../pages/signUp/settings')
      },
      {
        path: '/signUpStatistics',
        name: 'signUpStatistics',
        component: () => import( /* webpackChunkName: "signUp" */ '../pages/signUp/statistics')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name != 'Login') {
    if (!window.localStorage.getItem('token')) next({
      name: 'Login'
    });
  }
  next();
})

export default router