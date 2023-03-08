import type { ActivityList } from '@/types/activityList'
type TabType = {
  title: string
  showCard: string
  api: () => Promise<ActivityList[]>
}

type TabsType = Array<TabType>

export type { TabType, TabsType }
