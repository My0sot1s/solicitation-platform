import type { ActivityList } from '@/types/activityList'
import type { userForm } from './form'
type TabType = {
  title: string
  showCard: string
  api: () => Promise<ActivityList[] | userForm[]>
}

type TabsType = Array<TabType>

export type { TabType, TabsType }
