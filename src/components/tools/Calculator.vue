<template>
    <div class="calculator-content" :style="stylecolor">
        <div class="input-area">
            <input type="text" v-model="calculatorInput" class="calculator-input" placeholder="输入算式，例如：1+2*3"
                @keyup.enter="calculate" />
            <NewButton class="calculate-button" @click="calculate">计算</NewButton>
        </div>

        <div class="main-content">
            <!-- 左侧：进制转换 -->
            <div class="left-panel">
                <h4>进制转换</h4>
                <!-- 进制选择 -->
                <div class="base-selector">
                    <InputSelect v-model="inputBase" :options="[
                        { value: '2', label: '二进制' },
                        { value: '8', label: '八进制' },
                        { value: '10', label: '十进制' },
                        { value: '16', label: '十六进制' }
                    ]" placeholder="选择进制" />
                </div>
                <div class="conversion-area">
                    <div class="conversion-row">
                        <div class="conversion-item">
                            <span class="conversion-label">HEX:</span>
                            <span class="conversion-value">{{ hexValue }}</span>
                        </div>
                    </div>
                    <div class="conversion-row">
                        <div class="conversion-item">
                            <span class="conversion-label">DEC:</span>
                            <span class="conversion-value">{{ decValue }}</span>
                        </div>
                    </div>
                    <div class="conversion-row">
                        <div class="conversion-item">
                            <span class="conversion-label">OCT:</span>
                            <span class="conversion-value">{{ octValue }}</span>
                        </div>
                    </div>
                    <div class="conversion-row">
                        <div class="conversion-item">
                            <span class="conversion-label">BIN:</span>
                            <span class="conversion-value">{{ binValue }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧：运算按钮 -->
            <div class="right-panel">
                <div class="result-area">
                    <div class="result-value">{{ calculatorResult }}</div>
                    <div v-if="calculatorError" class="error-message">{{ calculatorError }}</div>
                </div>

                <div class="button-grid">
                    <!-- 动态渲染按钮 -->
                    <button v-for="(btn, index) in calculatorButtons" :key="index"
                        :class="['calc-button', `${btn.type}-button`]" @click="handleButtonClick(btn)"
                        v-html="btn.label"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import InputSelect from '../common/InputSelect.vue';
import NewButton from '../Button.vue';
import { useThemeColorStore } from '../../stores/themecolor';

// 四则运算
const calculatorInput = ref('');
const calculatorResult = ref('');
const calculatorError = ref('');
const themeColorStore = useThemeColorStore();

// 颜色
const stylecolor = computed(() => ({
    '--light1': themeColorStore.light1,
    '--lightGrey1': themeColorStore.lightGrey1,
    '--transparentWhite10': themeColorStore.transparentWhite10,
    '--transparentBlack20': themeColorStore.transparentBlack20,
    '--transparentBlack30': themeColorStore.transparentBlack30,
    '--transparentOrange50': themeColorStore.transparentOrange50,
    '--transparentGrey50': themeColorStore.transparentGrey50,
    '--transparentBlue50': themeColorStore.transparentBlue50,
    '--redError': themeColorStore.redError
}));
// 进制转换
const hexValue = ref('0');
const decValue = ref('0');
const octValue = ref('0');
const binValue = ref('0');
const inputBase = ref(10);

// 按钮定义
const calculatorButtons = [
    // 第一行：功能按钮
    { label: 'C', type: 'function', action: 'clear' },
    { label: '&larr;', type: 'function', action: 'backspace' },
    { label: '(', type: 'function', action: 'add', value: '(' },
    { label: ')', type: 'function', action: 'add', value: ')' },
    { label: '%', type: 'operator', action: 'add', value: '%' },

    // 第二行：科学计算
    { label: '√', type: 'function', action: 'sqrt' },
    { label: 'x²', type: 'function', action: 'square' },
    { label: 'x³', type: 'function', action: 'cube' },
    { label: '1/x', type: 'function', action: 'reciprocal' },
    { label: '/', type: 'operator', action: 'add', value: '/' },

    // 第三行：数字 7-9 + 乘号
    { label: '7', type: 'number', action: 'add', value: '7' },
    { label: '8', type: 'number', action: 'add', value: '8' },
    { label: '9', type: 'number', action: 'add', value: '9' },
    { label: 'A', type: 'number', action: 'add', value: 'A' },
    { label: '*', type: 'operator', action: 'add', value: '*' },

    // 第四行：数字 4-6 + 减号
    { label: '4', type: 'number', action: 'add', value: '4' },
    { label: '5', type: 'number', action: 'add', value: '5' },
    { label: '6', type: 'number', action: 'add', value: '6' },
    { label: 'B', type: 'number', action: 'add', value: 'B' },
    { label: '-', type: 'operator', action: 'add', value: '-' },

    // 第五行：数字 1-3 + 加号
    { label: '1', type: 'number', action: 'add', value: '1' },
    { label: '2', type: 'number', action: 'add', value: '2' },
    { label: '3', type: 'number', action: 'add', value: '3' },
    { label: 'C', type: 'number', action: 'add', value: 'C' },
    { label: '+', type: 'operator', action: 'add', value: '+' },

    // 第六行：0, ., +/- + 等号
    { label: '0', type: 'number', action: 'add', value: '0' },
    { label: '.', type: 'number', action: 'add', value: '.' },
    { label: '+/-', type: 'function', action: 'toggleSign' },
    { label: 'D', type: 'number', action: 'add', value: 'D' },
    { label: '=', type: 'equals', action: 'calculate' },

    // 第七行：E, F
    { label: 'E', type: 'number', action: 'add', value: 'E' },
    { label: 'F', type: 'number', action: 'add', value: 'F' }
];

// 监听输入变化，更新进制转换
watch(calculatorInput, (newValue) => {
    updateConversionValues(newValue);
});

// 监听进制变化，更新进制转换
watch(inputBase, () => {
    updateConversionValues(calculatorInput.value);
});

// 更新进制转换值
const updateConversionValues = (input: string) => {
    try {
        if (!input) {
            hexValue.value = '0';
            decValue.value = '0';
            octValue.value = '0';
            binValue.value = '0';
            return;
        }

        let value: number;

        // 根据选择的进制解析输入值
        if (inputBase.value === 10) {
            // 十进制：尝试计算表达式
            const processedExpression = input
                .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
                .replace(/\(([^)]+)\)\^2/g, 'Math.pow($1, 2)')
                .replace(/\(([^)]+)\)\^3/g, 'Math.pow($1, 3)')
                .replace(/1\/\(([^)]+)\)/g, '1/($1)');

            value = eval(processedExpression);
        } else {
            // 其他进制：直接解析数值
            // 移除表达式中的非数字字符
            const cleanInput = input.replace(/[^0-9A-Fa-f]/g, '');
            if (cleanInput) {
                value = parseInt(cleanInput, inputBase.value);
            } else {
                value = 0;
            }
        }

        if (typeof value === 'number' && isFinite(value)) {
            // 只处理整数
            if (Number.isInteger(value)) {
                const intValue = Math.abs(value);
                hexValue.value = formatNumberWithSpaces(intValue.toString(16).toUpperCase(), 4);
                decValue.value = formatNumberWithSpaces(intValue.toString(), 4);
                octValue.value = formatNumberWithSpaces(intValue.toString(8), 4);
                binValue.value = formatNumberWithSpaces(intValue.toString(2), 4);
            } else {
                // 对于非整数，只显示十进制
                hexValue.value = 'N/A';
                decValue.value = value.toString();
                octValue.value = 'N/A';
                binValue.value = 'N/A';
            }
        } else {
            hexValue.value = 'N/A';
            decValue.value = 'N/A';
            octValue.value = 'N/A';
            binValue.value = 'N/A';
        }
    } catch (error) {
        // 如果表达式无效，保持当前值
    }
};

// 添加输入到计算器
const addCalculatorInput = (value: string) => {
    calculatorInput.value += value;
};

// 清除输入
const clearInput = () => {
    calculatorInput.value = '';
    calculatorResult.value = '';
    calculatorError.value = '';
};

// 退格
const backspace = () => {
    calculatorInput.value = calculatorInput.value.slice(0, -1);
};

// 切换正负号
const toggleSign = () => {
    if (!calculatorInput.value) return;

    if (calculatorInput.value.startsWith('-')) {
        calculatorInput.value = calculatorInput.value.substring(1);
    } else {
        calculatorInput.value = '-' + calculatorInput.value;
    }
};

// 处理按钮点击
const handleButtonClick = (btn: any) => {
    switch (btn.action) {
        case 'add':
            addCalculatorInput(btn.value);
            break;
        case 'clear':
            clearInput();
            break;
        case 'backspace':
            backspace();
            break;
        case 'sqrt':
            calculateSquareRoot();
            break;
        case 'square':
            calculateSquare();
            break;
        case 'cube':
            calculateCube();
            break;
        case 'reciprocal':
            calculateReciprocal();
            break;
        case 'toggleSign':
            toggleSign();
            break;
        case 'calculate':
            calculate();
            break;
        default:
            break;
    }
};

// 格式化数字，每4个字符添加一个空格
const formatNumberWithSpaces = (number: string, chunkSize: number): string => {
    // 从右向左每chunkSize个字符添加一个空格
    return number.split('').reverse().join('')
        .match(new RegExp(`.{1,${chunkSize}}`, 'g'))?.join(' ')
        .split('').reverse().join('') || number;
};

// 计算平方根
const calculateSquareRoot = () => {
    try {
        if (calculatorInput.value) {
            // 处理输入表达式中的特殊符号
            const expression = calculatorInput.value;
            const processedExpression = expression
                .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
                .replace(/\(([^)]+)\)\^2/g, 'Math.pow($1, 2)')
                .replace(/\(([^)]+)\)\^3/g, 'Math.pow($1, 3)')
                .replace(/1\/\(([^)]+)\)/g, '1/($1)');

            const value = eval(processedExpression);
            const result = Math.sqrt(value);

            // 更新输入框显示根号符号
            calculatorInput.value = `√(${calculatorInput.value})`;

            // 处理结果显示
            if (typeof result === 'number') {
                if (isFinite(result)) {
                    const resultStr = result.toString();
                    if (resultStr.length > 15) {
                        calculatorResult.value = result.toExponential(10);
                    } else {
                        calculatorResult.value = resultStr;
                    }
                } else {
                    calculatorResult.value = result.toString();
                }
            } else {
                calculatorResult.value = (result as string).toString();
            }

            calculatorError.value = '';
        } else {
            calculatorError.value = '请先输入数值';
            calculatorResult.value = '';
        }
    } catch (error) {
        calculatorError.value = error instanceof Error ? error.message : '输入的算式有误，请检查后重新输入';
        calculatorResult.value = '';
    }
};

// 计算平方
const calculateSquare = () => {
    try {
        if (calculatorInput.value) {
            // 处理输入表达式中的特殊符号
            const expression = calculatorInput.value;
            const processedExpression = expression
                .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
                .replace(/\(([^)]+)\)\^2/g, 'Math.pow($1, 2)')
                .replace(/\(([^)]+)\)\^3/g, 'Math.pow($1, 3)')
                .replace(/1\/\(([^)]+)\)/g, '1/($1)');

            const value = eval(processedExpression);
            const result = Math.pow(value, 2);

            // 更新输入框显示平方符号
            calculatorInput.value = `(${calculatorInput.value})^2`;

            // 处理结果显示
            if (typeof result === 'number') {
                if (Number.isInteger(result) && (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER)) {
                    calculatorResult.value = result.toString();
                } else if (isFinite(result)) {
                    const resultStr = result.toString();
                    if (resultStr.length > 15) {
                        calculatorResult.value = result.toExponential(10);
                    } else {
                        calculatorResult.value = resultStr;
                    }
                } else {
                    calculatorResult.value = result.toString();
                }
            } else {
                calculatorResult.value = (result as string).toString();
            }

            calculatorError.value = '';
        } else {
            calculatorError.value = '请先输入数值';
            calculatorResult.value = '';
        }
    } catch (error) {
        calculatorError.value = error instanceof Error ? error.message : '输入的算式有误，请检查后重新输入';
        calculatorResult.value = '';
    }
};

// 计算立方
const calculateCube = () => {
    try {
        if (calculatorInput.value) {
            // 处理输入表达式中的特殊符号
            const expression = calculatorInput.value;
            const processedExpression = expression
                .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
                .replace(/\(([^)]+)\)\^2/g, 'Math.pow($1, 2)')
                .replace(/\(([^)]+)\)\^3/g, 'Math.pow($1, 3)')
                .replace(/1\/\(([^)]+)\)/g, '1/($1)');

            const value = eval(processedExpression);
            const result = Math.pow(value, 3);

            // 更新输入框显示立方符号
            calculatorInput.value = `(${calculatorInput.value})^3`;

            // 处理结果显示
            if (typeof result === 'number') {
                if (Number.isInteger(result) && (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER)) {
                    calculatorResult.value = result.toString();
                } else if (isFinite(result)) {
                    const resultStr = result.toString();
                    if (resultStr.length > 15) {
                        calculatorResult.value = result.toExponential(10);
                    } else {
                        calculatorResult.value = resultStr;
                    }
                } else {
                    calculatorResult.value = result.toString();
                }
            } else {
                calculatorResult.value = (result as string).toString();
            }

            calculatorError.value = '';
        } else {
            calculatorError.value = '请先输入数值';
            calculatorResult.value = '';
        }
    } catch (error) {
        calculatorError.value = error instanceof Error ? error.message : '输入的算式有误，请检查后重新输入';
        calculatorResult.value = '';
    }
};

// 计算倒数
const calculateReciprocal = () => {
    try {
        if (calculatorInput.value) {
            // 处理输入表达式中的特殊符号
            const expression = calculatorInput.value;
            const processedExpression = expression
                .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
                .replace(/\(([^)]+)\)\^2/g, 'Math.pow($1, 2)')
                .replace(/\(([^)]+)\)\^3/g, 'Math.pow($1, 3)')
                .replace(/1\/\(([^)]+)\)/g, '1/($1)');

            const value = eval(processedExpression);
            if (value === 0) {
                throw new Error('除数不能为零');
            }
            const result = 1 / value;

            // 更新输入框显示倒数符号
            calculatorInput.value = `1/(${calculatorInput.value})`;

            // 处理结果显示
            if (typeof result === 'number') {
                if (isFinite(result)) {
                    const resultStr = result.toString();
                    if (resultStr.length > 15) {
                        calculatorResult.value = result.toExponential(10);
                    } else {
                        calculatorResult.value = resultStr;
                    }
                } else {
                    calculatorResult.value = result.toString();
                }
            } else {
                calculatorResult.value = (result as string).toString();
            }

            calculatorError.value = '';
        } else {
            calculatorError.value = '请先输入数值';
            calculatorResult.value = '';
        }
    } catch (error) {
        calculatorError.value = error instanceof Error ? error.message : '输入的算式有误，请检查后重新输入';
        calculatorResult.value = '';
    }
};

// 计算四则运算
const calculate = () => {
    try {
        // 处理超大值的计算
        const expression = calculatorInput.value;
        // 替换特殊符号为JavaScript可执行的表达式
        const processedExpression = expression
            .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
            .replace(/\(([^)]+)\)\^2/g, 'Math.pow($1, 2)')
            .replace(/\(([^)]+)\)\^3/g, 'Math.pow($1, 3)')
            .replace(/1\/\(([^)]+)\)/g, '1/($1)');

        // 使用eval计算，实际项目中应使用更安全的计算方法
        const result = eval(processedExpression);

        // 处理结果显示
        if (typeof result === 'number') {
            // 检查是否为整数且超过安全整数范围
            if (Number.isInteger(result) && (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER)) {
                // 对于超大整数，使用字符串形式显示
                calculatorResult.value = result.toString();
            } else if (isFinite(result)) {
                // 对于有限数字，检查是否需要科学记数法
                const resultStr = result.toString();
                if (resultStr.length > 15) {
                    // 对于较长的数字，使用科学记数法
                    calculatorResult.value = result.toExponential(10);
                } else {
                    // 否则正常显示
                    calculatorResult.value = resultStr;
                }
            } else {
                // 处理无穷大或NaN
                calculatorResult.value = result.toString();
            }
        } else {
            calculatorResult.value = result.toString();
        }

        calculatorError.value = '';
    } catch (error) {
        calculatorError.value = error instanceof Error ? error.message : '输入的算式有误，请检查后重新输入';
        calculatorResult.value = '';
    }
};
</script>

<style scoped lang="scss">
/* 四则运算样式 */
.calculator-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    gap: 10px;

    /* 输入区域样式 */
    .input-area {
        width: 100%;
        min-width: 360px;
        display: flex;
        margin-top: 10px;
        gap: 10px;

        /* 计算器输入框样式 */
        .calculator-input {
            width: 100%;
            flex: 1;
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

    /* 主内容区域 */
    .main-content {
        display: flex;
        gap: 20px;
        width: 100%;
        margin: 10px 0;

        /* 左侧面板 */
        .left-panel {
            flex: 1;
            background-color: var(--transparentBlack20);
            border-radius: 5px;
            padding: 15px;

            h4 {
                color: var(--light1);
                margin-top: 0;
                margin-bottom: 15px;
                text-align: center;
            }

            /* 进制转换显示区域 */
            .conversion-area {
                width: 100%;

                /* 转换行样式 */
                .conversion-row {
                    margin-bottom: 10px;

                    /* 转换项样式 */
                    .conversion-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        /* 标签样式 */
                        .conversion-label {
                            color: var(--lightGrey1);
                            font-size: 14px;
                            font-weight: bold;
                        }

                        /* 值样式 */
                        .conversion-value {
                            color: var(--light1);
                            font-size: 14px;
                            margin-left: 5px;
                            font-family: 'Courier New', monospace;
                        }
                    }
                }
            }
        }

        /* 右侧面板 */
        .right-panel {
            flex: 3;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }

    /* 结果区域样式 */
    .result-area {
        width: 100%;
        max-height: 120px;
        min-height: 36px;
        background-color: var(--transparentBlack20);
        border-radius: 5px;
        line-height: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        /* 结果值样式 */
        .result-value {
            font-size: 24px;
            color: var(--light1);
            font-weight: bold;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        /* 错误信息样式 */
        .error-message {
            color: var(--redError);
            margin-bottom: 10px;
        }
    }

    /* 按钮网格样式 */
    .button-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        min-height: 300px;
        margin-bottom: 10px;

        /* 计算器按钮样式 */
        .calc-button {
            font-size: 20px;
            font-weight: bold;
            border: none;
            border-radius: 5px;
            color: var(--light1);
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 15px;

            /* 悬停效果 */
            &:hover {
                opacity: 0.8;
            }
        }

        /* 数字按钮样式 */
        .number-button {
            background-color: var(--transparentWhite10);
        }

        /* 操作符按钮样式 */
        .operator-button {
            background-color: var(--transparentOrange50);
        }

        /* 功能按钮样式 */
        .function-button {
            background-color: var(--transparentGrey50);
        }

        /* 等号按钮样式 */
        .equals-button {
            background-color: var(--transparentBlue50);
        }
    }
}
</style>