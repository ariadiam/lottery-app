import { createAppRouter } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Router } from 'vue-router'
import { createMemoryHistory } from 'vue-router'
import App from '../App.vue'

describe('App', () => {
  let router: Router
  let wrapper: VueWrapper<InstanceType<typeof App>> | undefined

  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
  })

  const setupRouter = async ({ isAuthenticated = true } = {}) => {
    setActivePinia(createPinia())

    // Spy on auth store getters and methods
    const authStore = useAuthStore()
    vi.spyOn(authStore, 'isAuthenticated', 'get').mockReturnValue(isAuthenticated)

    // Use the real router with memory history for tests
    router = createAppRouter({ history: createMemoryHistory() })

    await router.push('/')
    await router.isReady()
  }

  const mountComponent = () => {
    return mount(App, {
      global: {
        plugins: [router],
        stubs: {
          // Only stub router-view - naive-ui components are globally stubbed
          'router-view': { template: '<div>RouterView</div>' },
        },
      },
    })
  }

  it('mounts properly', async () => {
    await setupRouter()
    wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('shows header when not on login or register pages', async () => {
    await setupRouter({ isAuthenticated: true })
    await router.push('/home')
    wrapper = mountComponent()

    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true)
  })

  it('hides header on login page', async () => {
    // User not authenticated - they can visit login page
    await setupRouter({ isAuthenticated: false })
    await router.push('/login')
    await router.isReady()
    wrapper = mountComponent()

    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(false)
  })

  it('hides header on register page', async () => {
    // User not authenticated - they can visit register page
    await setupRouter({ isAuthenticated: false })
    await router.push('/register')
    await router.isReady()
    wrapper = mountComponent()

    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(false)
  })
})
