import { defineStore } from 'pinia'
import type { Activity } from '@/types/activity'

export const useActivity = defineStore('activity', {
  state: (): Activity => {
    return {
      ID: 0,
      ActivityName: '',
      Description: '',
      ActivityPhotos: [],
      EndTime: '',
      StartTime: '',
      SenderName: '',
      Articles: []
    }
  },
  persist: true
})
