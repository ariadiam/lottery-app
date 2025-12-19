import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createNaiveUI } from '@/plugins/naive-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createNaiveUI())

app.mount('#app')
