<!-- src/components/LoginModal.vue -->
<template>
    <div class="logintable">
        <el-dialog v-model="dialogVisible" title="用户登录" width="400px" :close-on-click-modal="false" @close="resetForm"
            class="login-dialog">
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" size="default">
                <!-- 合并为一个字段：支持昵称或邮箱 -->
                <el-form-item label="账号" prop="loginId">
                    <el-input v-model="form.loginId" placeholder="请输入昵称或邮箱" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
                </el-form-item>
            </el-form>

            <template #footer>
                <div style="display: flex; gap: 12px; justify-content: flex-end; width: 100%;">
                    <NewButton @click="closeDialog">取消</NewButton>
                    <NewButton :loading="loading" @click="handleSubmit">
                        {{ loading ? '登录中...' : '登录' }}
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
import NewButton from '@/components/Button.vue' // 引入自定义按钮组件
import { computed } from 'vue'

// Props & Emit
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'update:visible', value: boolean): void }>()

const dialogVisible = computed({
    get() {
        return props.visible
    },
    set(value: boolean) {
        emit('update:visible', value)
    }
})

const closeDialog = () => {
    dialogVisible.value = false
    emit('update:visible', false)
}

// 表单
const formRef = ref<FormInstance>()
const loading = ref(false)
const isSubmitting = ref(false) // 防止重复提交

const form = reactive({
    loginId: '',
    password: ''
})

// 自定义校验规则
const validateLoginId = (rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error('请输入昵称或邮箱'))
    } else if (value.includes('@') && value.includes('.')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            callback(new Error('邮箱格式不正确'))
        } else {
            callback()
        }
    } else {
        if (value.length < 2) {
            callback(new Error('昵称至少2个字符'))
        } else {
            callback()
        }
    }
}

const rules = {
    loginId: [{ required: true, validator: validateLoginId, trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码至少6位', trigger: 'blur' }
    ]
}

// 提交逻辑
const userStore = useUserStore()

const handleSubmit = async () => {
    if (!formRef.value) return
    // 防止重复提交
    if (isSubmitting.value || loading.value) return
    isSubmitting.value = true
    
    try {
        await formRef.value.validate((valid) => {
            if (valid) {
                loading.value = true

                setTimeout(() => {
                    // 假设从数据库获取到了用户信息
                    const mockUser = {
                        id: 123,
                        nickname: form.loginId.includes('@') ? '用户' : form.loginId,
                        email: form.loginId.includes('@') ? form.loginId : `${form.loginId}@example.com`,
                        token: `mock_token_${Date.now()}`
                    }

                    // 确保 nickname 有值
                    if (!mockUser.nickname || mockUser.nickname.trim() === '') {
                        mockUser.nickname = '用户'
                    }

                    userStore.setUserInfo(mockUser)
                    closeDialog()
                    loading.value = false
                    isSubmitting.value = false
                    // 确保提示消息中 nickname 有值
                    const displayName = mockUser.nickname || '用户'
                    ElMessage.success(`欢迎回来，${displayName}！`)
                }, 800)
            } else {
                isSubmitting.value = false
            }
        })
    } catch (error) {
        isSubmitting.value = false
        loading.value = false
    }
}

// 重置表单
const resetForm = () => {
    form.loginId = ''
    form.password = ''
    if (formRef.value) {
        formRef.value.clearValidate()
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
    /* 弹窗主体边框和圆角 */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    border: 2px solid white;
    background: linear-gradient(90deg, var(--color-green-default), var(--color-cyan-default));
}

:deep(.el-dialog__wrapper) {
    /* 弹窗包装器样式 */
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(.el-overlay) {
    /* 背景模糊效果 */
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.2);
}

/* 自定义弹窗边缘装饰 */
.login-dialog {
    position: relative;

    // color: black;
    /* 可以在这里添加自定义的边缘装饰元素 */
    &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
        border-radius: 16px;
        z-index: -1;
        filter: blur(10px);
    }
}

:deep(.el-dialog__header) {
    padding: 10px 24px;
    margin: 0;
}

:deep(.el-dialog__title) {
    // color: var(--color-text-purple);
    color: rgb(27, 201, 146);
    font-size: 18px;
    font-weight: bold;
}

:deep(.el-dialog__headerbtn) {
    .el-icon {
        color: white;
        font-size: 18px;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
}

:deep(.el-dialog__body) {
    background: none;
    padding: 10px 25px 10px 0;
    margin: 0;
}

:deep(.el-dialog__footer) {
    background: none;
    padding: 0 20px;
    margin: 0;
}

:deep(.el-form) {
    .el-form-item {
        margin-bottom: 20px;

        .el-form-item__label {
            font-weight: bold;
            color: #495057;
        }
    }
}

:deep(.el-input) {
    .el-input__wrapper {
        background: transparent !important;
        border-radius: 0 !important;
        box-shadow: none !important; // 边框来源
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 2px;
            background-color: white;
            transition: width 0.3s ease;
        }

        &:hover::after,
        &.is-focus::after {
            width: 100%;
        }

        // 错误状态样式 - 无效
        &.is-error::after {
            background-color: red;
            width: 100%;
        }
    }
}
</style>