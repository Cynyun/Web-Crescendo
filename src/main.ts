import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import SlideShow from './components/SlideShow.vue'

// 全局注册 Swiper Web Components
import { register } from 'swiper/element/bundle'
if (!customElements.get('swiper-container')) {
  register()
}

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.component('SlideShow', SlideShow)

app.mount('#app')