<template>
  <div class="framework">
    <div class="header">
      <div class="nav-tabs">
        <button class="tab-button" @click="handleClick('world')">世界观</button>
        <button class="tab-button" @click="handleClick('person')">人物志</button>
      </div>
    </div>
    <div class="container">
      <div class="carousel-container">
        <!-- 修复位移逻辑：基于容器宽度的单张位移，而非百分比总宽度 -->
        <div class="carousel-list"
          :style="{ transform: `translateX(-${currentIndex * carouselWidth}px)`, transition: 'transform 0.5s ease-in-out' }">
          <div class="carousel-item" v-for="(item, index) in carouselImages" :key="index">
            <img :src="item.src" :alt="item.alt" class="carousel-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const router = useRouter()

// 原有点击逻辑不变
const handleClick = (str: string) => {
  if (str === 'world') {
    router.push('/world')
  } else if (str === 'person') {
    router.push('/person')
  }
}

// 轮播图片配置（明确5张图，避免路径混乱）
const carouselImages = ref([
  { src: '/Images/ct1.jpg', alt: '轮播图1' },
  { src: '/Images/ct2.jpg', alt: '轮播图2' },
  { src: '/Images/ct3.jpg', alt: '轮播图3' },
  { src: '/Images/ct4.jpg', alt: '轮播图4' },
  { src: '/Images/ct5.jpg', alt: '轮播图5' }
])
const currentIndex = ref(0)
let carouselTimer: number | null = null
const carouselWidth = ref(0) // 单个轮播项宽度（与容器宽度一致）

// 获取轮播容器宽度（关键：确保位移精准）
const getCarouselWidth = () => {
  nextTick(() => {
    const container = document.querySelector('.carousel-container') as HTMLElement
    if (container) {
      carouselWidth.value = container.offsetWidth
    }
  })
}

// 切换下一张（仅单张切换，绝对不批量）
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselImages.value.length
  console.log('当前索引：', currentIndex.value) // 可查看切换日志
}

// 启动轮播
onMounted(() => {
  getCarouselWidth() // 先获取宽度，再启动定时器
  // 严格3秒间隔，单张切换
  carouselTimer = setInterval(() => {
    nextSlide()
  }, 3000)
})

// 清除定时器
onUnmounted(() => {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
})
</script>

<style scoped lang="scss">
.framework {
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 100px;
  position: relative;
  background-image:
    linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
    url('/Images/headerimage.webp'),
    url('/Images/hengfu.webp');
  background-repeat: no-repeat, no-repeat, repeat-x;
  background-position: center bottom, 20px 10px, top left;
  background-size: auto, auto, auto;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
    pointer-events: none;
    z-index: 1;
  }

  .nav-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 30px;
    padding: 0 50px;
  }

  .tab-button {
    margin-top: 35px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    color: #bdbdbd;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: #e74c3c;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }

    &:hover {
      color: white;
    }
  }
}

.container {
  width: 100%;
  height: calc(100vh - 100px);
  color: white;
  background-image: url('/Images/backgroundImage1.webp');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-container {
  width: 85%;
  height: 75%;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
}

.carousel-list {
  display: flex;
  height: 100%;
  /* 取消500%宽度，改用flex自适应，避免百分比位移错乱 */
  flex-shrink: 0;
}

.carousel-item {
  width: 100%;
  /* 单个项宽度与容器一致，关键！ */
  height: 100%;
  flex-shrink: 0;
  /* 禁止压缩，确保单张显示 */
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
  outline: none;
}
</style>