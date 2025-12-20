# Web-Crescendo | 拾光簿
Web-Crescendo is a personal web journal for documenting gaming achievements, reflections, and random thoughts. Built as a school web development project, it serves as a digital scrapbook where pixels meet memories.

拾光簿 是一个记录游戏成就、心得体会与日常随想的个人网页日志。作为课程 Web 开发大作业，它如同一本数字剪贴簿，让像素与回忆在此交汇。*From Qwen3 MAX*


普通大学生 Web 课程的小组作业。



## 食用方法（快速开始）
- 前置条件

  请确保你的设备已安装以下工具：
  [Node.js](https://nodejs.org/zh-cn)（推荐 LTS 版本，如 v20+）
  包含 npm 包管理器，用于安装依赖和运行脚本。
  [Git](https://git-scm.com/download/win)
  用于克隆代码仓库和版本控制。

- 安装完成后，可在终端中运行以下命令验证：
  ```bash
  node -v # 应输出版本号，如 v20.15.0
  npm -v # 应输出版本号，如 10.7.0
  git --version # 应输出版本号，如 git version 2.45.1
  ```

- 开发环境搭建

  1. 克隆项目到本地
    ```bash
    git clone https://github.com/Cynyun/Web-Crescendo.git
    ```

  2. 进入项目目录
    ```bash
    cd Web-Crescendo
    ```

  3. 安装项目依赖
    ```bash
    npm install
    ```
    此过程会自动下载 Vue、Vite、Pinia、TypeScript 等所有所需依赖。

  4. 启动开发服务器
    ```bash
    npm run dev
    ```
    成功后将看到类似提示：
    ```bash
    ➜ Local: http://localhost:5173/
    ➜ Network: http://192.168.x.x:5173/
    ```

在浏览器中打开 http://localhost:5173 即可查看应用。

常用命令

- npm 命令说明
  ```bash
  npm run dev # 启动本地开发服务器（带热更新）-（最常用）
  npm run build # 构建生产版本（输出到 dist/ 目录）
  npm run preview # 预览构建后的生产版本
  ```

- 参与协作
  
  开始工作，先同步最新代码：
  ```bash
  git checkout main # 切换到 main 分支
  git pull origin main # 从远程仓库拉取最新的 main 分支代码
  git checkout -b feature/new-ui # 3. 创建一个新的功能分支（feature/new-ui），用于开发新功能 -b 表示创建并切换到该分支
  ```

  修改代码后，请通过 Git 提交并推送：
  ```bash
  git add . # 添加所有修改到暂存区
  git commit -m "feat: 添加新功能" # 提交更改，并附上描述性提交信息
  git push origin your-branch-name # 将分支推送到远程仓库（如 main 或 feature/xxx）
  ```

  推荐使用 VS Code + Volar 插件 获得最佳开发体验。
  请遵循项目中的 TypeScript 类型规范与代码风格。

现在你已经准备好加入开发了！欢迎贡献代码、修复问题或提出建议~



## 项目文件介绍:

```text
.
├── .vscode/               # VS Code 编辑器配置（如设置、任务、调试配置），可忽略
├── node_modules/          # npm 自动安装的依赖包，无需手动修改
├── public/                # 公共静态资源目录，不经过构建处理直接复制到输出目录
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码根目录，所有业务逻辑和组件均存放于此
│   ├── assets/            # 静态资源（图片、字体、SVG 等）
│   ├── components/        # 可复用的 Vue 组件
│   ├── router/            # 路由配置（Vue Router）
│   ├── stores/            # 状态管理（Pinia Store）
│   ├── views/             # 页面级组件（对应路由）
│   ├── App.vue            # 根组件，作为应用的入口视图
│   └── main.ts            # 应用启动文件，创建 Vue 实例并挂载到 DOM
├── index.html             # HTML 入口文件，浏览器加载的第一个页面
├── package.json           # 项目依赖与脚本定义（npm 命令如 dev、build）
├── package-lock.json      # 锁定依赖版本，确保环境一致性
├── README.md              # 项目说明文档
├── tsconfig.json          # TypeScript 编译配置
├── tsconfig.app.json      # Vite 为应用构建生成的特定 TS 配置
├── tsconfig.node.json     # Node.js 环境下的 TS 配置（用于 SSR 或命令行工具）
└── vite.config.ts         # Vite 构建配置文件，支持插件、别名、服务器设置等
```



## 项目使用组件介绍:

### 核心框架与工具
- **Vue3** : 渐进式 JavaScript 框架，以组合式 API（Composition API）为核心，支持响应式系统与组件化开发。本项目充分利用其 `<script setup>` 语法糖、响应式工具（如 ref、reactive）及生命周期钩子，实现高内聚、低耦合的组件结构

- **Vite** : 新一代前端构建脚手架工具，利用原生 ES 模块（ESM）和按需编译策略，提供极速的冷启动与热更新体验。作为项目的开发服务器与构建器，显著提升开发效率与构建性能。

- **Pinia** : Vue 官方推荐的状态管理库，替代 Vuex。提供简洁的 store 设计、完整的 TypeScript 支持、模块化组织方式，并天然集成 Vue DevTools，便于调试全局状态。

- **TypeScript** : JavaScript 的超集，通过静态类型系统增强代码可读性、可维护性与健壮性。在编译期捕获潜在错误，提升大型项目协作效率与开发体验。

### UI 组件库
- **Element Plus** : Vue 3 生态的企业级 UI 组件库，提供了丰富的组件如对话框、表单、输入框等，本项目用于实现登录模态框等交互元素。

### 特殊组件
- **SlideShow** : 基于 Swiper 实现的图片轮播组件，支持自定义分页器（数字/圆点模式）、自动播放、点击切换等功能。注意：由于使用 `<script setup>` 语法，该组件需要使用命名导入方式注册：
  ```typescript
  // 正确的导入方式
  import * as SlideShow from './components/SlideShow.vue'
  app.component('SlideShow', SlideShow)
  ```

- **ImageCard** : 图片卡片组件，用于展示图片内容

- **TextCard** : 文本卡片组件，用于展示文本内容

### 第三方库
- **Swiper** : 现代化的轮播图库，用于实现 SlideShow 组件的核心功能
- **js-cookie** : 用于操作浏览器 Cookie 的库
- **SASS** : CSS 预处理器，用于编写更强大的样式代码

## 常见问题与解决方案

### 1. 构建错误："SlideShow not exported"
**错误信息**：构建时出现 "Module has no default export" 错误

**原因**：使用 `<script setup>` 语法的组件不会自动生成默认导出，只能通过命名导入使用

**解决方案**：修改 `main.ts` 中的导入方式，使用命名导入替代默认导入：
```typescript
// 错误的导入方式
import SlideShow from './components/SlideShow.vue'

// 正确的导入方式
import * as SlideShow from './components/SlideShow.vue'
```

### 2. 样式不生效问题
**问题**：对 Element Plus 组件（如 `el-dialog`、`el-input`）的样式修改不生效

**解决方案**：使用 Vue 3 的 `:deep()` 选择器穿透组件的作用域样式：
```scss
:deep(.el-dialog) {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

### 3. 输入框错误边框移除
**问题**：需要移除输入框的默认边框和验证错误时的红色边框

**解决方案**：使用 `:deep()` 选择器和 CSS 变量覆盖默认样式：
```scss
:deep(.el-input__wrapper) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  --el-input-border-color: transparent !important;
  --el-input-error-border-color: transparent !important;
}
```

## 开发注意事项

1. **组件导入规范**：使用 `<script setup>` 语法的组件必须使用命名导入方式注册
2. **样式规范**：对第三方组件的样式修改需使用 `:deep()` 选择器
3. **TypeScript 规范**：遵循项目中的类型定义和接口规范
4. **提交规范**：使用语义化提交信息，如 `feat: 添加新功能`、`fix: 修复 bug`

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge (推荐)

## License

MIT License