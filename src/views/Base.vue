<template>
    <div class="container" :style="themeStyle">
        <Nav v-model:isAlwaysHighlighted="isAlwaysHighlighted" />
        <!-- 左侧内容显示控制按钮 -->
        <NewButton v-if="isLeftHidden" class="left-toggle-btn" @click="controllerLeft">
            <span class="icon iconfont" style="font-size: 26px;">&#xe6ce;</span>
        </NewButton>
        <!-- 右侧内容显示控制按钮 -->
        <NewButton v-if="isRightHidden" class="right-toggle-btn" @click="controllerRight">
            <span class="icon iconfont" style="font-size: 26px;">&#xe6c0;</span>
        </NewButton>
        <div class="table">
            <div class="left" :class="{ 'hidden': isLeftHidden }">
                <div class="left-content">
                    <div class="settings">
                        <NewButton class="settings-icon">
                            <span class="icon iconfont" style="font-size: 26px;">&#xe6b3;</span>
                        </NewButton>
                        <NewButton class="show-left-content" @click="controllerLeft">
                            <span class="icon iconfont" style="font-size: 26px;">&#xe6c0;</span>
                        </NewButton>
                    </div>
                </div>
            </div>
            <div class="mid">
                <!-- 上面部分：占满width，高度为1.5 -->
                <div class="top-section">
                    <TimeDisplay />
                </div>
                <!-- 下面部分：width占满，分为3列2行，高度为1 -->
                <div class="bottom-section">
                    <div class="bottom-section-item" v-for="i in [0, 1, 2, 3, 4, 5]" @click="handleClick(i)">
                        <ImageCard :prompt="images[i]!.prompt" title="" :imageUrl="images[i]!.imgurl" class="card" />
                    </div>
                </div>
            </div>
            <div class="right" :class="{ 'hidden': isRightHidden }">
                <div class="right-content">
                    <div class="right-head">
                        <NewButton class="show-right-content" @click="controllerRight">
                            <span class="icon iconfont" style="font-size: 26px;">&#xe6ce;</span>
                        </NewButton>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script setup lang="ts">
import { getImageSrc } from '@/config';
import router from '@/router';
import { ref, computed } from 'vue';
import Nav from '@/components/Nav.vue';
import { useThemeColorStore } from '@/stores/themecolor'
import NewButton from '@/components/Button.vue';
import ImageCard from '@/components/ImageCard.vue';
import TimeDisplay from '@/components/TimeDisplay.vue';

// 主题颜色store
const themeColorStore = useThemeColorStore()

//是否开启常显高亮
const isAlwaysHighlighted = ref(false)

// 是否隐藏左侧
const isLeftHidden = ref(false)

// 是否隐藏右侧
const isRightHidden = ref(false)

// 背景图片
// const imageurl1 = getImageSrc('backgroundImage1.webp')

// 临时图片
const images = [
    { imgurl: getImageSrc('YJimages/background_default.wepg'), url: '/yjwjgame/YJFrameWork', prompt: 'p1', title: '图片1' },
    { imgurl: getImageSrc('Timages/backgroundImage2.png'), url: '', prompt: 'p2', title: '图片2' },
    { imgurl: getImageSrc('Timages/backgroundImage3.png'), url: '', prompt: 'p3', title: '图片3' },
    { imgurl: getImageSrc('Timages/backgroundImage4.png'), url: '', prompt: 'p4', title: '图片4' },
    { imgurl: getImageSrc('Timages/backgroundImage5.png'), url: '', prompt: 'p5', title: '图片5' },
    { imgurl: getImageSrc('Timages/backgroundImage6.png'), prompt: 'p6', title: '图片6' },
]

const themeStyle = computed(() => {
    const baseThemeStyle: Record<string, string> = {
        '--light1': themeColorStore.default1,
        '--light2': themeColorStore.default2,
        '--lightGrey2': themeColorStore.lightGrey2,
    }
    return baseThemeStyle;
})

// 页面跳转
const handleClick = (index: number) => {
    if (images[index]!.url) {
        router.push(images[index]!.url)
    }
}

// 控制左侧显示
const controllerLeft = () => {
    isLeftHidden.value = !isLeftHidden.value
}

// 控制右侧显示
const controllerRight = () => {
    isRightHidden.value = !isRightHidden.value
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
    background-image: url('../../Images/TImages/backgroundImage14.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
}

.table {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    margin-top: 0px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;

    .left,
    .right {
        margin: 3px;
        height: calc(100% - 6px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        position: relative;
        background-color: transparent;
        border-radius: 10px;
    }

    .left {
        // flex 0 0 宽度
        flex: 0 0 200px;
        transform: translateX(0);
        background: linear-gradient(60deg, var(--light1), var(--light2));
    }

    .right {
        // flex 0 0 宽度
        flex: 0 0 200px;
        transform: translateX(0);
        background: linear-gradient(300deg, var(--light1), var(--light2));
    }

    .mid {
        flex: 1;
        height: calc(100% - 10px);
        min-width: 200px;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0.35fr 1fr;
        gap: 16px;
        margin-bottom: 5px;

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

    .left-content,
    .right-content {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .left-content {
        left: 0;

        .settings {
            width: 100%;
            height: 35px;
            background-color: var(--lightGrey2);
            display: flex;
            align-items: center;
            justify-content: center;

            .settings-icon {
                width: 78%;
                height: 31px;
                line-height: 31px;
                text-align: center;
                font-size: 26px;
                color: var(--darkGrey1);
                cursor: pointer;
            }

            .show-left-content {
                width: 31px;
                height: 31px;
                line-height: 31px;
                text-align: center;
                font-size: 26px;
                color: var(--darkGrey1);
                cursor: pointer;
            }
        }
    }

    .right-content {
        right: 0;

        .right-head {
            width: 100%;
            height: 35px;
            background-color: var(--lightGrey2);
            display: flex;
            align-items: center;
            justify-content: center;

            .show-right-content {
                width: 98%;
                height: 31px;
                line-height: 31px;
                text-align: center;
                font-size: 26px;
                color: var(--darkGrey1);
                cursor: pointer;
            }
        }
    }
}

/* 当左右两侧隐藏时，中间部分占据全部宽度 */
.table.collapsed {
    .left {
        flex: 0 0 0;
        transform: translateX(-100%);
    }

    .right {
        flex: 0 0 0;
        transform: translateX(100%);
    }

    .mid {
        flex: 1 1 100%;
        padding: 0 20px;
    }
}

/* 滑动隐藏动画效果 */
.table.sliding {

    .left,
    .right {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .mid {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
}

/* 左侧隐藏样式 */
.table .left.hidden {
    flex: 0 0 0;
    transform: translateX(-100%);
}

/* 右侧隐藏样式 */
.table .right.hidden {
    flex: 0 0 0;
    transform: translateX(100%);
}

/* 当左右侧都隐藏时，中间部分占据全部宽度 */
.table:has(.left.hidden):has(.right.hidden) .mid {
    flex: 1 1 100%;
    padding: 0 40px;
}

/* 当只有左侧隐藏时，中间部分占据更多宽度 */
.table:has(.left.hidden):not(:has(.right.hidden)) .mid {
    flex: 2;
}

/* 当只有右侧隐藏时，中间部分占据更多宽度 */
.table:has(.right.hidden):not(:has(.left.hidden)) .mid {
    flex: 2;
}

/* 左侧内容显示控制按钮样式 */
.left-toggle-btn {
    position: fixed;
    left: 0;
    top: 63px;
    z-index: 10;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(60deg, var(--light1), var(--light2));
        transform: translateX(3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        color: var(--darkGrey1);
    }

    .icon {
        color: var(--darkGrey1);
        font-size: 26px;
    }
}

/* 右侧内容显示控制按钮样式 */
.right-toggle-btn {
    position: fixed;
    right: 0;
    top: 63px;
    z-index: 10;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(300deg, var(--light1), var(--light2));
        transform: translateX(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
        color: var(--darkGrey1);
    }

    .icon {
        color: var(--darkGrey1);
        font-size: 26px;
    }
}

.footer {
    width: 100%;
    // height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>