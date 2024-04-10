import { createRouter, createWebHistory } from 'vue-router'

import HomeDoctor from '@/modules/doctor/views/HomeDoctor.vue'
import HomeReception from '@/modules/reception/views/HomeReception.vue'
import Login from '@/modules/shared/views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'HomeDoctor',
      path: '/doctor',
      component: HomeDoctor,
      // beforeEnter: (to, from) => {
      //   if (!localStorage.getItem('jwt-token')) {
      //     return '/login'
      //   }
      //}
    },
    {
      name: 'Home',
      path: '/reception',
      component: HomeReception,
      // beforeEnter: (to, from) => {
      //   if (!localStorage.getItem('jwt-token')) {
      //     return '/login'
      //   }
      //}
    },
    {
      name: 'Login',
      path: '/',
      component: Login,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('jwt-token')) {
          return '/'
        }
      }
    }
    
  ]
})



export default router
