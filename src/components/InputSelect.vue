<template>
    <div class="input-select-wrapper" @mouseenter="isDropdownOpen = true" @mouseleave="isDropdownOpen = false"
        ref="wrapperRef">
        <div class="input-select-container">
            <input type="text" v-model="localInput" class="input-select-input" :placeholder="placeholder"
                @input="handleInput" :style="{
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.borderColor,
                    color: colors.textColor
                }" />
            <div class="input-select-arrow" :class="{ 'open': isDropdownOpen, 'up': isDropdownUp }" :style="{
                color: colors.arrowColor
            }">▼</div>
        </div>
        <div v-show="isDropdownOpen" class="input-select-dropdown" :class="{ 'dropdown-up': isDropdownUp }" :style="{
            backgroundColor: colors.dropdownBackground,
            borderColor: colors.borderColor
        }">
            <div v-for="option in options" :key="option.value" class="input-select-option"
                @click="selectOption(option.value)" :style="{
                    color: colors.textColor
                }">
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import { useThemeColorStore } from '../stores/themecolor';

// 定义组件属性
const props = defineProps<{
    modelValue: string | number;
    options: Array<{
        value: string | number;
        label: string;
    }>;
    placeholder?: string;
}>();

// 定义事件
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();

// 本地状态
const localValue = ref(props.modelValue);
const localInput = ref(props.modelValue.toString());
const isDropdownOpen = ref(false);
const isDropdownUp = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

// 主题颜色
const themeStore = useThemeColorStore();

// 计算颜色值
const colors = computed(() => ({
    inputBackground: 'rgba(255, 255, 255, 0.1)',
    borderColor: themeStore.lightGrey2,
    textColor: themeStore.light1,
    placeholderColor: 'rgba(255, 255, 255, 0.5)',
    dropdownBackground: 'rgba(0, 0, 0, 0.8)',
    optionHoverBackground: 'rgba(255, 255, 255, 0.1)',
    arrowColor: themeStore.light1
}));

// 检测下拉菜单位置
const checkDropdownPosition = () => {
    if (!wrapperRef.value) return;

    const rect = wrapperRef.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 200; // 与CSS中的max-height一致

    // 如果下拉菜单会超出屏幕底部，则显示在上方
    if (rect.bottom + dropdownHeight > viewportHeight) {
        isDropdownUp.value = true;
    } else {
        isDropdownUp.value = false;
    }
};

// 监听下拉菜单打开状态
watch(isDropdownOpen, (newValue) => {
    if (newValue) {
        nextTick(() => {
            checkDropdownPosition();
        });
    }
});

// 窗口大小变化时重新检测
onMounted(() => {
    window.addEventListener('resize', checkDropdownPosition);
});

// 清理事件监听
const cleanup = () => {
    window.removeEventListener('resize', checkDropdownPosition);
};

// 组件卸载时清理
watch(() => props, cleanup, { once: true });

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
    localValue.value = newValue;
    localInput.value = newValue.toString();
});

// 处理输入事件
const handleInput = () => {
    const value = localInput.value;
    emit('update:modelValue', value);
    localValue.value = value;
};

// 选择选项
const selectOption = (value: string | number) => {
    localValue.value = value;
    localInput.value = value.toString();
    emit('update:modelValue', value);
    isDropdownOpen.value = false;
};
</script>

<style scoped lang="scss">
.input-select-wrapper {
    position: relative;
    width: 100%;

    .input-select-container {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        z-index: 1;

        .input-select-input {
            width: 90%;
            flex: 1;
            height: 40px;
            line-height: 40px;
            padding: 0px 30px 0px 10px;
            font-size: 18px;
            border: 1px solid;
            border-radius: 5px;
            cursor: pointer;

            &::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
        }

        .input-select-arrow {
            width: 10%;
            position: absolute;
            right: 10px;
            font-size: 10px;
            pointer-events: none;
            z-index: 2;
        }
    }

    .input-select-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid;
        border-radius: 0 0 5px 5px;
        z-index: 10;
        margin-top: 2px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

        /* 隐藏滚动条但保留滚动功能 */
        &::-webkit-scrollbar {
            width: 0;
        }

        .input-select-option {
            padding: 8px 10px;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }

    /* 确保鼠标从输入框移动到下拉菜单时不会触发mouseleave */
    &:hover .input-select-dropdown {
        display: block;
    }

    .input-select-arrow {
        transition: transform 0.2s ease;

        &.open {
            transform: rotate(180deg);
        }

        &.up {
            transform: rotate(0deg);
        }
    }

    .input-select-dropdown {
        &.dropdown-up {
            top: auto;
            bottom: 100%;
            margin-top: 0;
            margin-bottom: 2px;
            border-radius: 5px 5px 0 0;
        }
    }
}
</style>