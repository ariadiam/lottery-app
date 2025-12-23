<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

const route = useRoute()

const showHeader = computed(() => {
  return !['/login', '/register'].includes(route.path)
})
</script>

<template>
  <n-message-provider>
    <n-layout style="height: 100%">
      <AppHeader v-if="showHeader" />
      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-message-provider>
</template>

<style scoped></style>
