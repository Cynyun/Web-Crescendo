import { COLORS, registerColorCssVariables } from './config' // 基本属性
registerColorCssVariables(COLORS)

import './assets/base.css'

import getImageSrc from './config' // 图片
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { enableScrollbarAutoHide } from './utils/ScrollbarAutoHide' // 滚动条ts
enableScrollbarAutoHide(2000)

import App from './App.vue'
import router from './router'

// Element-Plus Components
import element from 'element-plus'
import 'element-plus/dist/index.css'

// 修改导入方式，使用命名导入替代默认导入
import * as SlideShow from './components/SlideShow.vue'
import ImageCard from './components/ImageCard.vue'
import TextCard from './components/TextCard.vue'
import GradientText from './components/GradientText.vue'

// Swiper Web Components
import { register } from 'swiper/element/bundle'
if (!customElements.get('swiper-container')) {
  register()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(getImageSrc)
app.use(element)

app.component('SlideShow', SlideShow)
app.component('ImageCard', ImageCard)
app.component('TextCard', TextCard)
app.component('TextCard', TextCard)
app.component('GradientText', GradientText)

app.mount('#app')