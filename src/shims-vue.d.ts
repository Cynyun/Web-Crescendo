// src/shims-vue.d.ts

/* 
 * 声明所有 .vue 文件模块
 * 支持 <script setup> 和普通 script 的默认导出
 */

declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    // 兼容 Vue 3 的组件类型
    const component: DefineComponent<{}, {}, any>
    export default component
}