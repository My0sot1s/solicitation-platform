import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import importVant from './utils/importVant'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(importVant)

app.mount('#app')
