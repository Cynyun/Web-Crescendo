<!-- src/components/GradientButton.vue -->
<template>
    <button class="gradient-button" :class="{ 'gradient-button--disabled': disabled || loading }"
        :disabled="disabled || loading" @click="handleClick">
        <span>
            <slot>{{ loading ? '加载中...' : '按钮' }}</slot>
        </span>
    </button>
</template>

<script setup lang="ts">
// 定义 props
const props = defineProps<{
    disabled?: boolean
    loading?: boolean
}>()

// 定义 emit
const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
}>()

// 点击处理函数
const handleClick = (event: MouseEvent) => {
    // 正确方式：直接使用 props，不用 this
    if (props.disabled || props.loading) return
    emit('click', event)
}
</script>

<style scoped>
.gradient-button {
    align-items: center;
    background-image: linear-gradient(90deg, var(--color-green-defaultGrey), var(--color-cyan-defaultGrey));
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    /* color: rgb(220, 220, 220); */

    background: linear-gradient(90deg, var(--color-green-lightGrey), var(--color-cyan-lightGrey));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    display: flex;
    font-size: 16px;
    justify-content: center;
    line-height: 16px;
    max-width: 100%;
    min-width: 50px;
    min-height: 36px;
    width: 80px;
    height: 36px;
    padding: 3px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
}

.gradient-button:hover,
.gradient-button:active {
    background: linear-gradient(90deg,
            var(--color-green-darkGrey),
            var(--color-cyan-darkGrey),
            var(--color-green-darkGrey),
            var(--color-cyan-darkGrey));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    background-size: 300% 100%;
    animation: spanAni 2s infinite linear;
    outline: 0;
    border: 2px solid white;
}

@keyframes spanAni {
    from {
        background-position: 0% 0%;
    }

    to {
        background-position: 100% 0%;
    }
}

.gradient-button span {
    background-color: linear-gradient(90deg, var(--color-cyan-defaultGrey), var(--color-green-defaultGrey));
    padding: 3px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    transition: 300ms;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gradient-button:hover span {
    background: none;
}

.gradient-button:active {
    transform: scale(0.9);
}

/* 禁用/加载状态 */
.gradient-button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>