<template>
    <div class="context">
        <div class="paragraph" v-for="(text, index) in props.contexts" :key="index"
            :class="{ 'paragraph-indent': text.indent, 'paragraph-wide-gap': text?.wideGap }">{{ text.text }}</div>
    </div>
</template>

<script setup lang="ts">
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
            text: 'Hello Vue3!'
        }
    ],
})
</script>

<style scoped lang="scss">
.context {
    width: 100%;
    // height: 100%; // 不设置用以自动调整
    min-width: 150px;
    min-height: 110px;
    background-color: rgba(255, 255, 255, 0.20);
    // background-color: rgba(255, 0, 0, 1); // 检查用
    border-radius: 20px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 20px;
    padding: 20px 0; // 确保文本不会碰边  外边控制上下
    margin-bottom: 10px; // 确保下方留有足够空间放置阴影
    opacity: 0.6;
    align-items: flex-start;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .paragraph {
        line-height: 22px;
        font-size: 20px;
        text-align: center;
        color: white;
        position: relative;
        display: inline-block;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        position: relative;
        padding: 0 20px; // 确保文本不会碰边  里面控制上左右  避免挤开grid
    }

    .paragraph-indent {
        text-indent: 2em;
    }

    .paragraph-wide-gap {
        margin-top: 24px;
        margin-bottom: 24px;
    }

    .paragraph:before {
        // 解决hover抖动问题
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

    .paragraph:hover {
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