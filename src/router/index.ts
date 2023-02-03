import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: '稿件征集',
      component: () => import('@/views/client/Home.vue')
    }
  ]
})

export default router
