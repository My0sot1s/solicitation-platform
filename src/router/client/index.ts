import type { RouteRecordRaw } from 'vue-router'

export const clientRoutes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    meta: { title: '稿件征集' },
    component: () => import('@/views/client/Home.vue')
  },
  {
    path: '/new',
    meta: { title: '新建征稿' },
    component: () => import('@/views/client/New.vue')
  },
  {
    path: '/my_submission',
    meta: { title: '活动名' },
    component: () => import('@/views/client/MySubmission.vue')
  }
]
