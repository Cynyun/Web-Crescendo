# 颜色系统开发文档

## 架构总览

项目的全局颜色由 **Pinia Store** 统一管理，通过两层渠道分发给组件：

```
src/stores/themecolor.ts          ← 颜色定义中心（唯一真相来源）
       │
       ├──→ 组件 JS 直接读取 Store（内联 :style）
       │    例: themeStore.light1, themeStore.transparentWhite10
       │
       └──→ registerColorCssVariables() 写入 CSS 变量（--color-*）
            例: var(--color-background-color), var(--color-cyan-default)
            （定义于 src/config.ts，在 src/main.ts 启动时调用）
```

---

## 颜色系列说明

| 系列 | Store 字段 | 颜色 | 典型用途 |
|------|-----------|------|----------|
| 系列A | `light1` ~ `darkGrey1` | 灰白色阶 (6级) | 主文字色、前景元素 |
| 系列B | `light2` ~ `darkGrey2` | 青蓝色阶 (6级) | 边框、强调色、渐变 |
| 半透明白 | `transparentWhite10/30/40` | 白色 rgba | 输入框背景、悬停层 |
| 半透明黑 | `transparentBlack10/20/30/80` | 黑色 rgba | 下拉背景、遮罩层 |
| 半透明彩 | `transparentOrange50/Grey50/Blue50/Cyan50` | 彩色 rgba | 按钮、焦点光环 |
| 错误色 | `redError` | `#ff6b6b` | 错误提示 |

> 另有 `origin*`、`green*`、`cyan*`、`grey*` 等常量保留在 Store 文件中作为参考，未挂载到 state。

---

## 为组件添加颜色的标准流程

### 前提：判断是否需要新增 Store 颜色

1. 先检查 `themecolor.ts` 中是否已有合适的颜色
2. 若没有完全匹配的，优先使用最接近的现有颜色
3. 确实无法匹配时再新增，遵循现有命名规范

### 步骤 1：如有需要，在 Store 中新增颜色常量

```ts
// src/stores/themecolor.ts

// 1. 在对应分类下添加常量定义
const transparentCyan50 = 'rgba(125, 255, 255, 0.5)';

// 2. 在 state 中注册
state: () => ({
    // ...
    transparentCyan50: transparentCyan50,
})
```

### 步骤 2：在组件的 `colors` computed 中引用

```ts
// src/components/YourComponent.vue
import { useThemeColorStore } from '../stores/themecolor';

const themeStore = useThemeColorStore();

const colors = computed(() => ({
    myBackground: themeStore.transparentWhite10,
    myBorder: themeStore.lightGrey2,
    myText: themeStore.light1,
    // ... 其他颜色
}));
```

### 步骤 3：通过内联 `:style` 应用颜色

```html
<template>
    <div :style="{
        backgroundColor: colors.myBackground,
        borderColor: colors.myBorder,
        color: colors.myText
    }">
        <!-- 内容 -->
    </div>
</template>
```

### 步骤 4（可选）：处理伪类/伪元素

当需要给 `:focus`、`::placeholder`、`:hover` 等**伪类**设置动态颜色时，使用 CSS 自定义属性桥接：

**模板侧 — 注入变量：**
```html
<input :style="{
    '--focus-outline-color': colors.focusOutline,
    '--placeholder-color': colors.placeholderColor
}" />
```

**样式侧 — 引用变量：**
```css
.input:focus {
    outline: 2px solid var(--focus-outline-color);
}
.input::placeholder {
    color: var(--placeholder-color);
}
```

---

## 完整示例：InputSelect 组件

```
src/stores/themecolor.ts         定义颜色（新增 transparentCyan50, transparentBlack80）
        │
src/components/InputSelect.vue
    ├── colors computed           映射 Store 字段到组件语义名
    ├── 内联 :style               直接属性 → backgroundColor/borderColor/color
    ├── 内联 :style               CSS 变量  → --focus-outline-color / --placeholder-color
    └── <style scoped>            伪类引用 var(--focus-outline-color)
```

---

## 颜色配置界面

用户可通过 `BaseSettings.vue`（设置页面）实时调整所有 Store 中的颜色，修改即时生效，无需刷新。

---

## 注意事项

1. **不要在组件中硬编码颜色值** — 所有颜色应从 Store 或 CSS 变量获取
2. **替换旧硬编码时保留注释** — 格式为 `// 原值: 'rgba(...)'`，方便回溯
3. **命名规范** — 新增 Store 字段遵循现有模式：`transparent{Color}{Opacity}` 用于半透明色，`{color}{Level}` 用于色阶
4. **CSS 变量的限制** — `registerColorCssVariables()` 只在应用启动时执行一次，因此 `--color-*` 变量不随 Store 动态更新。需要动态响应主题切换的场景，必须直接读取 Store（即方案一：内联 `:style`）
