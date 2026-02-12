import { createAppRouter } from '@/router'
import { useAuthStore } from '@/stores/auth.store'
import { useBetStore } from '@/stores/bet.store'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import type { Router } from 'vue-router'
import { createMemoryHistory } from 'vue-router'
import AppHeader from '../AppHeader.vue'

describe('AppHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof AppHeader>> | undefined
  let router: Router
  let pinia: ReturnType<typeof createPinia>

  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
  })

  const setupRouter = async ({ isAuthenticated = true, hasBet = true } = {}) => {
    pinia = createPinia()
    setActivePinia(pinia)

    // Spy on auth store getters and methods
    const authStore = useAuthStore()
    vi.spyOn(authStore, 'isAuthenticated', 'get').mockReturnValue(isAuthenticated)
    vi.spyOn(authStore, 'logout').mockResolvedValue(undefined)

    // Spy on bet store getters
    const betStore = useBetStore()
    vi.spyOn(betStore, 'hasBet', 'get').mockReturnValue(hasBet)

    // Use the real router with memory history for tests
    router = createAppRouter({ history: createMemoryHistory() })

    await router.push('/home')
    await router.isReady()
  }

  const mountComponent = (options = {}) => {
    return mount(AppHeader, {
      global: {
        plugins: [pinia, router],
      },
      ...options,
    })
  }

  describe('rendering', () => {
    it('renders navigation menu with Home and Live Draw options', async () => {
      await setupRouter()
      wrapper = mountComponent()

      expect(wrapper.text()).toContain('Home')
      expect(wrapper.text()).toContain('Live Draw')
    })

    it('renders logout button', async () => {
      await setupRouter()
      wrapper = mountComponent()

      expect(wrapper.text()).toContain('Logout')
    })

    it('renders user avatar', async () => {
      await setupRouter()
      wrapper = mountComponent()

      const avatar = wrapper.find('[data-testid="user-avatar"]')
      expect(avatar.exists()).toBe(true)
    })
  })

  describe('navigation', () => {
    it('navigates to selected route when menu item is clicked', async () => {
      await setupRouter({ isAuthenticated: true, hasBet: true }) // Authenticated and has bet
      wrapper = mountComponent()

      // Find and click on the Live Draw menu item
      const liveDrawMenuItem = wrapper.find('[data-testid="menu-live-draw"]')
      expect(liveDrawMenuItem.exists()).toBe(true)
      await liveDrawMenuItem.trigger('click')
      await flushPromises()

      // Assert navigation occurred
      expect(router.currentRoute.value.path).toBe('/draw')
    })

    it('redirects to home when navigating to draw without a bet', async () => {
      await setupRouter({ isAuthenticated: true, hasBet: false }) // Authenticated but no bet
      wrapper = mountComponent()

      // Try to navigate to draw page
      await router.push('/draw')
      await flushPromises()

      // Should be redirected to home due to requiresBet guard
      expect(router.currentRoute.value.path).toBe('/home')
    })

    it('shows active state for current route', async () => {
      await setupRouter({ isAuthenticated: true, hasBet: true }) // Authenticated and has bet
      await router.push('/draw')
      await router.isReady()

      wrapper = mountComponent()
      await nextTick()

      const menuItems = wrapper.findAll('[data-testid^="menu-"]')
      const liveDrawItem = wrapper.find('[data-testid="menu-live-draw"]')
      const menu = wrapper.findComponent({ name: 'n-menu' })

      expect(menuItems).toHaveLength(2)
      expect(liveDrawItem.exists()).toBe(true)
      expect(router.currentRoute.value.path).toBe('/draw')
      expect(menu.props('value')).toBe('/draw')
    })
  })

  describe('logout', () => {
    it('redirects to login page when logout button is clicked', async () => {
      await setupRouter()
      const authStore = useAuthStore()

      // Spy on logout to simulate changing authentication state
      vi.spyOn(authStore, 'logout').mockImplementation(async () => {
        vi.spyOn(authStore, 'isAuthenticated', 'get').mockReturnValue(false)
      })

      wrapper = mountComponent()

      const logoutButton = wrapper.find('[data-testid="logout-button"]')
      expect(logoutButton.exists()).toBe(true)
      expect(logoutButton.text()).toContain('Logout')
      await logoutButton.trigger('click')
      await flushPromises()

      expect(router.currentRoute.value.path).toBe('/login')
    })

    it('calls auth store logout during logout flow', async () => {
      await setupRouter()
      const authStore = useAuthStore()
      const logoutSpy = vi.spyOn(authStore, 'logout').mockResolvedValue(undefined)

      wrapper = mountComponent()

      const logoutButton = wrapper.find('[data-testid="logout-button"]')
      expect(logoutButton.exists()).toBe(true)
      await logoutButton.trigger('click')
      await flushPromises()

      expect(logoutSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('menu options', () => {
    it('displays correct menu options', async () => {
      await setupRouter()
      wrapper = mountComponent()

      const menuItems = wrapper.findAll('[data-testid^="menu-"]')

      const menuLabels = menuItems.map((item) => item.text())
      expect(menuLabels).toContain('Home')
      expect(menuLabels).toContain('Live Draw')
      expect(menuLabels).toHaveLength(2)
    })
  })
})
