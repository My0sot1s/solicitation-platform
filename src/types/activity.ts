import type { activityForm, userForm } from './form'

interface ActivityPhoto {
  Link: string
  [proName: string]: any
}
/*
活动信息：Activity extends activityForm
  ID：征稿活动ID
  ActivityPhotos：请求获取的图片
  Articles：用户上传的该主题的文章列表
*/
interface Activity extends activityForm {
  ID: number
  Articles: userForm[]
  ActivityPhotos: ActivityPhoto[]
  [proName: string]: any
}

export type { ActivityPhoto, Activity }
