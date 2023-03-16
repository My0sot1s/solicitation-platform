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
    beforeEnter: (to) => {
      to.meta.title = sessionStorage.activityName
    },
    component: () => import('@/views/admin/Manuscripts.vue')
  },
  {
    name: 'audit',
    path: '/admin/audit/:ID',
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
    name: 'edit',
    path: '/admin/edit/:ID',
    meta: { title: '修改征稿' },
    component: () => import('@/views/admin/Edit.vue')
  }
]
