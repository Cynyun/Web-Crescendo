<template>
  <div class="page-container">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="nav-tabs">
        <div class="backarrow">
          <button 
            class="backbtn" 
            :style="{ backgroundImage: `url(${getImageSrc('backbtn.png')})` }" 
            @click="clickBack"
          >
            <img :src="getImageSrc('barrow.png')" alt="返回" class="back-icon">
          </button>
        </div>
      </div>
    </div>

    <!-- 分割布局容器 -->
    <div class="split-container">
      <!-- 左侧：动态背景图区域 -->
      <div class="left-panel" :style="{ backgroundImage: `url(${leftImageList[activeIndex].url})` }">
        <!-- 装饰性遮罩层 -->
        <div class="left-mask"></div>
        <!-- 英雄名称标题（行楷字体） -->
        <h1 class="title">{{ buttonList[activeIndex].name }}</h1>
        <!-- 装饰性边框 -->
        <div class="decor-border top-left"></div>
        <div class="decor-border bottom-right"></div>
      </div>

      <!-- 右侧：原图展示 + 按钮组 -->
      <div class="right-panel">
        <!-- 按钮组（按钮文字行楷） -->
        <div class="btn-group">
          <button 
            v-for="(btn, index) in buttonList" 
            :key="index" 
            class="hero-btn"
            :class="{ active: activeIndex === index }" 
            @click="switchImage(index)"
          >
            {{ btn.name }}
          </button>
        </div>

        <!-- 原图展示区域（带装饰卡片） -->
        <div class="image-card">
          <div class="image-wrapper">
            <img 
              :src="rightImageList[activeIndex].url" 
              :alt="buttonList[activeIndex].name" 
              class="hero-image" 
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImageSrc } from '@/config';
import router from '@/router';
import { ref } from 'vue';

const clickBack = () => {
  router.back()
}

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

// 左侧背景图列表（public/Images下的图片，路径以/Images/开头）
const leftImageList = ref([
  { url: '/Images/wc1.jpg' },    
  { url: '/Images/ys1.jpg' },    
  { url: '/Images/jch1.jpg' },  
  { url: '/Images/th1.jpg' },    
  { url: '/Images/nhy1.jpg' },  
  { url: '/Images/liul1.jpg' },    
  { url: '/Images/hd1.jpg' },    
  { url: '/Images/hw1.jpg' },    
]);

// 右侧展示图列表（public/Images下的图片，路径以/Images/开头）
const rightImageList = ref([
  { url: '/Images/wc.png' },   
  { url: '/Images/ys.png' },   
  { url: '/Images/jch.png' }, 
  { url: '/Images/th.png' },   
  { url: '/Images/nhy.png' }, 
  { url: '/Images/liul.png' },   
  { url: '/Images/hd.png' },   
  { url: '/Images/hw.png' },   
]);

// 当前激活的图片索引
const activeIndex = ref(0);

// 切换图片方法（同步切换左右图）
const switchImage = (index) => {
  activeIndex.value = index;
};
</script>

<style scoped>
/* 全局页面容器 */
.page-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  overflow-x: hidden;
}

/* 顶部导航栏 */
.header {
  width: 100%;
  height: 80px;
  position: relative;
  background: 
    url('/Images/logo.png') no-repeat 40px 15px / contain,
    url('/Images/header_bg.jpg') no-repeat center center / cover,
    linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
  background-blend-mode: overlay;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    pointer-events: none;
  }

  .nav-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 22px;
    padding: 0 50px;
    height: 100%;

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
      position: relative;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      .back-icon {
        position: relative;
        top: 3px;
        left: -23px;
        transition: all 0.3s ease;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      }
    }

    .backbtn:hover .back-icon {
      left: -35px;
      filter: drop-shadow(0 2px 6px rgba(0, 153, 255, 0.5));
    }
  }
}

/* 分割布局容器：左右各占50% */
.split-container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 80px);
  gap: 1px;
  background-color: rgba(255, 255, 255, 0.05);
}

/* 左侧面板：动态背景图 + 标题 */
.left-panel {
  flex: 1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;

  /* 渐变遮罩，提升层次感 */
  .left-mask {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg, 
      rgba(0, 0, 0, 0.7) 0%, 
      rgba(0, 0, 0, 0.4) 50%, 
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
  }

  /* 装饰性边框 */
  .decor-border {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    z-index: 2;
  }

  .top-left {
    top: 40px;
    left: 40px;
    border-right: none;
    border-bottom: none;
  }

  .bottom-right {
    bottom: 40px;
    right: 40px;
    border-left: none;
    border-top: none;
  }
}

/* 标题样式（行楷字体） */
.title {
  color: #ffffff;
  font-size: 48px;
  /* 行楷字体优先级：华文行楷 > 微软行楷 > 楷体 > 通用衬线字体 */
  font-family: "STXingkai", "Microsoft YaHei UI", "KaiTi", "SimKai", serif;
  font-weight: 500;
  letter-spacing: 4px; /* 增加字间距更符合行楷风格 */
  z-index: 3;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #0099ff, transparent);
    border-radius: 3px;
  }
}

/* 右侧面板：按钮组 + 切换的原图 */
.right-panel {
  flex: 1;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #121212 0%, #0f0f0f 100%);
}

/* 按钮组样式 */
.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

/* 按钮样式（行楷字体） */
.hero-btn {
  padding: 14px 28px;
  background: linear-gradient(135deg, #2d2d2d 0%, #232323 100%);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px; /* 放大按钮字体更适配行楷 */
  /* 行楷字体优先级：华文行楷 > 微软行楷 > 楷体 > 通用衬线字体 */
  font-family: "STXingkai", "Microsoft YaHei UI", "KaiTi", "SimKai", serif;
  font-weight: 500;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 2px; /* 行楷增加字间距更美观 */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #383838 0%, #2d2d2d 100%);
    border-color: rgba(0, 153, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &.active {
    background: linear-gradient(135deg, #007acc 0%, #005fa3 100%);
    border-color: #0099ff;
    box-shadow: 0 0 20px rgba(0, 153, 255, 0.3);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 10px;
      padding: 1px;
      background: linear-gradient(90deg, #0099ff, #00ccff);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
  }
}

/* 图片卡片容器 */
.image-card {
  max-width: 650px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  background: #000;
  transition: transform 0.5s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 40px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(0, 153, 255, 0.1);
  }

  /* 图片卡片装饰角标 */
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, rgba(0, 153, 255, 0.1), transparent);
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
  }
}

/* 图片容器样式 */
.image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 图片样式 */
.hero-image {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.6s ease;
  transform-origin: center;

  &:hover {
    transform: scale(1.02);
  }
}

/* 响应式适配：小屏幕改为上下布局 */
@media (max-width: 1200px) {
  .title {
    font-size: 36px;
    letter-spacing: 3px;
  }
  .hero-btn {
    font-size: 16px;
    letter-spacing: 1.5px;
  }
}

@media (max-width: 768px) {
  .split-container {
    flex-direction: column;
  }
  
  .left-panel {
    min-height: 400px;
  }
  
  .title {
    font-size: 32px;
    letter-spacing: 2px;
  }
  
  .right-panel {
    padding: 40px 20px;
    gap: 30px;
  }
  
  .btn-group {
    gap: 10px;
    padding: 15px;
  }
  
  .hero-btn {
    padding: 12px 20px;
    font-size: 15px;
    letter-spacing: 1px;
  }
  
  .header .backarrow {
    left: 40px;
  }
  
  .decor-border {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .left-panel {
    min-height: 300px;
  }
  
  .title {
    font-size: 28px;
    letter-spacing: 2px;
  }
  
  .hero-btn {
    padding: 10px 16px;
    font-size: 14px;
    letter-spacing: 1px;
  }
  
  .image-card {
    border-radius: 12px;
  }
  
  .header {
    height: 70px;
  }
  
  .header .backarrow {
    width: 100px;
    height: 50px;
  }
}
</style>