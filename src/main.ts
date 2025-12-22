import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNaiveUI } from '@/plugins/naive-ui'
import { useAuthStore } from '@/stores/auth.store'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore()
authStore.loadSession()

app.use(router)
app.use(createNaiveUI())

app.mount('#app')
