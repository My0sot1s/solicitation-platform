interface ActivityPhoto {
  link: string
  [proName: string]: any
}

export interface ActivityList {
  ID: number
  ActivityName: string
  Description: string
  EndTime: string
  ActivityPhotos: ActivityPhoto[]
  [proName: string]: any
}
