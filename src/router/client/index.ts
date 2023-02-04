import type { RouteRecordRaw } from 'vue-router'

export const clientRoutes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    meta: { title: '稿件征集' },
    component: () => import('@/views/client/Home.vue')
  }
]
