<template>
    <div class="box" :style="{ backgroundImage: `url(${bkUrl})` }">
        <div class="header">
            <div class="nav-tabs">
                <div class="backarrow">
                    <button class="backbtn" :style="{ backgroundImage: `url(${getImageSrc('backbtn.png')})` }"
                        @click="clickBack">
                        <img :src="getImageSrc('barrow.png')" alt="">
                    </button>
                </div>
                <div v-for="(data, index) in datas" :key="index" class="tab-container">
                    <button class="tab-button" @click="handleClick(index, data.type)">
                        {{ data.title }}
                        <!-- 子按钮容器 -->
                        <div v-if="data.type == 1" class="sub-buttons" :class="{ 'show': currenttype == index }">
                            <button v-for="(more, moreindex) in data.more" :key="moreindex"
                                class="tab-button sub-button" @click="changebk(moreindex)">
                                {{ more.title }}
                            </button>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="book">
                <img :src="currentbook" class="bookimg">
            </div>
            <div class="texts">
                <img :src="getImageSrc('textheader.webp')">
                <TextCard :contexts="currenttexts" title="" prompt="" class="textcard" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getImageSrc } from '@/config';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import datas from '../utils/Datas'

const router = useRouter()
const bkUrl = ref(getImageSrc('bklydt.webp'))
const currenttype = ref(0)
const currentypeindex = ref(0)
const currenttexts = ref({})
const currenttitle = ref('')
const currentbook = ref('')

// 改变展示内容
const changetext = () => {
    const item = datas.value[currenttype.value]
    currenttitle.value = item!.title
    currentbook.value = item!.book
    if (item?.type == 1) {
        const texts = item.more![currentypeindex.value]?.texts!
        // 转换为对象数组
        currenttexts.value = texts.map(text => ({ text }))
    } else if (item?.type == 2) {
        const texts = item.texts!
        currenttexts.value = texts.map(text => ({ text }))
    }
}

// 返回
const clickBack = () => {
    router.back()
}

// nav
const handleClick = (index: number, type: number) => {
    currenttype.value = index;
    if (type == 1) {
        const item = datas.value[index] as { more: { bk: string }[] }
        bkUrl.value = item.more[currentypeindex.value]!.bk // 强制判断为有效数组
    } else if (type == 2) {
        bkUrl.value = (datas.value[index]!.bk as string)
        currentypeindex.value = 0
    }
    changetext()
}

// 改变背景
const changebk = (index: number) => {
    currentypeindex.value = index
}

changetext()
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    min-width: 1520px;
    height: 100%;
    min-height: 600px;
    background-color: black;
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.header {
    width: 100%;
    height: 80px;
    position: relative;
    background-image:
        url('/Images/logo.png'),
        linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1));
    background-repeat: no-repeat, no-repeat;
    background-position: 40px 15px, center bottom;
    background-size: contain, cover;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0), transparent);
        pointer-events: none;
        z-index: 1;
    }

    .nav-tabs {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 22px;
        padding: 0 50px;

        .backarrow {
            margin-right: auto;
        }
    }

    .backarrow {
        width: 120px;
        height: 60px;
        position: relative;
        top: 18px;
        left: 220px;

        .backbtn {
            width: 100%;
            height: 100%;
            background: none;
            border: none;
            cursor: pointer;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;

            img {
                position: relative;
                top: 3px;
                left: -23px;
                transition: left 0.3s ease;
            }
        }

        .backbtn:hover img {
            left: -35px;
        }
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

    .tab-container {
        position: relative;
        display: inline-block; // 确保宽度由内容撑开

        .sub-buttons {
            position: absolute;
            top: 100%; // 紧贴主按钮底部
            left: 0;
            width: 80px;
            background: none;
            display: none; // 默认隐藏
            flex-direction: column;
            gap: 4px;
            z-index: 10;

            opacity: 0;
            visibility: hidden;
            transform: scaleY(0);
            transform-origin: top;
            transition:
                opacity 0.25s ease,
                visibility 0.25s,
                transform 0.25s ease;

            display: flex;
            flex-direction: column;
            // gap: 4px;

            .sub-button {
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 14px;
                color: #bdbdbd;
                background: none;
                border: none;
                cursor: pointer;
                transition: color 0.2s;
                text-align: center;

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
        }

        &:hover .sub-buttons {
            display: flex;
            background-color: rgba(0, 0, 0, 0.8);
        }
    }

    .tab-container:hover .sub-buttons {
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
    }
}

.container {
    width: 100%;
    height: calc(100vh - 80px);
    display: grid;
    grid-template-columns: 97fr 103fr;

    .book {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 65%;
            min-width: 200px;
            height: 90%;
        }
    }

    .texts {
        margin-top: 30px;
        width: 100%;
        height: 100%;
        max-height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
            width: 80%;
            height: 3px;
            position: relative;
            top: -10px;
            // left: -230px
        }

        .textcard {
            width: 80%;
            height: 90%;
        }
    }
}
</style>