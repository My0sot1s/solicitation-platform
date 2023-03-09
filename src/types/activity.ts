interface ActivityPhoto {
  link: string
  [proName: string]: any
}

export interface Activity {
  ID: number
  ActivityName: string
  Description: string
  StartTime: string
  EndTime: string
  ActivityPhotos: ActivityPhoto[]
  Articles: []
  [proName: string]: any
}
