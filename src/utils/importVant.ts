import type { App } from 'vue'
import {
  Button,
  Image as VanImage,
  List,
  Tab,
  Tabs,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Sticky,
  Divider,
  Form,
  Field,
  BackTop,
  Uploader,
  Calendar,
  Toast,
  Picker,
  Popup
} from 'vant'
import 'vant/lib/index.css'

export default {
  install: (app: App) => {
    app.use(Button)
    app.use(VanImage)
    app.use(List)
    app.use(Tab)
    app.use(Tabs)
    app.use(NavBar)
    app.use(Icon)
    app.use(Cell)
    app.use(CellGroup)
    app.use(Tabbar)
    app.use(TabbarItem)
    app.use(Sticky)
    app.use(Divider)
    app.use(Form)
    app.use(Field)
    app.use(BackTop)
    app.use(Uploader)
    app.use(Calendar)
    app.use(Toast)
    app.use(Picker)
    app.use(Popup)
  }
}
