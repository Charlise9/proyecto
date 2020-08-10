import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { isLoggedIn } from '../helpers/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '/login-patient',
    name: 'LoginPatient',
    component: () => import('../views/LoginPatient.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '/login-doctor',
    name: 'LoginDoctor',
    component: () => import('../views/LoginDoctor.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '/doctor-profile/:id',
    name: 'DoctorProfile',
    component: () => import('../views/DoctorProfile.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '/doctor-profile/:id/send-consult',
    name: 'SendConsult',
    component: () => import('../views/SendConsult.vue'),
    meta: {
      // RUTA HABILITADA SÓLO PARA USUARIOS LOGED
      allowAnon: false
    }
  },
  {
    path: '/viewdoctorprofile',
    name: 'ViewDoctorProfile',
    component: () => import('../views/ViewDoctorProfile.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/viewuserprofile',
    name: 'ViewUserProfile',
    component: () => import('../views/ViewUserProfile.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/patient-register',
    name: 'PatientRegister',
    component: () => import('../views/PatientRegister.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '/doctor-register',
    name: 'DoctorRegister',
    component: () => import('../views/DoctorRegister.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnon && !isLoggedIn()) {
    next({
      path: '/login-patient',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})


export default router
