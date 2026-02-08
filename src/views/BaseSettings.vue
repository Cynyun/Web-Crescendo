<template>
    <div class="body">
        <div class="settings-container">
            <h2 class="settings-title">颜色配置</h2>

            <!-- 滚动条颜色 -->
            <div class="color-section">
                <h3>滚动条颜色</h3>
                <div class="color-item">
                    <span>轨道颜色:</span>
                    <el-color-picker v-model="themeColorStore.scrollbarTrack" show-alpha />
                    <span class="color-value">{{ themeColorStore.scrollbarTrack }}</span>
                </div>
                <div class="color-item">
                    <span>滑块颜色:</span>
                    <el-color-picker v-model="themeColorStore.scrollbarThumb" show-alpha />
                    <span class="color-value">{{ themeColorStore.scrollbarThumb }}</span>
                </div>
                <div class="color-item">
                    <span>悬停颜色:</span>
                    <el-color-picker v-model="themeColorStore.scrollbarHover" show-alpha />
                    <span class="color-value">{{ themeColorStore.scrollbarHover }}</span>
                </div>
            </div>

            <!-- 背景颜色 -->
            <div class="color-section">
                <h3>背景颜色</h3>
                <div class="color-item">
                    <span>背景色:</span>
                    <el-color-picker v-model="themeColorStore.backgroundColor" show-alpha />
                    <span class="color-value">{{ themeColorStore.backgroundColor }}</span>
                </div>
            </div>

            <!-- 灰色系列 -->
            <div class="color-section">
                <h3>颜色A系列</h3>
                <div class="color-item">
                    <span>浅色:</span>
                    <el-color-picker v-model="themeColorStore.light1" show-alpha />
                    <span class="color-value">{{ themeColorStore.light1 }}</span>
                </div>
                <div class="color-item">
                    <span>浅灰:</span>
                    <el-color-picker v-model="themeColorStore.lightGrey1" show-alpha />
                    <span class="color-value">{{ themeColorStore.lightGrey1 }}</span>
                </div>
                <div class="color-item">
                    <span>普通:</span>
                    <el-color-picker v-model="themeColorStore.default1" show-alpha />
                    <span class="color-value">{{ themeColorStore.default1 }}</span>
                </div>
                <div class="color-item">
                    <span>普灰:</span>
                    <el-color-picker v-model="themeColorStore.defaultGrey1" show-alpha />
                    <span class="color-value">{{ themeColorStore.defaultGrey1 }}</span>
                </div>
                <div class="color-item">
                    <span>亮色:</span>
                    <el-color-picker v-model="themeColorStore.dark1" show-alpha />
                    <span class="color-value">{{ themeColorStore.dark1 }}</span>
                </div>
                <div class="color-item">
                    <span>深灰:</span>
                    <el-color-picker v-model="themeColorStore.darkGrey1" show-alpha />
                    <span class="color-value">{{ themeColorStore.darkGrey1 }}</span>
                </div>
            </div>

            <!-- 青色系列 -->
            <div class="color-section">
                <h3>颜色B系列</h3>
                <div class="color-item">
                    <span>浅色:</span>
                    <el-color-picker v-model="themeColorStore.light2" show-alpha />
                    <span class="color-value">{{ themeColorStore.light2 }}</span>
                </div>
                <div class="color-item">
                    <span>浅灰:</span>
                    <el-color-picker v-model="themeColorStore.lightGrey2" show-alpha />
                    <span class="color-value">{{ themeColorStore.lightGrey2 }}</span>
                </div>
                <div class="color-item">
                    <span>普通:</span>
                    <el-color-picker v-model="themeColorStore.default2" show-alpha />
                    <span class="color-value">{{ themeColorStore.default2 }}</span>
                </div>
                <div class="color-item">
                    <span>普灰:</span>
                    <el-color-picker v-model="themeColorStore.defaultGrey2" show-alpha />
                    <span class="color-value">{{ themeColorStore.defaultGrey2 }}</span>
                </div>
                <div class="color-item">
                    <span>亮色:</span>
                    <el-color-picker v-model="themeColorStore.dark2" show-alpha />
                    <span class="color-value">{{ themeColorStore.dark2 }}</span>
                </div>
                <div class="color-item">
                    <span>深灰:</span>
                    <el-color-picker v-model="themeColorStore.darkGrey2" show-alpha />
                    <span class="color-value">{{ themeColorStore.darkGrey2 }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useThemeColorStore } from '@/stores/themecolor'

// 主题颜色store
const themeColorStore = useThemeColorStore()
</script>

<style scoped lang="scss">
.body {
    width: 100%;
    height: 100%;
    background-color: rgba(245, 245, 245, 0.65);
    border-radius: 10px;
    overflow-y: auto;
}

.settings-container {

    .settings-title {
        margin-top: 10px;
    }

    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

h2 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

h3 {
    color: #555;
    margin: 20px 0 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
}

.color-section {
    margin-bottom: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.color-item span:first-child {
    width: 80px;
    color: #666;
}

.color-item .color-value {
    margin-left: 10px;
    font-size: 12px;
    color: #999;
    flex: 1;
}

/* 隐藏滚动条但保留滚动功能 */
.body::-webkit-scrollbar {
    width: 0;
}

.body::-webkit-scrollbar-track {
    background: transparent;
}

.body::-webkit-scrollbar-thumb {
    background: transparent;
}
</style>