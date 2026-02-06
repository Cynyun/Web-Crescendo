<template>
    <div class="timeDisplay">
        {{ currentTime }}
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
    font-size: 72px;
    font-weight: bold;
    color: white;
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue',
        Helvetica, Arial, sans-serif;
}
</style>