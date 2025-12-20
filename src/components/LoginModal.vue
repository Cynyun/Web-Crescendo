<!-- src/components/LoginModal.vue -->
<template>
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
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import NewButton from '@/components/Button.vue' // 引入自定义按钮组件

// Props & Emit
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'update:visible', value: boolean): void }>()

const dialogVisible = ref(props.visible)
watch(() => props.visible, (val) => {
    dialogVisible.value = val
})

const closeDialog = () => {
    dialogVisible.value = false
    emit('update:visible', false)
}

// 表单
const formRef = ref<FormInstance>()
const loading = ref(false)

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

    await formRef.value.validate((valid) => {
        if (valid) {
            loading.value = true

            setTimeout(() => {
                const mockUser = {
                    id: 123,
                    name: form.loginId.includes('@') ? '用户' : form.loginId,
                    email: form.loginId.includes('@') ? form.loginId : `${form.loginId}@example.com`,
                    token: `mock_token_${Date.now()}`
                }

                userStore.setUserInfo(mockUser)
                closeDialog()
                loading.value = false
                ElMessage.success(`欢迎回来，${mockUser.name}！`)
            }, 800)
        }
    })
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

<!-- 注意：这里不再需要 scoped 样式，因为 GradientButton 已经处理了样式 -->