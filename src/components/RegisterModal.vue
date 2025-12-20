<!-- src/components/RegisterModal.vue -->
<template>
    <el-dialog v-model="visible" title="用户注册" width="400px" :close-on-click-modal="false" @close="resetForm">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" size="default">
            <el-form-item label="用户名" prop="username">
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
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="loading">
                注册
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

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
    username: [
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