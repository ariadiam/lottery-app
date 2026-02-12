import type { RouterHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import DrawView from '@/views/DrawView.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useBetStore } from '@/stores/bet.store'

export function createAppRouter(options: { history?: RouterHistory } = {}) {
  const router = createRouter({
    history: options.history || createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        redirect: '/login',
      },
      {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { guestOnly: true },
      },
      {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { guestOnly: true },
      },
      {
        path: '/home',
        name: 'Home',
        component: HomeView,
        meta: { requiresAuth: true },
      },
      {
        path: '/draw',
        name: 'Draw',
        component: DrawView,
        meta: {
          requiresAuth: true,
          requiresBet: true,
        },
      },
    ],
  })

  router.beforeEach((to, from) => {
    const authStore = useAuthStore()
    const betStore = useBetStore()

    if (from.name === 'Draw' && betStore.drawInProgress && to.name !== 'Draw') {
      return false
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return '/login'
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
      return '/home'
    }

    if (to.meta.requiresBet && !betStore.hasBet) {
      return '/home'
    }
  })

  return router
}

const router = createAppRouter()

export default router
