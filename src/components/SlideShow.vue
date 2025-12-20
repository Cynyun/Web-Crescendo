<template>
    <div class="slideshow">
        <!-- 预览项 -->
        <img :src="images[previewIndex]?.src" v-if="previewIndex !== null && images[previewIndex]"
            class="preview-overlay" />

        <!-- 使用 Vue 版 Swiper 组件 -->
        <Swiper ref="swiperEl" :modules="[Navigation, Pagination, Autoplay, EffectCreative]" :loop="true"
            :effect="'creative'" :creative-effect="creativeEffectOptions" :speed="500" :autoplay="{
                delay: 3000,
                disableOnInteraction: false
            } as any" @init="onSwiperInit" @slide-change="onSlideChange" class="my-swiper"
            @v-click="handleContainerClick">
            <SwiperSlide v-for="(image, index) in images" :key="index">
                <!-- <a :href="image.link" target="_blank" rel="noopener noreferrer"> -->
                <img :src="image.src" alt="" class="slide-img" />
                <!-- </a> -->
            </SwiperSlide>
        </Swiper>

        <!-- 左右导航图标（保持不变） -->
        <div class="nav-icon left-icon" @click="goToPrev" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
            <i class="iconfont icon-left"></i>
        </div>
        <div class="nav-icon right-icon" @click="goToNext" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
            <i class="iconfont icon-right-copy"></i>
        </div>

        <!-- 自定义分页器（保持不变） -->
        <div v-if="showPagination" :class="['custom-pagination', { 'dot-mode': paginationType === 'dot' }]">
            <button v-for="index in visibleIndexes" :key="index" :class="{ active: currentIndex === index }"
                @click="handleBulletClick(index)" @mouseenter="() => handleBulletEnter(index)"
                @mouseleave="handleBulletLeave" class="bullet">
                <span v-if="paginationType === 'number'">{{ index + 1 }}</span>
                <span v-else>&nbsp;</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
// 导入 Swiper Vue 组件
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-creative'

// 导入所需模块
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules'

// Props 接口定义
const props = defineProps({
    images: {
        type: Array as PropType<Array<{
            src: string
            alt?: string
            title?: string
        }>>, required: true
    },
    maxVisibleBullets: { type: Number, default: 5 },
    showPagination: { type: Boolean, default: true },
    paginationType: {
        type: String,
        default: 'number',
        validator: (value: string) => ['number', 'dot'].includes(value)
    }
})

// swiper组件ref
const swiperEl = ref<any>(null) // 类型可细化为 SwiperInstance，但 any 也可用

// 当前页码索引
const currentIndex = ref(0)

// 当前预览索引
const previewIndex = ref<number | null>(null)

// Creative Effect 配置（提取为响应式对象）
const creativeEffectOptions = {
    prev: {
        translate: ['-100%', 0, 0],
        opacity: 0.3
    },
    next: {
        translate: ['100%', 0, 0],
        opacity: 0.3
    },
    limitProgress: 1,
    perspective: true
}

// 计算可见分页索引
const visibleIndexes = computed(() => {
    const total = props.images.length
    if (total <= props.maxVisibleBullets) {
        return Array.from({ length: total }, (_, i) => i)
    }
    const current = currentIndex.value
    let start = current - Math.floor(props.maxVisibleBullets / 2)
    let end = current + Math.floor(props.maxVisibleBullets / 2)
    if (start < 0) {
        start = 0
        end = props.maxVisibleBullets - 1
    }
    if (end >= total) {
        end = total - 1
        start = total - props.maxVisibleBullets
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 暂停自动播放
const pauseAutoplay = () => {
    if (swiperEl.value?.swiper?.autoplay?.running) {
        swiperEl.value.swiper.autoplay.stop()
    }
}

// 恢复自动播放
const resumeAutoplay = () => {
    if (swiperEl.value?.swiper?.autoplay) {
        swiperEl.value.swiper.autoplay.start()
    }
}

// 手动操作后重置自动播放（先停再启，重置计时器）
const resetAutoplay = () => {
    pauseAutoplay()
    setTimeout(resumeAutoplay, 100)
}

// 点击左右半屏切换
const handleContainerClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest('.nav-icon')
    if (target) return

    // 判断是否点击的是图标区域
    const container = swiperEl.value?.$el as HTMLElement
    if (!container) return // 忽略图标点击

    const rect = container.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    if (clickX < rect.width / 2) {
        // 点击左半屏：上一张（带 loop）
        swiperEl.value?.swiper?.slidePrev()
    } else {
        // 点击右半屏：下一张（带 loop）
        swiperEl.value?.swiper?.slideNext()
    }
    resetAutoplay()
}

// 滑动到指定页码
const goToPrev = () => {
    swiperEl.value?.swiper?.slidePrev()
    resetAutoplay()
}

// 往前滑动
const goToNext = () => {
    swiperEl.value?.swiper?.slideNext()
    resetAutoplay()
}

// 鼠标进入按钮：开始预览
const handleBulletEnter = (index: number) => {
    previewIndex.value = index
    pauseAutoplay()
}

// 鼠标离开按钮：取消预览
const handleBulletLeave = () => {
    previewIndex.value = null
    resumeAutoplay()
}

// 点击按钮：真正切换
const handleBulletClick = (index: number) => {
    swiperEl.value?.swiper?.slideToLoop(index)
    resetAutoplay()
}

// Swiper 生命周期
const onSwiperInit = (swiper: any) => {
    currentIndex.value = swiper.realIndex
}

const onSlideChange = (swiper: any) => {
    currentIndex.value = swiper.realIndex
}

defineOptions({
    name: 'SlideShow'
})
</script>

<style scoped>
.slideshow {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
}

.slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    /* 防止图片拦截点击事件 */
}

.custom-pagination {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.bullet {
    width: 32px;
    height: 32px;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    color: rgb(216, 237, 251);
    border-radius: 50%;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    /* dot 模式下隐藏文字，但保留布局 */
    overflow: hidden;
}

/* dot 模式：不显示数字，仅圆点 */
.bullet span {
    display: inline-block;
}

.bullet:hover,
.bullet.active {
    background: rgba(235, 246, 255, 0.922);
    color: #333;
    transform: scale(1.1);
}

/* dot 模式覆盖样式 */
.custom-pagination.dot-mode {
    gap: 6px;
}

.custom-pagination.dot-mode .bullet {
    width: 10px;
    height: 10px;
    font-size: 0;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    padding: 0;
}

.custom-pagination.dot-mode .bullet.active {
    background: white;
    transform: scale(1.4);
}

.nav-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s ease;
    z-index: 20;
}

.nav-icon:hover,
.nav-icon.active {
    opacity: 1;
    background: rgba(255, 255, 255, 0.6);
    transform: translateY(-50%) scale(1.1);
}

.left-icon {
    left: 20px;
}

.right-icon {
    right: 20px;
}

.preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    pointer-events: none;
    /* 防止拦截点击 */
    z-index: 5;
    /* 动画：从透明到半透明 + 微微放大 */
    animation: fadeInPreview 0.4s ease forwards;
}

@keyframes fadeInPreview {
    from {
        opacity: 0;
        transform: scale(0.98);
    }

    to {
        opacity: 0.85;
        /* 半透明预览 */
        transform: scale(1);
    }
}
</style>