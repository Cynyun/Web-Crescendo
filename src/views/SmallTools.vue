<template>
    <div class="calculator-container" :style="navStyle">
        <div class="tab-container">
            <div class="tab-buttons">
                <button :class="['tab-button', { active: activeTab === 'calculator' }]"
                    @click="activeTab = 'calculator'">
                    计算器
                </button>
                <button :class="['tab-button', { active: activeTab === 'converter' }]" @click="activeTab = 'converter'">
                    进制转换
                </button>
                <button :class="['tab-button', { active: activeTab === 'truthTable' }]"
                    @click="activeTab = 'truthTable'">
                    真值表
                </button>
            </div>

            <div class="tab-content">
                <!-- 计算器 -->
                <Calculator v-if="activeTab == 'calculator'" />

                <!-- 进制转换 -->
                <BaseConverter v-else-if="activeTab === 'converter'" />

                <!-- 真值表生成 -->
                <TruthTableGenerator v-else-if="activeTab === 'truthTable'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Calculator from '../components/tools/Calculator.vue';
import BaseConverter from '../components/tools/BaseConverter.vue';
import TruthTableGenerator from '../components/tools/TruthTableGenerator.vue';
import { useThemeColorStore } from '../stores/themecolor';

// 标签切换
const activeTab = ref('calculator');
const themeColorStore = useThemeColorStore();

// 计算样式 - 使用CSS变量
const navStyle = computed(() => ({
    '--light1': themeColorStore.light1,
    '--transparentWhite10': themeColorStore.transparentWhite10,
    '--transparentBlack30': themeColorStore.transparentBlack30
}));
</script>

<style scoped lang="scss">
/* 主容器样式 */
.calculator-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--transparentWhite10);
    border-radius: 10px;
    overflow: hidden;

    /* 标题样式 */
    h1 {
        color: var(--light1);
        font-size: 28px;
        margin-bottom: 10px;
    }

    /* 标签容器样式 */
    .tab-container {
        width: 95%;
        max-height: 95%;
        height: 650px;
        background-color: var(--transparentWhite10);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        /* 标签按钮样式 */
        .tab-buttons {
            height: 48px;
            display: flex;
            background-color: var(--transparentBlack30);

            /* 单个标签按钮样式 */
            .tab-button {
                flex: 1;
                background: transparent;
                border: none;
                color: var(--light1);
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                line-height: 48px;
                font-size: 20px;

                /* 悬停效果 */
                &:hover {
                    background-color: var(--transparentWhite10);
                }

                /* 激活状态 */
                &.active {
                    background-color: var(--transparentWhite10);
                    font-weight: bold;
                }
            }
        }

        /* 标签内容样式 */
        .tab-content {
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
        }
    }
}
</style>