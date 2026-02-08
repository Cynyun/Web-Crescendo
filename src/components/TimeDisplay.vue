<template>
    <div class="timeDisplay">
        <GradientText :text="currentTime" fontSize="48px" position="relative" animated/>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GradientText from './GradientText.vue'

const currentTime = ref('00:00:00')
let timer: ReturnType<typeof setInterval> | null = null

const padZero = (num: number): string => num.toString().padStart(2, '0')

const updateTime = () => {
    const now = new Date()
    currentTime.value = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`
}

onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<style scoped lang="scss">
.timeDisplay {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>