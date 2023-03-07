import type { activityList } from '@/request/apis/types'
type TabType = {
  title: string
  showCard: string
  api: () => Promise<activityList[]>
}

type TabsType = Array<TabType>

export type { TabType, TabsType }
