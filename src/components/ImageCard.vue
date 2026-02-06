<template>
    <!-- From Uiverse.io by kennyotsu -->
    <div class="container noselect" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="canvas">
            <div id="card" :style="cardStyle">
                <p id="prompt">{{ props.prompt }}</p>
                <div class="title">{{ props.title }}</div>
                <img :src="props.imageUrl" mode="scaleToFill" />
                <!-- <div class="subtitle"></div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useThemeColorStore } from '@/stores/themecolor'

// 主题颜色store
const themeColorStore = useThemeColorStore()

// 鼠标位置
const mouseX = ref(0.5) // 初始值设为0.5，确保卡片摆正
const mouseY = ref(0.5) // 初始值设为0.5，确保卡片摆正

// 计算样式 - 使用CSS变量
const cardStyle = computed(() => {
    // 使用正弦函数计算旋转角度，使得边缘处的变化逐渐变小
    // 正弦函数在接近1和-1时导数趋近于0，实现边缘处变化平缓的效果
    const maxAngle = 25; // 最大旋转角度

    // 计算标准化的鼠标位置 (-1 到 1)
    const normalizedX = (mouseX.value - 0.5) * 2;
    const normalizedY = (mouseY.value - 0.5) * 2;

    // 使用正弦函数计算旋转角度
    const rotateX = -Math.sin(normalizedY * Math.PI / 2) * maxAngle;
    const rotateY = Math.sin(normalizedX * Math.PI / 2) * maxAngle;

    return {
        '--color-green-defaultGrey': themeColorStore.defaultGrey1,
        '--color-cyan-defaultGrey': themeColorStore.defaultGrey2,
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg)`,
        transition: '125ms ease-in-out'
    }
})

interface Props {
    prompt?: string
    title?: string
    imageUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
    prompt: 'HOVER OVER :D',
    title: 'image'
})

// 处理鼠标移动事件
const handleMouseMove = (event: MouseEvent) => {
    const container = event.currentTarget as HTMLElement
    const rect = container.getBoundingClientRect()

    // 计算鼠标在容器内的相对位置 (0 到 1)
    let x = (event.clientX - rect.left) / rect.width
    let y = (event.clientY - rect.top) / rect.height

    // 将相对位置限制在0.1到0.9的范围内，避免边缘处角度变化过于极端
    mouseX.value = Math.max(0.1, Math.min(0.9, x))
    mouseY.value = Math.max(0.1, Math.min(0.9, y))
}

// 处理鼠标离开事件
const handleMouseLeave = () => {
    // 重置鼠标位置，使卡片回到初始状态
    mouseX.value = 0.5
    mouseY.value = 0.5
}
</script>

<style scoped lang="scss">
.container {
    position: relative;
    width: 100%;
    height: 100%;
    transition: 200ms;
    cursor: pointer;
    padding: 28px;
    /* 添加内边距，为旋转时的卡片提供额外空间 */
    box-sizing: border-box;
}

.container:active {
    width: 100%;
    height: 100%;
}

#card {
    position: absolute;
    inset: 28px;
    /* 与容器内边距匹配 */
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 2px solid white;
    transition: 700ms;
    background: linear-gradient(43deg, var(--color-green-defaultGrey) 0%, var(--color-cyan-defaultGrey) 100%);
    overflow: hidden; // 裁剪子组件超出的部分
    /* 设置旋转原点为卡片中心 */
    transform-origin: center center;
    /* 初始透明度，使卡片背景部分透明 */
    opacity: 0.8;
    transition: all 0.3s ease;

    // 添加的图片
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.85;
        /* 初始透明度，使图片几乎完全透明 */
        transition: opacity 0.3s ease;
    }
}

.subtitle {
    transform: translateY(160px);
    color: rgb(134, 110, 221);
    text-align: center;
    width: 100%;
}

.title {
    opacity: 0;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out-out;
    transition-delay: 100ms;
    position: absolute;
    font-size: x-large;
    font-weight: bold;
    color: white;
    transition: opacity 0.3s ease;
}

#prompt {
    bottom: 8px;
    left: 12px;
    z-index: 20;
    font-size: 20px;
    font-weight: bold;
    transition: 300ms ease-in-out-out;
    position: absolute;
    max-width: 110px;
    color: rgb(255, 255, 255);
    opacity: 1;
    transition: opacity 0.3s ease;
}

.container:hover #card {
    transition: 300ms;
    filter: brightness(1.1);
    opacity: 1;
    /* 鼠标悬停时卡片完全不透明 */
}

.container:hover #card .title,
.container:hover #card img {
    opacity: 1;
    /* 鼠标悬停时图片完全不透明 */
}

.container:hover #card #prompt {
    opacity: 0;
}

.container:hover #card::before {
    transition: 200ms;
    content: '';
    opacity: 80%;
}

.canvas {
    perspective: 800px;
    inset: 0;
    z-index: 200;
    position: absolute;
    overflow: visible;
    /* 确保卡片旋转时不会被裁剪 */
}

#card::before {
    content: '';
    background: linear-gradient(43deg, var(--color-green-defaultGrey) 0%, var(--color-cyan-defaultGrey) 100%);
    filter: blur(2rem);
    opacity: 30%;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    transition: 200ms;
}

.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /*
        Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox
    */
}
</style>