interface ActivityPhoto {
  link: string
  [proName: string]: any
}

export interface activityList {
  ID: string
  activityName: string
  description: string
  endTime: string
  ActivityPhotos: ActivityPhoto[]
  [proName: string]: any
}
