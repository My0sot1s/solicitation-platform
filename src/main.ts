import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import importVant from './utils/importVant'
import wxLogin from './utils/wxLogin'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(importVant)
app.use(wxLogin)

app.mount('#app')
