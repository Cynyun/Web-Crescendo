<template>
    <div class="container">
        <div class="nav">
            <span>Web Crescendo</span>
            <div class="designed">
                <!-- 已登录：显示用户名 + 退出按钮 -->
                <div v-if="userStore.isLoggedIn" class="user-info">
                    欢迎，{{ userStore.userInfo?.nickname }}
                    <el-button type="danger" size="small" @click="handleLogout" style="margin-left: 10px">
                        退出
                    </el-button>
                </div>

                <!-- 未登录：显示注册（和/或登录）按钮 -->
                <div v-else class="auth-buttons">
                    <NewButton type="primary" size="small" @click="showRegister = true">
                        注册
                    </NewButton>
                    <!-- 可选：添加登录按钮 -->
                    <NewButton size="small" @click="showLogin = true">登录</NewButton>
                </div>

                <!-- 注册弹窗 -->
                <RegisterModal v-model:visible="showRegister" />

                <!-- 登录弹窗（可选） -->
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
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import NewButton from '@/components/Button.vue'

// 用户数据
const userStore = useUserStore()

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
const handleLogout = () => {
    userStore.clearUserInfo()
    ElMessage.info('已退出登录')
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

    span {
        background: linear-gradient(90deg, var(--color-green-lightGrey), var(--color-cyan-lightGrey));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        transition: transform 0.3s ease;

        margin-left: 20px;
        line-height: 80px;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
    }

    .designed {
        width: auto;
        height: 80px;
        position: absolute;
        right: 20px;
        display: flex;
        align-items: center;
        background-color: none;
        gap: 8px;

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

    span {
        background: linear-gradient(90deg,
                var(--color-green-darkGrey),
                var(--color-cyan-darkGrey),
                var(--color-green-darkGrey),
                var(--color-cyan-darkGrey));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        background-size: 300% 100%;
        animation: spanAni 2s infinite linear;
    }
}

@keyframes spanAni {
    from {
        background-position: 0% 0%;
    }

    to {
        background-position: 100% 0%;
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
    // align-items: center;
    // justify-content: center;

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

.footer {
    // height: 10px;
}
</style>