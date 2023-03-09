import type { Activity } from '@/types/activity'
import type { userForm } from './form'
type TabType = {
  title: string
  showCard: string
  api: () => Promise<Activity[] | userForm[]>
}

type TabsType = Array<TabType>

export type { TabType, TabsType }
