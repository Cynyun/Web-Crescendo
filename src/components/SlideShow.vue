<template>
    <div class="slideshow">
        <!-- 预览项 -->
        <img :src="images[previewIndex]?.src" v-if="previewIndex !== null && images[previewIndex]"
            class="preview-overlay">

        <!-- Swiper 容器 -->
        <swiper-container ref="swiperEl" :init="false" style="width: 100%; height: 100%" @click="handleContainerClick">
            <swiper-slide v-for="(image, index) in images" :key="index">
                <a :href="image.link" target="_blank" rel="noopener noreferrer">
                    <img :src="image.src" alt="" class="slide-img" />
                </a>
            </swiper-slide>
        </swiper-container>

        <!-- 左侧图标 -->
        <div class="nav-icon left-icon" @click="goToPrev" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
            <i class="iconfont icon-left"></i>
        </div>

        <!-- 右侧图标 -->
        <div class="nav-icon right-icon" @click="goToNext" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay">
            <i class="iconfont icon-right-copy"></i>
        </div>

        <!-- 自定义数字分页器 -->
        <!-- 分页器 -->
        <div v-if="showPagination" :class="['custom-pagination', { 'dot-mode': paginationType === 'dot' }]">
            <button v-for="index in visibleIndexes" :key="index" :class="{ active: currentIndex === index }"
                @click="handleBulletClick(index)" @mouseenter="() => handleBulletEnter(index)"
                @mouseleave="handleBulletLeave" class="bullet">
                <!-- 根据 paginationType 决定显示内容 -->
                <span v-if="paginationType === 'number'">{{ index + 1 }}</span>
                <span v-else>&nbsp;</span> <!-- dot 模式：空内容，靠样式撑开 -->
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Props 接口定义
const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    maxVisibleBullets: {
        type: Number,
        default: 5
    },
    showPagination: {
        type: Boolean,
        default: true
    },
    paginationType: {
        type: String,
        default: 'number',
        validator(value) {
            return ['number', 'dot'].includes(value)
        }
    }
})

// swiper组件ref
const swiperEl = ref(null)

// 当前页码索引
const currentIndex = ref(0)

// 当前预览索引
const previewIndex = ref(null)

// 更新预览按钮数据
const visibleIndexes = computed(() => {
    const total = props.images.length
    if (total <= props.maxVisibleBullets) {
        return Array.from({ length: total }, (_, i) => i)
    }
    const current = currentIndex.value
    let start, end
    const half = Math.floor(props.maxVisibleBullets / 2)
    start = current - half
    end = current + half
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
    if (swiperEl.value?.swiper?.autoplay) {
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
const handleContainerClick = (event) => {
    if (!swiperEl.value?.swiper) return

    // 判断是否点击的是图标区域
    const target = event.target.closest('.nav-icon')
    if (target) return // 忽略图标点击

    const containerRect = swiperEl.value.getBoundingClientRect()
    const clickX = event.clientX - containerRect.left
    const containerWidth = containerRect.width

    if (clickX < containerWidth / 2) {
        // 点击左半屏：上一张（带 loop）
        swiperEl.value.swiper.slidePrev()
    } else {
        // 点击右半屏：下一张（带 loop）
        swiperEl.value.swiper.slideNext()
    }
    resetAutoplay()
}

// 滑动到指定页码
const goToSlide = (index) => {
    if (swiperEl.value?.swiper) {
        swiperEl.value.swiper.slideToLoop(index)
        currentIndex.value = index
        resetAutoplay()
    }
}

// 往前滑动
const goToPrev = () => {
    if (swiperEl.value?.swiper) {
        swiperEl.value.swiper.slidePrev()
        resetAutoplay()
    }
}

// 往后滑动
const goToNext = () => {
    if (swiperEl.value?.swiper) {
        swiperEl.value.swiper.slideNext()
        resetAutoplay()
    }
}

// 鼠标进入按钮：开始预览
const handleBulletEnter = (index) => {
    previewIndex.value = index
    pauseAutoplay() // 悬停暂停自动播放
}

// 鼠标离开按钮：取消预览
const handleBulletLeave = () => {
    previewIndex.value = null
    resumeAutoplay() // 恢复自动播放
}

// 点击按钮：真正切换
const handleBulletClick = (index) => {
    goToSlide(index)
    // previewIndex 会在 goToSlide 后被覆盖，无需手动清空
}

onMounted(() => {
    if (!swiperEl.value) return
    // 配置 Swiper 参数
    Object.assign(swiperEl.value, {
        loop: true,
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ['-100%', 0, 0],
                opacity: 0.3,
            },
            next: {
                translate: ['100%', 0, 0],
                opacity: 0.3,
            },
            limitProgress: 1,
            perspective: true,
        },
        speed: 500,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        on: {
            init(swiper) {
                currentIndex.value = swiper.realIndex
            },
            slideChange(swiper) {
                currentIndex.value = swiper.realIndex
            }
        }
    })
    swiperEl.value.initialize()
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