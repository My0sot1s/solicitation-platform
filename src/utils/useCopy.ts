import { showNotify } from 'vant'
import useClipboard from 'vue-clipboard3'

export const useCopy = async (text: string) => {
  const { toClipboard } = useClipboard()
  try {
    await toClipboard(text)
    showNotify({
      type: 'success',
      message: '复制成功',
      duration: 1000
    })
  } catch (e) {
    showNotify({
      type: 'danger',
      message: '复制失败，浏览器不支持复制',
      duration: 1000
    })
  }
}
