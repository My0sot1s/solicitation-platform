import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: Array<RouteRecordRaw> = [
  { path: '/admin', redirect: '/admin/home' },
  {
    path: '/admin/home',
    meta: { title: '稿件征集', showTab: true },
    component: () => import('@/views/admin/Home.vue')
  },
  {
    path: '/admin/new',
    meta: { title: '新建征稿' },
    component: () => import('@/views/admin/NewActivity.vue')
  },
  {
    name: 'audit',
    path: '/admin/audit/:ID',
    meta: { title: '稿件详情' },
    component: () => import('@/views/admin/AuditArticle.vue')
  },
  {
    name: 'manuscripts',
    path: '/admin/manuscripts/:ID',
    meta: { title: '稿件列表' },
    beforeEnter: (to) => {
      to.meta.title = sessionStorage.activityName
    },
    component: () => import('@/views/admin/ArticleList.vue')
  },
  {
    path: '/admin/setting',
    meta: { title: '设置', showTab: true },
    component: () => import('@/views/admin/Setting.vue')
  },
  {
    path: '/admin/activitys',
    meta: { title: '活动列表' },
    component: () => import('@/views/admin/ActivityList.vue')
  },
  {
    name: 'edit',
    path: '/admin/edit/:ID',
    meta: { title: '修改征稿' },
    component: () => import('@/views/admin/EditActivity.vue')
  },
  {
    path: '/admin/manageAdmin',
    meta: { title: '管理员设置' },
    component: () => import('@/views/admin/ManageAdmin.vue')
  }
]
