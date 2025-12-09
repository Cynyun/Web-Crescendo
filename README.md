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

- Vue3 : 渐进式 JavaScript 框架，以组合式 API（Composition API）为核心，支持响应式系统与组件化开发。本项目充分利用其 ``` <script setup> ``` 语法糖、响应式工具（如 ref、reactive）及生命周期钩子，实现高内聚、低耦合的组件结构

- Vite : 新一代前端构建脚手架工具，利用原生 ES 模块（ESM）和按需编译策略，提供极速的冷启动与热更新体验。作为项目的开发服务器与构建器，显著提升开发效率与构建性能。

- Pinia : Vue 官方推荐的状态管理库，替代 Vuex。提供简洁的 store 设计、完整的 TypeScript 支持、模块化组织方式，并天然集成 Vue DevTools，便于调试全局状态。

- TypeScript : JavaScript 的超集，通过静态类型系统增强代码可读性、可维护性与健壮性。在编译期捕获潜在错误，提升大型项目协作效率与开发体验。

- ... : 更多待补充