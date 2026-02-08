<template>
    <div class="base-container">
        <!-- 上面部分：占满width，高度为1.5 -->
        <div class="top-section">
            <TimeDisplay />
        </div>
        <!-- 下面部分：width占满，分为3列2行，高度为1 -->
        <div class="bottom-section">
            <div class="bottom-section-item" v-for="i in [0, 1, 2, 3, 4, 5]" @click="handleClick(i)">
                <ImageCard :prompt="images[i]!.prompt" title="" :imageUrl="images[i]!.imgurl"
                    class="card" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getImageSrc } from '@/config';
import router from '@/router';
import ImageCard from '@/components/ImageCard.vue';
import TimeDisplay from '@/components/TimeDisplay.vue';

// 临时图片
const images = [
    { imgurl: getImageSrc('YJImages/background_default.png'), url: '/yjwjgame/YJFrameWork', prompt: '永劫无间' },
    { imgurl: getImageSrc('TImages/backgroundImage3.png'), url: '', prompt: 'p2' },
    { imgurl: getImageSrc('TImages/backgroundImage4.png'), url: '', prompt: 'p3' },
    { imgurl: getImageSrc('TImages/backgroundImage7.png'), url: '', prompt: 'p4' },
    { imgurl: getImageSrc('TImages/backgroundImage8.png'), url: '', prompt: 'p5' },
    { imgurl: getImageSrc('TImages/backgroundImage9.png'), url: '', prompt: 'p6' },
]

// 页面跳转
const handleClick = (index: number) => {
    if (images[index]!.url) {
        router.push(images[index]!.url)
    }
}
</script>

<style scoped lang="scss">
.base-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.35fr 1fr;
    gap: 16px;

    .top-section {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 3px;

        // background-color: aqua;
    }

    .bottom-section {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;

        margin-bottom: 3px;

        .bottom-section-item {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;

            .card {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
    }
}
</style>