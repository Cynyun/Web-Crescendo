<template>
    <NewButton size="small" class="controllerNavShow" @click="handleToggleNav">{{ '' }}</NewButton>
    <div class="nav" :class="{ 'nav-highlighted': isAlwaysHighlighted, 'nav-hidden': !showNav }" :style="navStyle">
        <NewButton size="small" @click="toggleHighlight" class="controllerHighlight">{{ '' }}</NewButton>
        <GradientText text="Web Crescendo" />
        <div class="designed">
            <!-- 已登录：显示用户名 + 退出按钮 -->
            <div v-if="isLoggedIn" class="user-info">
                <p style="color: white; white-space: nowrap;">欢迎，{{ userName }}</p>
                <NewButton type="danger" size="small" @click="handleLogout" style="width: 50px; margin-left: 10px;">
                    <span class="icon iconfont">&#xe6f0;</span>
                </NewButton>
            </div>

            <!-- 未登录：显示注册（和/或登录）按钮 -->
            <div v-else class="auth-buttons">
                <NewButton type="primary" size="small" @click="showRegister = true">注册</NewButton>
                <NewButton size="small" @click="showLogin = true">登录</NewButton>
            </div>
            <!-- 注册弹窗 -->
            <RegisterModal v-model:visible="showRegister" />
            <!-- 登录弹窗 -->
            <LoginModal v-model:visible="showLogin" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useThemeColorStore } from '@/stores/themecolor';
import RegisterModal from './RegisterModal.vue';
import LoginModal from './LoginModal.vue';
import GradientText from './GradientText.vue';
import NewButton from './Button.vue';
import { ElMessage } from 'element-plus';

const showNav = ref(true)

// Props
const props = defineProps<{
    isAlwaysHighlighted?: boolean;
}>();

// Emits
const emit = defineEmits<{
    (e: 'update:isAlwaysHighlighted', value: boolean): void;
    (e: 'toggle-nav', isVisible: boolean): void;
}>();

// 是否开启常显高亮
const isAlwaysHighlighted = computed({
    get: () => props.isAlwaysHighlighted || false,
    set: (value: boolean) => emit('update:isAlwaysHighlighted', value)
});

// 切换高亮状态
const toggleHighlight = () => {
    isAlwaysHighlighted.value = !isAlwaysHighlighted.value;
};

// 切换导航显示状态
const handleToggleNav = () => {
    showNav.value = !showNav.value;
    emit('toggle-nav', showNav.value);
};

// 用户数据
const userStore = useUserStore();

// 确保响应式的用户名
const userName = computed(() => {
    const info = userStore.userInfo;
    // 兼容处理：如果 nickname 不存在，尝试使用 name（旧数据兼容）
    return info?.nickname || (info as any)?.name || '';
});

// 是否已登录
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 主题颜色store
const themeColorStore = useThemeColorStore();

// 计算样式 - 使用CSS变量
const navStyle = computed(() => ({
    '--defaultGrey1': themeColorStore.defaultGrey1,
    '--defaultGrey2': themeColorStore.defaultGrey2,
    '--default1': themeColorStore.default1,
    '--default2': themeColorStore.default2,
    '--darkGrey1': themeColorStore.darkGrey1,
    '--darkGrey2': themeColorStore.darkGrey2
}));

// 显示注册组件
const showRegister = ref(false);

// 显示登入组件
const showLogin = ref(false);

// 退出登录
const isLoggingOut = ref(false); // 防止重复点击
const handleLogout = () => {
    // 防止重复点击
    if (isLoggingOut.value) return;
    isLoggingOut.value = true;

    userStore.clearUserInfo();
    ElMessage.info('已退出登录');

    // 重置标志，允许下次退出
    setTimeout(() => {
        isLoggingOut.value = false;
    }, 1000);
};
</script>

<style scoped lang="scss">
.controllerNavShow {
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 0px;
    padding: 0px;
    margin: 0px;
    z-index: 10;
    box-sizing: border-box;
}

.nav {
    width: 100%;
    height: 60px;
    background: linear-gradient(90deg, var(--defaultGrey1), var(--defaultGrey2));
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, height 0.3s ease-in-out;
    transform: translateY(0);
    opacity: 1;
    overflow: hidden;

    .controllerHighlight {
        width: 20px;
        height: 100%;
        position: absolute;
        left: 0px;
        border-radius: 0px;
    }

    .designed {
        min-width: 200px;
        height: 60px;
        position: absolute;
        right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: none;
        gap: 8px;

        .user-info {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .auth-buttons {
            display: flex;
            align-items: center;
            justify-items: center;
            gap: 10px;
        }
    }
}

.nav:hover,
.nav-highlighted {
    background: linear-gradient(90deg, var(--default1), var(--default2));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    :deep(.gradient-text) {
        background: linear-gradient(90deg,
                var(--darkGrey1),
                var(--darkGrey2),
                var(--darkGrey1),
                var(--darkGrey2));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 300% 100%;
        animation: gradient-text-ani 2s infinite linear;
    }
}

.nav-hidden {
    transform: translateY(-100%);
    opacity: 0;
    height: 0;
}

@keyframes gradient-text-ani {
    from {
        background-position: 0% 0%;
    }

    to {
        background-position: 100% 0%;
    }
}
</style>