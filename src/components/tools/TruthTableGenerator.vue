<template>
    <div class="truth-table-content" :style="stylecolor">
        <div class="expressions-container">
            <div v-for="(expr, index) in logicExpressions" :key="index" class="input-group">
                <div class="expression-row">
                    <label>式 {{ index + 1 }}：</label>
                    <input type="text" v-model="expr.expression" class="converter-input"
                        placeholder="输入逻辑代数式，例如：A && B || C" />
                    <Button @click="removeExpression(index)" style="margin-right: 8px;">删除</Button>
                </div>
            </div>
        </div>
        <div class="buttons-row">
            <Button @click="addExpression" style="width: 30%;">添加逻辑代数式</Button>
            <Button @click="generateTruthTable" style="width: 30%;">生成真值表</Button>
            <div class="toggle-switch">
                <input type="checkbox" id="formatToggle" v-model="useBooleanFormat" />
                <label for="formatToggle">{{ useBooleanFormat ? 'T/F' : '1/0' }}</label>
            </div>
        </div>
        <div class="result-area">
            <div v-if="truthTableError" class="error-message">{{ truthTableError }}</div>
            <div v-else-if="truthTable.length > 0" class="truth-table-container">
                <div class="truth-table">
                    <table>
                        <thead>
                            <tr>
                                <th v-for="variable in variables" :key="variable">{{ variable }}</th>
                                <th v-for="(expr, index) in logicExpressions" :key="index">{{
                                    expr.expression }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in truthTable" :key="index">
                                <td v-for="(value, varName) in row.inputs" :key="varName">
                                    {{ useBooleanFormat ? (value ? 'True' : 'False') : (value ? '1' : '0')
                                    }}
                                </td>
                                <td v-for="(result, exprIndex) in row.results" :key="exprIndex">
                                    {{ useBooleanFormat ? (result ? 'True' : 'False') : result }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '../Button.vue';
import { useThemeColorStore } from '../../stores/themecolor';

// 真值表生成
const logicExpressions = ref<{ expression: string }[]>([{ expression: '' }]);
const truthTable = ref<any[]>([]);
const variables = ref<string[]>([]);
const truthTableError = ref('');
const useBooleanFormat = ref(false);
const themeColorStore = useThemeColorStore();

// 颜色
const stylecolor = computed(() => ({
    '--light1': themeColorStore.light1,
    '--lightGrey1': themeColorStore.lightGrey1,
    '--transparentWhite10': themeColorStore.transparentWhite10,
    '--transparentWhite30': themeColorStore.transparentWhite30,
    '--transparentWhite40': themeColorStore.transparentWhite40,
    '--transparentBlack10': themeColorStore.transparentBlack10,
    '--transparentBlack20': themeColorStore.transparentBlack20,
    '--transparentBlack30': themeColorStore.transparentBlack30,
    '--redError': themeColorStore.redError
}));

// 添加逻辑代数式
const addExpression = () => {
    logicExpressions.value.push({ expression: '' });
};

// 删除逻辑代数式
const removeExpression = (index: number) => {
    // 清除式子
    logicExpressions.value[index]!.expression = '';
    // 如果多余一个就删除
    if (logicExpressions.value.length > 1) {
        logicExpressions.value.splice(index, 1);
    }
};

// 生成真值表
const generateTruthTable = () => {
    try {
        // 过滤掉空的表达式
        const validExpressions = logicExpressions.value.filter(expr => expr.expression.trim() !== '');
        if (validExpressions.length === 0) {
            throw new Error('请至少输入一个逻辑代数式');
        }

        // 提取所有变量
        const variableSet = new Set<string>();
        validExpressions.forEach(expr => {
            for (let char of expr.expression) {
                if (/[A-Za-z]/.test(char) && !['&&', '||', '!', '(', ')', ' '].includes(char)) {
                    variableSet.add(char.toUpperCase());
                }
            }
        });

        const variableArray = Array.from(variableSet).sort();
        variables.value = variableArray;

        if (variableArray.length === 0) {
            throw new Error('逻辑代数式中没有变量');
        }

        if (variableArray.length > 10) {
            throw new Error('变量数量不能超过10个');
        }

        // 生成所有可能的输入组合
        const combinations = generateCombinations(variableArray.length);
        const table = [];

        for (const combination of combinations) {
            // 创建变量映射
            const variableMap: Record<string, boolean> = {};
            variableArray.forEach((varName, index) => {
                variableMap[varName] = combination[index] as boolean;
            });

            // 计算每个表达式的结果
            const results = validExpressions.map(expr => {
                // 替换表达式中的变量为布尔值
                let processedExpression = expr.expression;
                for (const [varName, value] of Object.entries(variableMap)) {
                    const regex = new RegExp(`\\b${varName}\\b`, 'gi');
                    processedExpression = processedExpression.replace(regex, value.toString());
                }

                // 计算结果
                const result = eval(processedExpression);
                return result ? 1 : 0;
            });

            table.push({
                inputs: variableMap,
                results: results
            });
        }

        truthTable.value = table;
        truthTableError.value = '';
    } catch (error) {
        truthTableError.value = error instanceof Error ? error.message : '生成真值表失败，请检查输入';
        truthTable.value = [];
        variables.value = [];
    }
};

// 生成二进制组合
const generateCombinations = (length: number): boolean[][] => {
    const combinations: boolean[][] = [];
    const total = Math.pow(2, length);

    for (let i = 0; i < total; i++) {
        const binary = i.toString(2).padStart(length, '0');
        const combination = binary.split('').map(bit => bit === '1');
        combinations.push(combination);
    }

    return combinations;
};
</script>

<style scoped lang="scss">
/* 真值表样式 */
.truth-table-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    flex: 1;
    margin: 10px;

    /* 表达式容器样式 */
    .expressions-container {
        min-height: 42px;
        max-height: 120px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        border-radius: 5px;
        border: 1px solid var(--transparentWhite30);
        padding: 10px;

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

        .input-group {
            gap: 10px;
        }
    }

    /* 为表达式容器的最后一行（非第一行）添加margin-bottom */
    .expressions-container .input-group:not(:first-child):last-child {
        margin-bottom: 5px;
    }

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

    /* 表达式行样式 */
    .expression-row {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        /* 标签样式 */
        label {
            width: 60px;
            color: var(--light1);
            font-size: 18px;
            line-height: 20px;
            margin-left: 10px;
        }

        /* 输入框样式 */
        .converter-input {
            flex: 1;
            line-height: 36px;
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

/* 按钮行样式 */
.buttons-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    height: 8%;
    align-items: center;

    /* 开关样式 */
    .toggle-switch {
        display: flex;
        align-items: center;
        gap: 10px;

        /* 复选框样式 */
        input[type="checkbox"] {
            position: relative;
            width: 60px;
            height: 30px;
            -webkit-appearance: none;
            appearance: none;
            background: var(--transparentWhite10);
            outline: none;
            border-radius: 15px;
            transition: .4s;
            cursor: pointer;

            /* 选中状态 */
            &:checked {
                background: var(--transparentWhite40);
            }

            /* 开关滑块 */
            &:before {
                content: '';
                position: absolute;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                top: 2px;
                left: 2px;
                background: var(--light1);
                transition: .4s;
            }

            /* 选中状态下滑块位置 */
            &:checked:before {
                left: 32px;
            }
        }

        /* 开关标签样式 */
        label {
            color: var(--light1);
            font-size: 16px;
            cursor: pointer;
        }
    }
}

/* 结果区域样式 */
.result-area {
    background-color: var(--transparentBlack20);
    border-radius: 5px;
    line-height: 24px;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    padding: 10px;

    /* 错误信息样式 */
    .error-message {
        color: var(--redError);
        margin-bottom: 10px;
    }

    /* 真值表容器样式 */
    .truth-table-container {
        max-height: 100%;
        height: 100%;
        overflow-y: auto;
        margin: 0px auto 10px auto;
        border-radius: 5px;
        border: 1px solid var(--transparentWhite30);
        width: 100%;

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

        /* 真值表样式 */
        .truth-table {
            overflow-x: auto;

            /* 隐藏水平滚动条但保留滚动功能 */
            &::-webkit-scrollbar {
                height: 0;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background: transparent;
            }

            /* 表格样式 */
            table {
                width: 100%;
                border-collapse: collapse;
                color: var(--light1);
                font-size: 16px;

                /* 表头样式 */
                th {
                    padding: 5px 12px;
                    text-align: center;
                    border: 1px solid var(--transparentWhite30);
                    background-color: var(--transparentBlack30);
                    font-weight: bold;
                    font-size: 16px;
                }

                /* 单元格样式 */
                td {
                    padding: 5px 12px;
                    text-align: center;
                    border: 1px solid var(--transparentWhite30);
                    font-size: 16px;
                }

                /* 偶数行样式 */
                tr:nth-child(even) {
                    background-color: var(--transparentBlack10);
                }

                /* 悬停效果 */
                tr:hover {
                    background-color: var(--transparentBlack20);
                }
            }
        }
    }
}
</style>