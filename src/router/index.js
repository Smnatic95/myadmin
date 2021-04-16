import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: to => {
      return '/Home';
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../pages/Login')
  },
  {
    path: '/Home',
    component: () => import(/* webpackChunkName: "Home" */ '../pages/Home'),
    children:[
      {
        path: '/',
        component: () => import(/* webpackChunkName: "Home" */ '../pages/Index/Index')
      },
      {
        path: '/lineList',
        component: () => import(/* webpackChunkName: "Line" */ '../pages/line/list') 
      },
      {
        path: '/addLine',
        component: () => import(/* webpackChunkName: "Line" */ '../pages/line/add') 
      },
      {
        path: '/signUpList',
        component: () => import(/* webpackChunkName: "signUp" */ '../pages/signUp/list') 
      },
      {
        path: '/signUpSettings',
        component: () => import(/* webpackChunkName: "signUp" */ '../pages/signUp/settings') 
      },
      {
        path: '/signUpStatistics',
        component: () => import(/* webpackChunkName: "signUp" */ '../pages/signUp/statistics') 
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
