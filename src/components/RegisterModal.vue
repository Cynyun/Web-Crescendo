<!-- src/components/RegisterModal.vue -->
<template>
    <div class="registertable">
        <el-dialog v-model="visible" title="用户注册" width="500px" :close-on-click-modal="false" @close="resetForm"
            class="register-dialog">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" size="default">
                <el-form-item label="用户名" prop="nickname">
                    <el-input v-model="form.nickname" placeholder="请输入用户名" />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="example@example.com" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="至少6位" />
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password" show-password placeholder="请再次输入密码" />
                </el-form-item>
            </el-form>

            <template #footer>
                <div style="display: flex; gap: 12px; justify-content: flex-end; width: 100%;">
                    <NewButton @click="visible = false">取消</NewButton>
                    <NewButton type="primary" @click="handleSubmit" :loading="loading">
                        注册
                    </NewButton>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import NewButton from '@/components/Button.vue'
// 表单引用
const formRef = ref<FormInstance>()

// 弹窗控制
const visible = defineModel<boolean>('visible', { required: true })

// 加载状态
const loading = ref(false)

// 表单数据
const form = reactive({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: ''
})

// 表单校验规则
const rules = {
    nickname: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    email: [
        { required: false, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入合法邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码至少6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value !== form.password) {
                    callback(new Error('两次密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
}

// 提交注册
const userStore = useUserStore()

const handleSubmit = async () => {
    if (!formRef.value) return
    console.log(userStore)
    await formRef.value.validate((valid) => {
        if (valid) {
            loading.value = true

            // 模拟注册请求（实际应调用后端 API）
            setTimeout(() => {
                // 假设注册成功，生成一个 mock token
                const mockToken = `mock_token_${Date.now()}`
                const mockId = Date.now() % 10000

                // 保存到 Pinia + Cookie
                userStore.setUserInfo({
                    id: mockId,
                    nickname: form.nickname,
                    email: form.email,
                    token: mockToken
                })

                // 关闭弹窗
                visible.value = false
                loading.value = false

                // 可选：提示成功
                ElMessage.success('注册成功！')
            }, 800)
        }
    })
}

// 重置表单
const resetForm = () => {
    form.nickname = ''
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
    if (formRef.value) {
        formRef.value.clearValidate()
    }
}
</script>

<style lang="scss" scoped>
/* 
 * 深度选择器：覆盖 Element Plus 的 el-dialog 主体样式
 * 用于自定义弹窗整体外观（边框、阴影、背景等）
 */
:deep(.el-dialog) {
    /* 弹窗圆角 */
    border-radius: 12px;
    /* 防止内部内容溢出破坏圆角 */
    overflow: hidden;
    /* 添加柔和阴影，提升层次感 */
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    /* 白色外边框，增强对比 */
    border: 2px solid white;
    /* 使用渐变背景（从绿色到青色） */
    background: linear-gradient(90deg, var(--color-green-default), var(--color-cyan-default));
}

/* 
 * 覆盖弹窗外部包装容器（居中对齐用）
 */
:deep(.el-dialog__wrapper) {
    display: flex;
    align-items: center; // 垂直居中
    justify-content: center; // 水平居中
}

/* 
 * 覆盖遮罩层（overlay），添加背景模糊效果
 */
:deep(.el-overlay) {
    backdrop-filter: blur(3px); // 背景高斯模糊
    background-color: rgba(0, 0, 0, 0.2); // 半透明白色遮罩
}

/* 
 * 自定义登录弹窗的额外装饰（通过 .login-dialog 类）
 * 注意：这个类必须加在 <el-dialog> 上才能生效
 */

.register-dialog {
    position: relative; // 为伪元素提供定位上下文

    /* 
     * 使用 ::before 创建一个向外扩散的发光/光晕效果
     * 位于弹窗外层，作为视觉装饰
     */
    &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        /* 柔和的紫蓝色渐变 */
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
        border-radius: 16px; // 略大于弹窗圆角
        z-index: -1; // 放在弹窗下方
        filter: blur(10px); // 模糊制造发光感
    }
}

/* 
 * 覆盖弹窗头部区域（标题 + 关闭按钮容器）
 */
:deep(.el-dialog__header) {
    padding: 10px 24px; // 内边距
    margin: 0; // 清除默认外边距
}

/* 
 * 覆盖弹窗标题文字样式
 */
:deep(.el-dialog__title) {
    color: rgb(27, 201, 146); // 青绿色标题
    font-size: 18px;
    font-weight: bold;
}

/* 
 * 覆盖右上角关闭按钮样式
 */
:deep(.el-dialog__headerbtn) {
    .el-icon {
        color: white; // 图标白色
        font-size: 18px;

        &:hover {
            /* 悬停时显示半透明背景，提升可点击感 */
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 50%; // 可选：加圆角更美观（Element Plus 默认无）
        }
    }
}

/* 
 * 覆盖弹窗主体内容区域（表单所在位置）
 */
:deep(.el-dialog__body) {
    background: none; // 透明背景，继承父级渐变
    padding: 10px 25px 10px 0; // 右侧留空（可能为了对齐）
    margin: 0;
}

/* 
 * 覆盖弹窗底部区域（按钮所在位置）
 */
:deep(.el-dialog__footer) {
    background: none; // 透明背景
    padding: 0 20px; // 内边距
    margin: 0;
}

/* 
 * 覆盖表单整体样式
 */
:deep(.el-form) {
    .el-form-item {
        margin-bottom: 20px; // 表单项间距

        .el-form-item__label {
            font-weight: bold;
            color: #495057; // 深灰色标签文字
        }
    }
}

/* 
 * ✅ 自定义输入框下划线动画（核心交互反馈）
 * 注意：使用 :deep() 穿透组件样式
 */
:deep(.el-input) {
    .el-input__wrapper {
        /* 移除默认背景，保持透明以显示父级渐变 */
        background: transparent !important;
        /* 移除圆角，使输入框更“扁平” */
        border-radius: 0 !important;
        /* 移除 Element Plus 默认的边框阴影（关键！） */
        box-shadow: none !important;
        /* 为 ::after 伪元素提供定位基准 */
        position: relative;

        /* 
         * 下划线动画：初始宽度为 0，悬停/聚焦时展开至 100%
         */
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0; // 紧贴底部
            width: 0; // 初始隐藏
            height: 2px; // 线条粗细
            background-color: white; // 正常状态为白色
            transition: width 0.3s ease; // 平滑展开动画
        }

        /* 悬停或获得焦点时：展开下划线 */
        &:hover::after,
        &.is-focus::after {
            width: 100%;
        }

        /* 
         * 表单验证失败时的错误状态样式
         * 注意：Element Plus 会在验证失败时自动添加 .is-error 类
         * 当前设置为：立即显示红色完整下划线（无动画）
         */
        &.is-error::after {
            background-color: red; // 错误状态为红色
            width: 100%; // 直接显示完整下划线（可改为 0 + hover 触发动画）
        }
    }
}
</style>