<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import type { MenuOption } from 'naive-ui'
import { PersonCircleOutline, LogOutOutline } from '@vicons/ionicons5'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const menuOptions: MenuOption[] = [
  {
    label: 'Home',
    key: '/home',
  },
  {
    label: 'Live Draw',
    key: '/draw',
  },
]

const activeKey = computed(() => route.path)

const menuNodeProps = (option: MenuOption) => {
  if (option.key === '/draw') {
    return { 'data-testid': 'menu-live-draw' }
  }

  if (option.key === '/home') {
    return { 'data-testid': 'menu-home' }
  }

  return {}
}

const handleMenuChange = (key: string) => {
  router.push(key)
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <n-layout-header bordered class="app-header">
    <div class="header">
      <n-menu
        :value="activeKey"
        mode="horizontal"
        :options="menuOptions"
        :node-props="menuNodeProps"
        responsive
        style="width: 240px"
        @update:value="handleMenuChange"
      />

      <div class="player">
        <n-avatar round data-testid="user-avatar">
          <n-icon size="22">
            <PersonCircleOutline />
          </n-icon>
        </n-avatar>

        <n-button
          quaternary
          type="error"
          size="small"
          data-testid="logout-button"
          @click="handleLogout"
        >
          <template #icon>
            <n-icon>
              <LogOutOutline />
            </n-icon>
          </template>
          Logout
        </n-button>
      </div>
    </div>
  </n-layout-header>
</template>

<style scoped lang="scss">
.app-header {
  height: 56px;
}

.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.player {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
