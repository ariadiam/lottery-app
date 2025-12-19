import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import DrawView from '@/views/DrawView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/register',
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/draw',
      name: 'Draw',
      component: DrawView,
    },
  ],
})

export default router
