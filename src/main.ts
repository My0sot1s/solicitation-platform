import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
  Uploader
} from 'vant'
import 'vant/lib/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
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

app.mount('#app')
