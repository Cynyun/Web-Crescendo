<template>
    <div class="tree-menu" :style="{ maxHeight: menuHeight, ...treeMenuStyle }">
        <div v-for="item in menuItems" :key="item.id" class="tree-menu-item">
            <div v-if="item.children && item.children.length > 0" class="tree-menu-branch"
                :class="{ 'multi-child': item.children.length > 2, 'active': isActive(item.path), 'collapsed': item.collapsed }"
                :data-child-count="item.children.length" @click="toggleCollapse(item.id)">
                <span class="branch-label">{{ item.label }}</span>
                <span class="branch-arrow iconfont">{{ item.collapsed ? '&#xe6c2;' : '&#xe6d4;' }}</span>
            </div>
            <NewButton v-else class="tree-menu-leaf" :class="{ 'active': isActive(item.path) }"
                @click="navigateTo(item.path)">
                {{ item.label }}
            </NewButton>
            <div v-if="item.children && item.children.length > 0" class="tree-menu-children"
                :class="{ 'collapsed': item.collapsed }">
                <div v-for="child in item.children" :key="child.id" class="tree-menu-child">
                    <NewButton class="tree-menu-child-btn" :class="{ 'active': isActive(child.path) }"
                        @click="navigateTo(child.path)">
                        {{ child.label }}
                    </NewButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import NewButton from '@/components/Button.vue';
import { useThemeColorStore } from '@/stores/themecolor';

// 主题颜色store
const themeColorStore = useThemeColorStore();

const treeMenuStyle = computed(() => {
    const baseStyle: Record<string, string> = {
        '--light2': themeColorStore.light2,
        '--lightGrey2': themeColorStore.lightGrey2,
        '--darkGrey1': themeColorStore.darkGrey1
    }
    return baseStyle;
});

// 路由对象
const route = useRoute();

// Props
const props = defineProps<{
    menuItems: Array<{
        id: string;
        label: string;
        path: string;
        children?: Array<{
            id: string;
            label: string;
            path: string;
        }>;
    }>;
    height?: string;
}>();

// 默认高度
const defaultHeight = '400px';
const menuHeight = computed(() => props.height || defaultHeight);

// 折叠状态
const collapsedState = ref<Record<string, boolean>>({});

// 切换折叠状态
const toggleCollapse = (id: string) => {
    collapsedState.value[id] = !collapsedState.value[id];
    // 手动更新menuItems中对应项的collapsed状态
    const item = menuItems.find(item => item.id === id);
    if (item) {
        item.collapsed = collapsedState.value[id];
    }
};

// 页面跳转
const navigateTo = (path: string) => {
    router.push(path);
};

// 判断当前路由是否与菜单项路径匹配
const isActive = (path: string) => {
    // 处理根路径的特殊情况
    if (path === '/') {
        return route.path === '/';
    }
    // 处理其他路径，确保路径匹配的完整性
    return route.path === path || route.path.startsWith(path + '/');
};

// 为每个菜单项添加折叠状态
const menuItems = reactive(props.menuItems.map(item => {
    const isCollapsed = true; // 初始值设为true
    collapsedState.value[item.id] = isCollapsed; // 同时更新collapsedState
    return {
        ...item,
        collapsed: isCollapsed
    };
}));

</script>

<style scoped lang="scss">
.tree-menu {
    width: 100%;
    /* 设置最大高度，超出时可滚动 */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    /* 隐藏滚动条但保留滚动功能 */
    &::-webkit-scrollbar {
        width: 0;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .tree-menu-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tree-menu-branch {
        width: 98%;
        height: 31px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--lightGrey2);
        position: relative;

        // 取消原先自带样式
        border-radius: 0;
        box-shadow: none;
        border: none;

        .branch-label {
            font-size: 16px;
            // font-weight: bold;
            flex: 1;
            text-align: center;
        }

        .branch-arrow {
            font-size: 24px;
            position: absolute;
            right: 20px;
        }

        &:hover {
            background-color: var(--light2);
            color: var(--darkGrey1);
        }

        &.active {
            // color: var(--darkGrey1);
            // background-color: var(--light2);
        }

        &:not(.collapsed) {
            background-color: var(--light2);
            color: var(--darkGrey1);
        }

        &:not(.collapsed) {
            position: relative;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 15%;
            width: 70%;
            height: 2px;
            background-color: var(--darkGrey1);
            transition: transform 0.5s ease;
        }

        &:not(.collapsed)::after {
            transform: translateX(0);
        }

        &.collapsed::after {
            transform: translateX(-100%);
        }
    }

    .tree-menu-leaf {
        width: 98%;
        height: 35px;
        font-size: 16px;

        // 取消原先自带样式
        border-radius: 0;
        box-shadow: none;
        border: none;
        transition: all 0.3s ease;

        color: var(--lightGrey2);

        &.active {
            color: var(--darkGrey1);
            font-weight: bold;
        }
    }


    .tree-menu-children {
        width: 95%;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        max-height: 300px;
        /* 设置一个更接近实际内容高度的值，减少卡顿 */
        overflow: hidden;
        transition: max-height 0.25s ease-in-out, margin-top 0.25s ease-in-out, gap 0.25s ease-in-out;
    }

    .tree-menu-children.collapsed {
        max-height: 0;
        margin-top: 0;
        gap: 0;
    }

    .tree-menu-child {
        width: 100%;
    }

    .tree-menu-child-btn {
        width: 100%;
        height: 28px;
        font-size: 14px;
        color: var(--lightGrey2);

        // 取消原先自带样式
        border-radius: 0;
        box-shadow: none;
        border: none;
        transition: all 0.3s ease;

        &.active {
            color: var(--darkGrey1);
            font-weight: bold;
        }
    }
}
</style>