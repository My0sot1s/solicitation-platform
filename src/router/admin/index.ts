import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: Array<RouteRecordRaw> = [
  { path: '/admin', redirect: '/admin/home' },
  {
    path: '/admin/home',
    meta: { title: '稿件征集', showTab: true },
    component: () => import('@/views/admin/Home.vue')
  },
  {
    name: 'manuscripts',
    path: '/admin/manuscripts/:ID',
    meta: { title: '' },
    component: () => import('@/views/admin/Manuscripts.vue')
  },
  {
    path: '/admin/audit',
    meta: { title: '稿件详情' },
    component: () => import('@/views/admin/Audit.vue')
  },
  {
    path: '/admin/new',
    meta: { title: '新建征稿' },
    component: () => import('@/views/admin/New.vue')
  },
  {
    path: '/admin/setting',
    meta: { title: '稿件征集', showTab: true },
    component: () => import('@/views/admin/Setting.vue')
  },
  {
    path: '/admin/edit',
    meta: { title: '修改征稿' },
    component: () => import('@/views/admin/Edit.vue')
  }
]
