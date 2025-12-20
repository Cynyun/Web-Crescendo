// stores/user.ts
import Cookies from 'js-cookie'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const COOKIE_nickname = 'user_info'
const COOKIE_OPTIONS = {
  expires: 7, // 7 天过期
  path: '/',
  sameSite: 'strict' as const,
  secure: location.protocol === 'https:' // 仅 HTTPS 下启用 secure
}

export const useUserStore = defineStore('user', () => {
  // 1. 初始化 userInfo：优先从 Cookie 读取
  const userInfo = ref<{
    id?: number
    nickname?: string
    email?: string
    token?: string
  } | null>(null)

  // 尝试从 Cookie 加载
  if (typeof window !== 'undefined') {
    const cookieValue = Cookies.get(COOKIE_nickname)
    if (cookieValue) {
      try {
        userInfo.value = JSON.parse(decodeURIComponent(cookieValue))
      } catch (e) {
        console.warn('Failed to parse user info from cookie', e)
        // 可选：清除无效 Cookie
        Cookies.remove(COOKIE_nickname, { path: '/' })
      }
    }
  }

  // 2. 计算属性：是否已登录
  const isLoggedIn = computed(() => !!userInfo.value?.token)

  // 3. 设置用户信息（登录成功后调用）
  function setUserInfo(user: typeof userInfo.value) {
    userInfo.value = user
    if (user) {
      // 写入 Cookie（编码防止特殊字符问题）
      const encoded = encodeURIComponent(JSON.stringify(user))
      Cookies.set(COOKIE_nickname, encoded, COOKIE_OPTIONS)
    }
  }

  // 4. 清除用户信息（退出登录）
  function clearUserInfo() {
    userInfo.value = null
    Cookies.remove(COOKIE_nickname, { path: '/' })
  }

  return {
    userInfo,
    isLoggedIn,
    setUserInfo,
    clearUserInfo
  }
})