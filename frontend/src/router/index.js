import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login-patient',
    name: 'LoginPatient',
    component: () => import('../views/LoginPatient.vue')
  },
  {
    path: '/login-doctor',
    name: 'LoginDoctor',
    component: () => import('../views/LoginDoctor.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
