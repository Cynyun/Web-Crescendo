<template>
    <div class="container">
        <div class="nav">
            <GradientText text="Web Crescendo" />
            <div class="designed">
                <!-- 已登录：显示用户名 + 退出按钮 -->
                <div v-if="userStore.isLoggedIn" class="user-info">
                    <p style="color: white; white-space: nowrap;">欢迎，{{ userName }}</p>
                    <NewButton type="danger" size="small" @click="handleLogout" style="margin-left: 10px">
                        退出
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
        <div class="table">
            <div class="left"></div>
            <div class="mid">
                <button class="btnstyle" @click="handleClick">
                    <ImageCard prompt="永劫无间" title="" :imageUrl="imageurl1" class="card" />
                </button>
            </div>
            <div class="right"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script setup lang="ts">
import { getImageSrc } from '@/config';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import RegisterModal from '@/components/RegisterModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import GradientText from '@/components/GradientText.vue';
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus'
import NewButton from '@/components/Button.vue'

// 用户数据
const userStore = useUserStore()

// 确保响应式的用户名
const userName = computed(() => {
    const info = userStore.userInfo
    // 兼容处理：如果 nickname 不存在，尝试使用 name（旧数据兼容）
    return info?.nickname || (info as any)?.name || ''
})

// 显示注册组件
const showRegister = ref(false)

// 显示登入组件
const showLogin = ref(false)

// 背景图片
const imageurl1 = getImageSrc('backgroundImage1.webp')

// 页面跳转
const handleClick = () => {
    router.push('FrameWork')
}

// 退出登录
const isLoggingOut = ref(false) // 防止重复点击
const handleLogout = () => {
    // 防止重复点击
    if (isLoggingOut.value) return
    isLoggingOut.value = true
    
    userStore.clearUserInfo()
    ElMessage.info('已退出登录')
    
    // 重置标志，允许下次退出
    setTimeout(() => {
        isLoggingOut.value = false
    }, 1000)
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
    // background-image: url('../../public/Images/background_default.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.nav {
    width: 100%;
    height: 80px;
    background: linear-gradient(90deg, var(--color-green-defaultGrey), var(--color-cyan-defaultGrey));
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .designed {
        min-width: 200px;
        height: 80px;
        position: absolute;
        right: 20px;
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

.nav:hover {
    background: linear-gradient(90deg, var(--color-green-default), var(--color-cyan-default));
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    :deep(.gradient-text) {
        background: linear-gradient(90deg,
                var(--color-green-darkGrey),
                var(--color-cyan-darkGrey),
                var(--color-green-darkGrey),
                var(--color-cyan-darkGrey));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 300% 100%;
        animation: gradient-text-ani 2s infinite linear;
    }
}

.table {
    box-sizing: border-box;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: minmax(100px, 3fr) minmax(200px, 8fr) minmax(100px, 3fr);
    align-items: center;
    justify-content: center;

    .mid {
        display: flex;
        width: 100%;

        button {
            margin: 50px 0;
            width: 100%;
            height: 500px;
            border: none;
            background-color: rgba(255, 255, 255, 0);

            .card {
                width: 100%;
                height: 500px;
            }
        }
    }

    .left,
    .right {
        min-width: 100px;
    }

    .left {
        position: relative;

        .test {
            width: 200px;
            height: 150px;
            position: absolute;
            top: 10px;
            left: 50px;
        }
    }
}

// .footer {}</style>