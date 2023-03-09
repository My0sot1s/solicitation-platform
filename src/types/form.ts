type userForm = {
  Content?: string
  'Description-1'?: string
  'Description-2'?: string
  'Description-3'?: string
  'Link-1'?: string
  'Link-2'?: string
  'Link-3'?: string
  Name?: string
  PhoneNum?: string
  Title?: string
  ActivityID?: number
  ArticleID?: number
  Photos?: Array<{ link: string }>
  UpdatedAt?: string /* 后端传回的数据 */
  ID?: number
  Activities?: { ActivityName: string; [proName: string]: any }[]
  StartTime?: string
  EndTime?: string
  Status?: number
  [proName: string]: any
}

type adminForm = {
  ActivityName: string
  Description: string
  Photos: [
    {
      Link: string
    }
  ]
  EndTime: number
  StartTime: number
  SenderName: string
}

export type { userForm, adminForm }
