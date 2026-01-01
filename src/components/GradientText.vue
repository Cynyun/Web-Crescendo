<!-- src/components/GradientText.vue -->
<template>
    <component :is="tag" class="gradient-text" :style="textStyle">
        {{ text }}
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    text?: string
    fontSize?: string | number
    fontWeight?: string | number
    lineHeight?: string | number
    left?: string
    marginLeft?: string
    gradientColors?: string // 自定义渐变颜色，格式: "color1, color2" 或 "color1, color2, color3, color4"
    position?: 'absolute' | 'relative' | 'static' // 定位方式
    tag?: string // 使用的 HTML 标签，默认 span
}

const props = withDefaults(defineProps<Props>(), {
    text: 'GradientText',
    fontSize: '36px',
    fontWeight: 'bold',
    lineHeight: '80px',
    left: '20px',
    marginLeft: '20px',
    gradientColors: '', // 空字符串表示使用默认颜色
    position: 'absolute',
    tag: 'span'
})

const textStyle = computed(() => {
    const baseStyle: Record<string, string> = {
        fontSize: typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize,
        fontWeight: String(props.fontWeight),
        lineHeight: typeof props.lineHeight === 'number' ? `${props.lineHeight}px` : props.lineHeight,
        position: props.position
    }
    
    // 只有 position 为 absolute 时才设置 left 和 marginLeft
    if (props.position === 'absolute') {
        baseStyle.left = props.left
        baseStyle.marginLeft = props.marginLeft
    }
    
    // 如果提供了自定义渐变颜色
    if (props.gradientColors) {
        const colors = props.gradientColors.split(',').map(c => c.trim())
        baseStyle.background = `linear-gradient(90deg, ${colors.join(', ')})`
    }
    
    return baseStyle
})
</script>

<style scoped lang="scss">
.gradient-text {
    // 默认颜色，如果没有通过内联样式设置 background，则使用这个
    background: linear-gradient(90deg, var(--color-green-lightGrey), var(--color-cyan-lightGrey));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: transform 0.3s ease;
    text-align: center;
}

.gradient-text--animated {
    background: linear-gradient(90deg,
            var(--color-green-darkGrey),
            var(--color-cyan-darkGrey),
            var(--color-green-darkGrey),
            var(--color-cyan-darkGrey));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 300% 100%;
    animation: gradient-text-ani 2s infinite linear;
}
</style>

<style lang="scss">
// 全局 keyframes，供外部通过 :deep() 引用
@keyframes gradient-text-ani {
    from {
        background-position: 0% 0%;
    }

    to {
        background-position: 100% 0%;
    }
}
</style>

