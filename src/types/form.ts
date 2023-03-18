import type { ActivityPhoto } from './activity'

/* 
用户投稿表单（稿件内容）
  Name：投稿人名字
  PhoneNum：手机号
  Title：内容标题
  Content：文字内容
  Link-[i]：附加链接
  Description-[i]：附加链接描述
  ActivityID：征稿活动ID
  ArticleID：文章ID
  Photos：上传的图片
  ArticlePhotos：获取的图片
  UpdatedAt：更新时间
  ID？
  Activities？
  StartTime：开始时间
  EndTime：截止时间
  Status：稿件状态 
*/
type userForm = {
  Name?: string
  PhoneNum?: string
  Title?: string
  Content?: string
  'Description-1'?: string
  'Description-2'?: string
  'Description-3'?: string
  'Link-1'?: string
  'Link-2'?: string
  'Link-3'?: string
  ActivityID?: number
  ArticleID?: number
  Photos?: Array<ActivityPhoto>
  ArticlePhotos?: Array<ActivityPhoto>
  UpdatedAt?: string /* 后端传回的数据 */
  ID?: number
  Activities?: { ActivityName: string; [proName: string]: any }[]
  StartTime?: string
  EndTime?: string
  Status?: 1 | -1 | 2 | 3 // 未处理:1，已撤回:-1，收藏:2，略过：3
  [proName: string]: any
}

/* 
管理员发布征稿表单:
  ActivityName：征稿主题
  Description：主题描述
  Photos：上传的封面图片
  EndTime：截止时间---------\
                            >上传的格式为时间戳数字，获取的格式为当地时间字符串
  StartTime：开始时间-------/
  SenderName：征稿方（融媒体 | 桑梓）
*/
type activityForm = {
  ActivityName: string
  Description: string
  Photos: ActivityPhoto[]
  EndTime: string | number
  StartTime: string | number
  SenderName: string
}

type addAdminForm = {
  IsSuperAdmin: 0 | 1
  Note: string
  StuNum?: number
}

export type { userForm, activityForm, addAdminForm }
