import type { UploaderFileListItem } from 'vant'

export function compressImg(
  imgFile: UploaderFileListItem,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!imgFile.content || !imgFile.file) reject('选取图片失败，请重试')
    const image = new Image()
    image.src = imgFile.content!
    const type = imgFile.file!.type
    const fileName = imgFile.file!.name
    const lastModified = imgFile.file!.lastModified

    image.onload = () => {
      // 压缩图片
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      // canvas -> blob -> file
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(new File([blob], fileName, { type, lastModified }))
          else reject('选取图片失败，请重试')
        },
        type,
        quality
      )
    }
  })
}
