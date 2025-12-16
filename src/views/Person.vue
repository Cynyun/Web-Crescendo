<template>
  <div class="image-switch-container">
    <h1 class="title">英雄故事图片展示</h1>

    <!-- 按钮组 -->
    <div class="btn-group">
      <button v-for="(btn, index) in buttonList" :key="index" class="hero-btn"
        :class="{ active: activeIndex === index }" @click="switchImage(index)">
        {{ btn.name }}
      </button>
    </div>

    <!-- 图片展示区域 -->
    <div class="image-wrapper">
      <img :src="imageList[activeIndex].url" :alt="buttonList[activeIndex].name" class="hero-image" loading="lazy">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 按钮名称列表（对应图片）
const buttonList = ref([
  { name: '无尘' },
  { name: '岳山' },
  { name: '季沧海' },
  { name: '天海' },
  { name: '宁红夜' },
  { name: '刘炼' },
  { name: '哈迪' },
  { name: '胡为' }
]);

// 图片链接列表（你提供的所有图片URL）
const imageList = ref([
  {
    url: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/13fa6751d9ca46f399d6df755929bf64.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=ZgDVOSxV9WolKgBO09dtcj1sQJM%3D'
  },
  {
    url: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/ab63bc1af53c45f495513ff05bef0fd3.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=cuLq3HK1O5i%2BwK7VF7MBrJxxuWk%3D'
  },
  {
    url: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/d32b8f792f82491eac47bd1383fd9aeb.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=4Yc2%2BMxodPZHoZAfcQGJiJ16Q%2FM%3D'
  },
  {
    url: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/6364ee3f1eaf4f0792985ac0934e93c0.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=XwikFhgo9DuCYifc47jtFnEVVGY%3D'
  },
  {
    url: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/c8e1707ec8744f70899437398526c640.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=DT9TzR6abw4RJ8lxO9VMJlh5rrw%3D'
  },
  {
    url: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/46c7c53b905e4a69bd30dfa460810dd7.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=7UNEE%2BNYbDaqms2FtvGB9oPC0ok%3D'
  },
  {
    url: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/1f0efd1858a040cd958453f9c321847f.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=SmaaxtOaglshzy3qs9Phj9vouuI%3D'
  },
  {
    url: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/dc3c848c3a724759985369f84801dbac.png~tplv-a9rns2rl98-image.png?rcl=20251215183847142DACEEC3B3C09C71B8&rk3s=8e244e95&rrcfp=dafada99&x-expires=2082019127&x-signature=GOwl6oPMK6uV0E4g5stVooKz%2FKg%3D'
  }
]);

// 当前激活的图片索引
const activeIndex = ref(0);

// 切换图片方法
const switchImage = (index) => {
  activeIndex.value = index;
};
</script>

<style scoped>
/* 全局容器样式 */
.image-switch-container {

  width: 100%;
  /* height: 100%; */
  min-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #1a1a1a;
  min-height: 100vh;
  box-sizing: border-box;
}

/* 标题样式 */
.title {
  color: #ffffff;
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* 按钮组样式 */
.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 30px;
}

/* 按钮样式 */
.hero-btn {
  padding: 12px 24px;
  background-color: #2d2d2d;
  color: #ffffff;
  border: 1px solid #444;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  background-color: #3f3f3f;
  border-color: #666;
}

.hero-btn.active {
  background-color: #007acc;
  border-color: #0099ff;
  color: #fff;
}

/* 图片容器样式 */
.image-wrapper {
  max-width: 800px;
  margin: 0 auto;
  border: 2px solid #333;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

/* 图片样式 */
.hero-image {
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.5s ease;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .btn-group {
    gap: 8px;
  }

  .hero-btn {
    padding: 10px 18px;
    font-size: 14px;
  }

  .title {
    font-size: 24px;
  }
}

</style>