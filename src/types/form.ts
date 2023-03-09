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
  Photos?: Array<{ link: string }>
  UpdatedAt?: string /* 后端传回的数据 */
  ID?: number
  Activities?: {ActivityName: string, [proName: string]: any}[]
  StartTime?: string
  EndTime?: string
  Operator?: string
  [proName: string]: any
}

type adminForm = {
  dateRange: string
  title: string
  description: string
  cover: Array<{ link: string }>
}

export type { userForm, adminForm }
