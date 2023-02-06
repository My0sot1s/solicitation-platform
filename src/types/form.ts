import type { UploaderFileListItem } from 'vant'

type userForm = {
  username: string
  phone: string
  title: string
  content: string
  imgs: Array<UploaderFileListItem>
}

type adminForm = {
  dateRange: string
  title: string
  description: string
  cover: Array<UploaderFileListItem>
}

export type { userForm, adminForm }
