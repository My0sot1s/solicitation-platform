import type { adminForm, userForm } from './form'

interface ActivityPhoto {
  Link: string
  [proName: string]: any
}
/*
活动信息：Activity extends adminForm
  ID：征稿活动ID
  Articles：用户上传的该主题的文章列表
*/
interface Activity extends adminForm {
  ID: number
  Articles: userForm[]
  [proName: string]: any
}

export type { ActivityPhoto, Activity }
