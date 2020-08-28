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
    path: '/viewdoctorprofile/:id',
    name: 'ViewDoctorProfile',
    component: () => import('../views/ViewDoctorProfile.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/viewuserprofile/:id',
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
    path: '/profile/consults-history/:id',
    name: 'DoctorConsultsHistory',
    component: () => import('../views/DoctorConsultsHistory.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/profile/consults-history/:id',
    name: 'PatientConsultsHistory',
    component: () => import('../views/PatientConsultsHistory.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/consults-history/answer/:id',
    name: 'ViewAnswer',
    component: () => import('../views/ViewAnswer.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/consults-history/answer/:id/vote-answer',
    name: 'VoteAnswer',
    component: () => import('../views/VoteAnswer.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  {
    path: '/viewdoctorprofile/:id/unanswered-consults/',
    name: 'UnansweredConsults',
    component: () => import('../views/UnansweredConsults.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
    }
  },
  /* AnswerConsults */
  {
    path: '/consults/:id/answer/',
    name: 'AnswerConsults',
    component: () => import('../views/AnswerConsults.vue'),
    meta: {
      // RUTA PÚBLICA
      allowAnon: false
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
