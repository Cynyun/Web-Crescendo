import { COLORS, registerColorCssVariables } from './config' // 基本属性
registerColorCssVariables(COLORS)

import './assets/base.css'

import getImageSrc from './config' // 图片
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { enableScrollbarAutoHide } from './utils/scrollbarAutoHide' // 滚动条ts
enableScrollbarAutoHide(2000)

import App from './App.vue'
import router from './router'

import SlideShow from './components/SlideShow.vue'
import ImageCard from './components/ImageCard.vue'
import TextCard from './components/TextCard.vue'

// 全局注册 Swiper Web Components
import { register } from 'swiper/element/bundle'
if (!customElements.get('swiper-container')) {
  register()
}


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(getImageSrc)

app.component('SlideShow', SlideShow)
app.component('ImageCard', ImageCard)
app.component('TextCard', TextCard)

app.mount('#app')
