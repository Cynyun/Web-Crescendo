<template>
    <div class="nav">
        <span>Web Crescendo</span>
    </div>
    <div class="table">
        <div class="left">
            <div style="width: 200px; height: 120px;" class="test">
                <ImageCard prompt="" title="" :imageUrl="imageurl" />
            </div>
        </div>
        <TextCard :contexts="texts" />
        <!-- <div style="width: 300px; height: 200px; margin-top: 200px;">
            <ImageCard prompt="" title="" :imageUrl="imageurl" />
        </div> -->
        <!-- <TextCard /> -->
        <div class="right">

        </div>
    </div>
    <div class="footer">

    </div>
</template>

<script setup lang="ts">
import { getImageSrc } from '@/config';
import router from '@/router';
import { ref } from 'vue';
const imageurl = getImageSrc('default.png')
const backimageurls = [
    { src: getImageSrc('guimie_image01.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image02.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image03.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image04.png'), link: 'https://example.com/link1' },
    { src: getImageSrc('guimie_image05.png'), link: 'https://example.com/link1' },
]
const texts = ref([
    { text: '20X5-6-19-1' },
    { text: '今天是我来到染梦的第一天，运气很好，没走多远就发现了那栋粉色小屋。' },
    { text: '靠近小屋，粉嫩的让人心情愉悦，可惜有些破旧了，我打算修复一下，临时居住。' },
    { wideGap: true },
    { text: '20X5-6-19-2' },
    { text: '进入屋内后，我发现书台上有一本名为《来往于梦》的笔记，作者叫做流华。' },
    { text: '根据书中的内容，流华并不是小屋的主人。看起来这栋小屋历史至少有两代人的时间了。' },
    { text: '虽然时间相隔很久，惊人的是花盆里的花和《来往于梦》中说的一样，生命依旧。这真是一个奇迹不是吗？' },
    { wideGap: true },
    { text: '20X5-6-19-3' },
    { text: '我将屋内的家具稍微调整了下，方便以后的生活。' },
    { text: '屋子附近的染梦泥土都贴到墙壁上了，前院的染梦树也挡住了视野，要清理好一段时间了。' },
    { text: '清理完了真累呀！屋内的粉色小床发出淡淡花香带着我入梦。' },
    { wideGap: true },
    { text: '20X5-6-19-4' },
    { text: '醒来后发现了一只可爱的悦灵在床边，看着它的萌萌的样子，给了它一个染梦果尝尝。' },
    { text: '惊喜！原来小屋是有二楼的，为什么没有通向二楼的通道呢？只好自己造一个了。' },
    { text: '在二楼的箱子找到两个融梦星币，O(∩_∩)O。' },
    { wideGap: true },
    { text: '20X5-6-19-5' },
    { text: '发现个奇怪的事，为什么屋外经常发现粉红色鸡蛋？是染梦世界的鸡生的么？可附近没看到过有这样的生物呀。' },
    { wideGap: true },
    { text: '20X5-X-XX-6' },
    { text: '粉色小屋整理完后，我在里面待了两天，并探查了下小屋附近，没有新奇的发现。我打算出去一趟，在染梦世界中探险！' },
    { text: '20X5-X-XX-7' },
    { text: '离开小屋不久后，在水域发现了一些建筑，有些像亭台的地方，还有一座水上小岛。' },
    { text: '亭台其一：' },
    { text: '其中一座亭台里神奇的漂浮着一本打开的书，我缓缓走进后那本漂浮的书突然掉入下方水中。' },
    { text: '急忙从水中捡起书，发现竟然没有湿润，是有什么魔法在保护这本书吗？还是说这是一本魔法书？' },
    { text: '待仔细查看书之前，偶然发现亭台上有4个宝箱，这是这个世界的创世神的礼物么？' },
    { text: '书的名字是《温暖的“寒风”》，作者名为琴雨梦。' },
    { text: '阅览书才后知后觉的感到这里独特的气候环境，如书中所说无论白天黑夜，这的温度都很舒适。' },
    { text: '最后面了，我对书的主人颇有兴趣，根据她的描述，她应该在这个世界里探索了很久的时间，知道许多这个世界的知识。她现在在哪，我会遇见她吗？' },
    { wideGap: true },
    { text: '亭台其二：' },
    { text: '远看时觉得这个亭台挺小的，游近发现原来它不止露出的部分。' },
    { text: '在亭台中央发现了一个书台，又是琴雨梦所著，看起来她留下不少信息给后来者。' },
    { text: '涌泉？原来这时琴雨梦和她的小伙伴创造的融梦井！' },
    { text: '根据书中的描述，下面存在茂盛的植物，准备探险啦！' },
    { text: '朝井口看去，很难看清下方具体情况。' },
    { text: '到达井底后发现下面存在着一个更大的空间，与我所在位置相隔一层...冰么？' },
    { text: '下到底层后一个喷涌着梦一般星光闪闪的泉水进入眼帘。' },
    { text: '四周围绕着像是泉水中的矿物质所生长起来的方解石。' },
    { text: '时光匆匆流去，这座涌泉的建造者们已经不知所踪，只剩下他们留下的飘渺线索。' },
    { text: '根据书中的描述和眼前的涌泉，似乎能看到建造者们曾今在这片大陆生活过的影子。' },
    { text: '我想我明白自己在这世界的目的了，就是跟随着曾经探梦者们的脚印，去了解这个世界。' },
])
</script>

<style scoped lang="scss">
.nav {
    width: 100%;
    height: 80px;
    background: linear-gradient(90deg, var(--color-green-defaultGrey), var(--color-cyan-defaultGrey));
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);

    span {
        background: linear-gradient(90deg, var(--color-green-lightGrey), var(--color-cyan-lightGrey));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;

        margin-left: 20px;
        line-height: 80px;
        font-size: 36px;
        font-weight: bold;
        text-align: center;

        transition: transform 0.3s ease;
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
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: minmax(100px, 3fr) minmax(200px, 8fr) minmax(100px, 3fr);
    // align-items: center;
    // justify-content: center;

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
    height: 60px;
}
</style>