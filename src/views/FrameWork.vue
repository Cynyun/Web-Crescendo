<template>
    <div class="framework">
        <div class="header">
            <div class="nav-tabs">
                <button class="tab-button" @click="handleClick('world')">
                    世界观
                </button>
                <button class="tab-button" @click="handleClick('person')">
                    人物志
                </button>
            </div>
        </div>
        <div class="container">
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const handleClick = (str: string) => {
    if (str == 'world') {
        router.push('/world')
    } else if (str == 'person') {
        router.push('/person')
    }
}
</script>
<style scoped lang="scss">
.framework {
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
}

.header {
    width: 100%;
    height: 100px;
    position: relative;
    background-image:
        linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
        url('/Images/headerimage.webp'),
        url('/Images/hengfu.webp');
    background-repeat: no-repeat, no-repeat, repeat-x;
    background-position: center bottom, 20px 10px, top left;
    background-size: auto, auto, auto;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
        pointer-events: none;
        z-index: 1;
    }

    .nav-tabs {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 30px;
        padding: 0 50px;
    }

    .tab-button {
        margin-top: 35px;
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 16px;
        color: #bdbdbd;
        background: none;
        border: none;
        cursor: pointer;
        position: relative;

        /* 默认不显示下划线 */
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0; // 初始宽度为 0
            height: 2px; // 线的高度
            background-color: #e74c3c; // 红色
            transition: width 0.3s ease;
        }

        /* 鼠标悬停时展开下划线 */
        &:hover::after {
            width: 100%;
        }
    }

    .tab-button:hover {
        color: white;
    }

}

.container {
    width: 100%;
    height: calc(100vh - 100px);
    color: white;
    background-image: url('../../public/Images/backgroundImage1.webp');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>