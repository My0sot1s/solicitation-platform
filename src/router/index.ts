import { createRouter, createWebHashHistory } from 'vue-router'
import { adminRoutes } from './admin'
import { clientRoutes } from './client'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...adminRoutes, ...clientRoutes]
})

export default router
