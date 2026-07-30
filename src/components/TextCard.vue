<template>
    <div class="context">
        <!-- 原结构（注释保留）
        <div class="paragraph" v-for="(text, index) in props.contexts" :key="index"
            :class="{ 'paragraph-indent': text.indent, 'paragraph-wide-gap': text?.wideGap }">{{ text.text }}</div>
        -->
        <div class="paragraph-row" v-for="(item, index) in props.contexts" :key="index">
            <div class="paragraph" :class="{ 'paragraph-indent': item.indent, 'paragraph-wide-gap': item?.wideGap }">
                {{ item.text }}
            </div>
            <NewButton size="small" class="copy-button" @click="copyText(item.text || '')">{{ '' }}</NewButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NewButton from '@/components/Button.vue'

interface ContextItem {
    text?: string
    indent?: boolean // 空格
    wideGap?: boolean // 更大的间距
    showbackground?: boolean // 展示背景
}
interface Props {
    contexts?: ContextItem[],
}
const props = withDefaults(defineProps<Props>(), {
    contexts: () => [
        {
            text: 'Hello Web!'
        },
        {
            text: 'Hello HTML!',
            indent: true // 空格(可选)
        },
        {
            text: 'Hello Vue3!',
            wideGap: true // 更大的间距(可选)
        }
    ],
})

// 复制功能
const copiedIndex = ref<number | null>(null)
const copyText = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text)
        // 找到当前点击的段落索引
        const idx = props.contexts?.findIndex(c => c.text === text) ?? -1
        copiedIndex.value = idx
        setTimeout(() => {
            copiedIndex.value = null
        }, 1500)
    } catch {
        // 降级方案
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        const idx = props.contexts?.findIndex(c => c.text === text) ?? -1
        copiedIndex.value = idx
        setTimeout(() => {
            copiedIndex.value = null
        }, 1500)
    }
}
</script>

<style scoped lang="scss">
.context {
    width: 100%;
    /* height: 100%; // 不设置用以自动调整 */
    min-width: 150px;
    min-height: 110px;
    background-color: rgba(255, 255, 255, 0.20);
    /* background-color: rgba(255, 0, 0, 1); // 检查用 */
    border-radius: 20px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 20px;
    padding: 20px 0; /* 确保文本不会碰边  外边控制上下 */
    opacity: 0.6;
    align-items: flex-start;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* 段落行：flex 布局容纳段落文字 + 复制按钮 */
    .paragraph-row {
        width: 100%;
        display: flex;
        align-items: flex-start;
        padding: 0 20px 0 20px;
        box-sizing: border-box;
        position: relative;
    }

    .paragraph {
        line-height: 22px;
        font-size: 20px;
        text-align: center;
        /* color: white; // 原文字色 */
        color: white;
        position: relative;
        display: inline-block;
        text-align: left;
        /* width: 100%; */
        flex: 1;
        box-sizing: border-box;
        margin: 0;
        /* padding: 0; */
        /* padding: 0 20px; // 确保文本不会碰边  里面控制上左右  避免挤开grid */
    }

    /* 复制按钮：全段高度透明覆盖层，仿 Nav 中 {{ '' }} 用法 */
    .copy-button {
        position: absolute;
        top: -3px;
        right: 10px;
        width: 10px;
        height: 100%;
        border-radius: 0;
        padding: 0;
        box-shadow: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 1;
    }

    /* 悬停段落行时显示复制按钮（半透明提示） */
    .paragraph-row:hover .copy-button {
        opacity: 0.3;
    }

    /* 按钮自身 hover：稍微加深 */
    .copy-button:hover {
        opacity: 1 !important;
    }

    .paragraph-indent {
        text-indent: 2em;
    }

    .paragraph-wide-gap {
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .paragraph:before {
        /* 解决hover抖动问题 */
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        /* 确保背景不会覆盖文字 */
        background: transparent;
        border-radius: inherit;
        transition: transform 0.3s ease;
    }

    // 弃用(没法使用)
    // .paragraph:hover {
    //     color: black;
    //     transform: translateY(-3px);
    //     text-shadow: 3px 3px 6px rgba(0, 0, 255, 0.15);
    //     transition: transform 0.3s ease;
    // }

    /* 段落行悬停：整体上浮 + 文字变色 */
    .paragraph-row:hover .paragraph {
        color: black;
        transform: translateY(-3px);
        text-shadow: 3px 3px 6px rgba(0, 0, 255, 0.15);
        transition: transform 0.3s ease;
    }
}

.context:hover {
    box-shadow: 3px 6px 6px rgba(0, 0, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.6);
    opacity: 1;
    transition: opacity 0.5s ease;
}
</style>
