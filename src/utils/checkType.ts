import type { Activity } from '@/types/activity'
import type { userForm } from '@/types/form'

export function isActivity(card: Activity | userForm): card is Activity {
  return typeof card.ActivityName === 'string' && Array.isArray(card.Articles)
}
