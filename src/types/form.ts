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
  Photos?: Array<{link: string}>
}

type adminForm = {
  dateRange: string
  title: string
  description: string
  cover: Array<{link: string}>
}

export type { userForm, adminForm }
