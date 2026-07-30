<template>
    <div class="test-container">
        <div class="header-row">
            <h2>随机内容生成</h2>
            <NewButton class="add-button" @click="addParagraph">生成段落</NewButton>
        </div>
        <TextCard :contexts="Test3Content" class="textclass"></TextCard>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TextCard from '@/components/TextCard.vue';
import NewButton from '@/components/Button.vue';
import { randomStrlist, mixedSentencePool } from '@/utils/RandomStr';

// TextCard 的 ContextItem 接口
interface ContextItem {
    text?: string
    indent?: boolean
    wideGap?: boolean
    showbackground?: boolean
}

// 随机整数
const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 随机打乱数组并取前 n 个
const pickRandom = <T>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

// 生成一个随机段落
const generateParagraph = (): ContextItem => {
    const sentenceCount = randomInt(3, 8)
    const selected = pickRandom(mixedSentencePool, sentenceCount)
    const text = selected.join(' ')

    return {
        text,
        indent: Math.random() > 0.5,
        wideGap: Math.random() > 0.7,
        showbackground: Math.random() > 0.3,
    }
}

// 初始化：从 randomStrlist 加载，不足时自动补生成
const initialParagraphs: ContextItem[] = [
    ...randomStrlist.value.map(item => ({
        text: item.text,
        indent: item.indent,
        wideGap: item.wideGap,
        showbackground: item.showbackground,
    })),
    // 额外补几个随机段落到初始列表
    ...Array.from({ length: 2 }, () => generateParagraph()),
]

const paragraphList = ref<ContextItem[]>(initialParagraphs)

// 计算 TextCard 所需格式
const Test3Content = computed(() =>
    paragraphList.value.map(item => ({
        text: item.text,
        indent: item.indent,
        wideGap: item.wideGap,
        showbackground: item.showbackground,
    }))
)

// 新增段落
const addParagraph = () => {
    paragraphList.value = [...paragraphList.value, generateParagraph()]
}
</script>

<style scoped lang="scss">
.test-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    gap: 10px;
    // padding: 20px; // 不要添加padding，避免影响TextCard的布局
    box-sizing: border-box;
}

.textclass {
    width: 100%;
    flex: 1;
    min-height: 0;
    overflow: auto;
}

.header-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 10px;
}

h2 {
    color: var(--color-cyan-light);
}

.add-button {
    position: absolute;
    right: 10px;
    flex-shrink: 0;
}
</style>
