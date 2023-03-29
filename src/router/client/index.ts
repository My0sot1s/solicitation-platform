import type { RouteRecordRaw } from 'vue-router'

export const clientRoutes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },
  {
    path: '/tourist',
    redirect: '/home'
  },
  {
    path: '/home',
    meta: { title: '稿件征集', next: '' },
    component: () => import('@/views/client/Home.vue')
  },
  {
    path: '/new/:ActivityID',
    meta: { title: '新建征稿' },
    component: () => import('@/views/client/New.vue')
  },
  {
    path: '/my-submission/:ActivityID/',
    meta: { title: '我的投稿' },
    component: () => import('@/views/client/MySubmission.vue')
  }
]
