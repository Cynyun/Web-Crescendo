<template>
    <div class="converter-content" :style="stylecolor">
        <!-- 第一行：输入区域 -->
        <div class="input-row">
            <div class="input-field">
                <div class="base-selector">
                    <InputSelect v-model="sourceBase"
                        :options="availableBases.map(base => ({ value: base, label: `${base}进制` }))" placeholder="输入进制"
                        @update:modelValue="handleSourceBaseChange" />
                </div>
                <input type="text" v-model="converterInput" class="converter-input" placeholder="输入要转换的数值" />
            </div>
        </div>

        <!-- 第二行：结果区域 -->
        <div class="result-row">
            <div class="result-field">
                <div class="base-selector">
                    <InputSelect v-model="targetBase"
                        :options="availableBases.map(base => ({ value: base, label: `${base}进制` }))" placeholder="输入进制"
                        @update:modelValue="handleTargetBaseChange" />
                </div>
                <div class="result-value">{{ converterResult }}</div>
            </div>
        </div>

        <!-- 数字转换表 -->
        <div class="table-wrapper">
            <el-table :data="numberList" style="width: 100%" height="100%" :row-class-name="rowClassName">
                <el-table-column prop="decimal" label="十进制" width="100" />
                <el-table-column prop="binary" label="二进制" />
                <el-table-column prop="quaternary" label="四进制" />
                <el-table-column prop="octal" label="八进制" />
                <el-table-column prop="hexadecimal" label="十六进制" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InputSelect from '../common/InputSelect.vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { useThemeColorStore } from '../../stores/themecolor';

// 进制转换
const converterInput = ref('');
const sourceBase = ref(10);
const targetBase = ref(2);
const converterResult = ref('');
const converterError = ref('');
const hoveredNumber = ref(-1);
const themeColorStore = useThemeColorStore();

// 颜色
const stylecolor = computed(() => ({
    '--light1': themeColorStore.light1,
    '--lightGrey1': themeColorStore.lightGrey1,
    '--transparentWhite10': themeColorStore.transparentWhite10,
    '--transparentWhite30': themeColorStore.transparentWhite30,
    '--transparentBlack20': themeColorStore.transparentBlack20,
    '--transparentBlack30': themeColorStore.transparentBlack30,
    '--redError': themeColorStore.redError
}));

// 数字列表数据
const numberList = computed(() => {
    return Array.from({ length: 33 }, (_, index) => {
        const num = index;
        return {
            decimal: num.toString(),
            binary: formatNumber(num.toString(2)),
            quaternary: formatNumber(num.toString(4)),
            octal: formatNumber(num.toString(8)),
            hexadecimal: formatNumber(num.toString(16).toUpperCase()),
            num: num
        };
    });
});

// 行样式类
const rowClassName = ({ row }: { row: any }) => {
    return row.num === hoveredNumber.value ? 'highlight' : '';
};

// 基础进制范围 2-32
const baseBases = Array.from({ length: 31 }, (_, i) => i + 2);
// 额外添加的进制
const extraBases = ref<number[]>([]);

// 可用进制列表（基础 + 额外添加的）
const availableBases = computed(() => {
    return [...baseBases, ...extraBases.value].sort((a, b) => a - b);
});

// 处理源进制变化
const handleSourceBaseChange = (value: string | number) => {
    const input = parseInt(value.toString());
    if (!isNaN(input) && input >= 2 && input <= 256) {
        // 如果输入的进制不在基础列表中，添加到额外进制列表
        if (!baseBases.includes(input) && !extraBases.value.includes(input)) {
            extraBases.value.push(input);
        }
        sourceBase.value = input;
    }
};

// 处理目标进制变化
const handleTargetBaseChange = (value: string | number) => {
    const input = parseInt(value.toString());
    if (!isNaN(input) && input >= 2 && input <= 256) {
        // 如果输入的进制不在基础列表中，添加到额外进制列表
        if (!baseBases.includes(input) && !extraBases.value.includes(input)) {
            extraBases.value.push(input);
        }
        targetBase.value = input;
    }
};

// 监听输入和进制变化，实现实时转换
watch([converterInput, sourceBase, targetBase], () => {
    convert();
}, { deep: true });

// 格式化数字，每4位添加一个空格
const formatNumber = (number: string): string => {
    // 分离整数部分和小数部分
    const parts = number.split('.');
    const integerPart = parts[0] || '';
    const fractionalPart = parts[1] || '';

    // 格式化整数部分，每4位添加一个空格
    const reversedInteger = integerPart.split('').reverse().join('');
    const matchedInteger = reversedInteger.match(/[0-9A-Fa-f]{1,4}/g);
    const formattedInteger = matchedInteger ? matchedInteger.join(' ').split('').reverse().join('') : integerPart;

    // 格式化小数部分，每4位添加一个空格
    const matchedFractional = fractionalPart.match(/[0-9A-Fa-f]{1,4}/g);
    const formattedFractional = matchedFractional ? matchedFractional.join(' ') : fractionalPart;

    // 合并结果
    return fractionalPart ? `${formattedInteger}.${formattedFractional}` : formattedInteger;
};

// 进制转换
const convert = () => {
    try {
        const input = converterInput.value.replace(/\s/g, ''); // 移除输入中的空格
        const source = parseInt(sourceBase.value.toString());
        const target = parseInt(targetBase.value.toString());

        // 验证输入是否为空
        if (!input) {
            throw new Error('请输入要转换的数值');
        }

        // 验证输入是否符合源进制要求
        let regex;
        if (source <= 10) {
            regex = new RegExp(`^[0-${source - 1}]+(\.[0-${source - 1}]+)?$`);
        } else {
            const maxChar = String.fromCharCode(65 + Math.min(source - 11, 25)); // 最多支持到 Z (26个字母)
            regex = new RegExp(`^[0-9A-${maxChar}]+(\.[0-9A-${maxChar}]+)?$`, 'i');
        }
        if (!regex.test(input)) {
            throw new Error(`输入值不符合${source}进制要求`);
        }

        // 分离整数部分和小数部分
        const parts = input.split('.');
        const integerPart = parts[0];
        const fractionalPart = parts[1] || '';

        // 转换整数部分为十进制
        let decimalInteger = parseInt(integerPart as string, source);

        // 转换小数部分为十进制
        let decimalFractional = 0;
        for (let i = 0; i < fractionalPart.length; i++) {
            const theChar = fractionalPart[i]!;
            let value;
            if (theChar >= '0' && theChar <= '9') {
                value = parseInt(theChar);
            } else {
                value = theChar.toUpperCase().charCodeAt(0) - 55;
            }
            decimalFractional += value * Math.pow(source, -(i + 1));
        }

        // 转换整数部分为目标进制
        let resultInteger = '';
        if (decimalInteger === 0) {
            resultInteger = '0';
        } else {
            while (decimalInteger > 0) {
                const remainder = decimalInteger % target;
                resultInteger = (remainder < 10 ? remainder : String.fromCharCode(55 + remainder)) + resultInteger;
                decimalInteger = Math.floor(decimalInteger / target);
            }
        }

        // 转换小数部分为目标进制
        let resultFractional = '';
        if (fractionalPart.length > 0) {
            resultFractional = '.';
            let tempFractional = decimalFractional;
            const maxFractionalDigits = 20; // 限制小数位数
            let digits = 0;

            while (tempFractional > 0 && digits < maxFractionalDigits) {
                tempFractional *= target;
                const integerPart = Math.floor(tempFractional);
                resultFractional += (integerPart < 10 ? integerPart : String.fromCharCode(55 + integerPart));
                tempFractional -= integerPart;
                digits++;
            }
        }

        // 合并结果
        const result = resultInteger + resultFractional;

        // 格式化结果，每4位添加一个空格
        converterResult.value = formatNumber(result);
        converterError.value = '';
    } catch (error) {
        converterError.value = error instanceof Error ? error.message : '转换失败，请检查输入';
        converterResult.value = '';
    }
};
</script>

<style scoped lang="scss">
/* 进制转换样式 */
.converter-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 95%;
    height: 100%;

    .table-wrapper {
        flex: 1;
        min-height: 0;
        margin-bottom: 20px;
        overflow: hidden;
    }


    /* 第一行：输入区域 */
    .input-row {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .input-field {
            width: 100%;
            display: flex;
            gap: 10px;
            align-items: center;

            /* 进制选择器 */
            .base-selector {
                width: 150px;
                height: 40px;
            }

            .converter-input {
                flex: 1;
                height: 40px;
                line-height: 40px;
                padding: 0px 10px;
                font-size: 18px;
                border: 1px solid var(--transparentWhite30);
                border-radius: 5px;
                background-color: var(--transparentWhite10);
                color: var(--light1);

                /* 占位符样式 */
                &::placeholder {
                    color: var(--lightGrey1);
                }
            }
        }
    }

    /* 第二行：结果区域 */
    .result-row {
        width: 100%;

        .result-field {
            display: flex;
            gap: 10px;
            align-items: center;

            /* 进制选择器 */
            .base-selector {
                width: 150px;
                height: 40px;
            }

            .result-value {
                flex: 1;
                height: 40px;
                line-height: 40px;
                padding: 0px 10px;
                font-size: 18px;
                font-weight: bold;
                border: 1px solid var(--transparentWhite30);
                border-radius: 5px;
                background-color: var(--transparentBlack20);
                color: var(--light1);
                display: flex;
                align-items: center;
            }
        }
    }

    /* 数字转换表样式 */
    :deep(.el-table) {
        background: transparent;
        border: 1px solid var(--transparentWhite30);
        border-radius: 5px;
        color: var(--light1);

        .el-table__header-wrapper {
            background-color: var(--transparentBlack30);

            th {
                background-color: var(--transparentBlack30) !important;
                color: var(--light1) !important;
                border-bottom: 1px solid var(--transparentWhite30) !important;
                text-align: center !important;
                padding: 0px 12px !important;
            }
        }

        .el-table__body-wrapper {

            /* 隐藏滚动条但保留滚动功能 */
            &::-webkit-scrollbar {
                width: 0;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background: transparent;
            }

            td {
                border-bottom: 1px solid var(--transparentWhite30) !important;
                text-align: center !important;
                padding: 0px 12px !important;
            }
        }

        /* 高亮效果 */
        .el-table__row.highlight {
            background-color: var(--transparentWhite10) !important;
        }

        .el-table__row:hover {
            background-color: var(--transparentWhite10) !important;
        }
    }

    /* 错误信息样式 */
    .error-message {
        color: var(--redError);
        margin: 5px 0;
        text-align: center;
    }
}
</style>